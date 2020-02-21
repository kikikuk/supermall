<template>
    <div id="details">
        <detail-nav-bar class="details-nav"></detail-nav-bar>
        <scroll class="content" res="scroll">
            <detail-swipper :top-images="topImages"></detail-swipper>
            <detail-base-info :goods="goods"></detail-base-info>
            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-goods-info :detail-info="detailInfo"
            @imageLoad="imageLoad"></detail-goods-info>
            <detail-param-info :param-info="paramInfo"></detail-param-info>
            <detail-comment-info comment-info="commentInfo"></detail-comment-info>
        </scroll>
       
    </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar';
import DetailSwipper from './childComps/DetailSwipper';
import DetailBaseInfo from './childComps/DetailBaseInfo';
import DetailShopInfo from './childComps/DetailShopInfo';
import DetailGoodsInfo from './childComps/DetailGoodsInfo';
import DetailParamInfo from './childComps/DetailParamInfo';
import DetailCommentInfo from './childComps/DetailCommentInfo';

import Scroll from "components/common/scroll/Scroll";

import {getDetail,Goods,Shop,GoodsParam} from 'network/detail'
    export default {
        name:"Detail",
        components: {
          DetailNavBar,
          DetailSwipper,
          DetailBaseInfo,
          DetailShopInfo,
          DetailGoodsInfo,
          DetailParamInfo,
          DetailCommentInfo,

          Scroll
        },
        data () {
            return {
                iid:null,
                topImages:[],
                goods:{},
                shop:{},
                detailInfo:{},
                paramInfo:{},
                commentInfo:{}
            };
        },
        created(){
            this.iid=this.$route.params.iid
            getDetail(this.iid).then(res=>{
                console.log(res);
                const data=res.result
                this.topImages=data.itemInfo.topImages

                this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)

                this.shop=new Shop(data.shopInfo)

                this.detailInfo=data.detailInfo

                this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)

                if(data.rate.cRate!==0){
                    this.commentInfo=data.rate.list[0]
                }
            })
        },
        computed: {

        },
        methods: {
            imageLoad(){
                this.$refs.scroll.refresh()
            }
        },
    }
</script>

<style scoped>
#details{
    height: 100vh;
    position: relative;
    z-index: 9;
    background-color: #fff;
}
.details-nav{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
    background-color: #fff;
}
.content{
    /* height: calc(100%-44px); */
    background-color: #fff;
    position: absolute;
  top: 44px;
  /* bottom: 49px; */
  left: 0;
  right: 0;
}
</style>