<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']" 
      @tabClick="tabClick" 
      ref="tabControl1" class="tab-control"
      v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll" 
            :probe-type="3" 
            @scroll="contentScroll" 
            @pullingUp="loadMore"
            :pull-up-load="true">
      <home-swiper :banner="banner" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommend="recommend"></recommend-view>
      <tab-control :titles="['流行','新款','精选']" 
      @tabClick="tabClick" 
      ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!-- 组件不能够直接监听点击事件(以及其他的原生事件)，要加一个.native(原生的)修饰符 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";

// 用default导出的东西才可以省去大括号，否则必须要用大括号
import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,

    NavBar,
    Scroll,
    TabControl,
    GoodsList,
    BackTop
  },
  data() {
    return {
      banner: [],
      recommend: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isShowBackTop:false,
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  //生命周期
  created() {
    //1.请求多个数据
    this.getHomeMultidata();

    //2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");

  },
  mounted(){
    //$refs不能再created()生命周期函数里面用，因为那个时候结构还没有完全创建，
    // 用$refs出来的应该是undefined，所以要再在mounted（）里面使用

    // 图片加载完成的时间监听，用了防抖函数
    const refresh=debounce(this.$refs.scroll.refresh,50)
     // 3.监听item中图片加载完成
    // 非父子组件间的通信，事件总线$bus
    this.$bus.$on('itemImageLoad',()=>{
      // 监听到图片加载完之后刷新一下，避免图片没有把原本高度撑开而提前触底的bug
      refresh()
    })
  },
  destroyed(){
    // 用了keep-alive这个生命周期就不会被调用
  },
  activated(){
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
  },
  deactivated(){
   this.saveY=this.$refs.scroll.getScrollY()

  },
  methods: {
    // 网络请求相关方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        console.log(res);
        this.banner = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      });
      //getHomeMultidata()是一个异步操作，所以不能用console.log(this.banner)来看数据
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        console.log(res);
        // push(...array)这个语法的作用与循环遍历数组再push一样的作用
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp()
      });
    },

    // 事件监听相关方法
    tabClick(index) {
      console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex=index;
      this.$refs.tabControl2.currentIndex=index;
    },
    backClick(){
      console.log('回到顶部');
      // 方法一
      // 第一个scroll是ref的scroll，第二个scroll是Scroll组件里data里new BScroll出来的scroll
      // scrollTo（）里面的三个参数（x,y,time毫秒数）
      // this.$refs.scroll.scroll.scrollTo(0,0,500)
      // 方法二，在scroll组件内部定义了一个scrollTo(x,y,time)的方法，在这里直接调用
      this.$refs.scroll.scrollTo(0,0,500)

    },
    contentScroll(position){
      // console.log(position);
      // 1.判断backTop是否显示
      this.isShowBackTop=-position.y>1000
      // 2.决定tabCpntrol是否吸顶（position：fixed）
      this.isTabFixed=(-position.y)>this.tabOffsetTop
    },
    loadMore(){
      console.log('上拉加载更多');
      this.getHomeGoods(this.currentType)
      // 监听到图片加载完之后刷新一下，避免图片没有把原本高度撑开而提前触底的bug
      // this.$refs.scroll.scroll.refresh()
    },
    swiperImageLoad(){
         // 获取tabcontrol的offsetTop(做吸顶的效果)
    // 所有的组件都有一个属性$el,用于获取组件中的元素
    // 若直接在mounted中获取offsettop这个值是不正确的，要等图片加载了之后这个值才准确
   this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
    }
  
    }
  
};
</script>

<style scoped>
/* scoped表示下面的样式是有作用域的，如果不加的话，其他.vue文件中要是有相同的类名就会被用到 */
#home {
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: #f40;
  color: #fff;
  /* 这个是浏览器原生scroll时需要的，用来bscroll之后就不需要了 */
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9; */
}

 /*这个属性可以吸顶，top来设置顶的高度,
  在达到吸顶高度之前，position:static,
  在达到高度之后，会自动变成position：fixed,
  但这个属性可能会有浏览器不支持*/
  /* 在用了better Scroll之后，这个属性也不能再用了，注释掉，写新的方法 */
/* .tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
} */

.content {
  overflow: hidden;

  /* 方法一：给scroll设置高度 */
  /* 可以计算的函数calc() */
  /* height: calc(100%-93px); */
  /* 方法二：用定位 */
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control{
  position: relative;
  z-index: 9;
}
</style>