<template>
    <div class="goods-item" @click="itemClick">
      <!-- @load方法可以监听图片加载完成，然后调用方法 -->
        <img :src="goodsItem.show.img" alt="" @load="imageLoad">
        <div class="goods-info">
            <p>{{goodsItem.title}}</p>
            <span class="price">{{goodsItem.price}}</span>
            <span class="collect">{{goodsItem.cfav}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name:'GoodsListItem',
        props:{
           goodsItem:{
                type:Object,
            default(){
                return {}
            }
           }
        },
        components: {

        },
        data () {
            return {

            };
        },
        computed: {

        },
        methods: {
          imageLoad(){
            // 与home的this.$bus.$on('itemImageLoad')传数据,非父子组件间的通信，事件总线$bus
            this.$bus.$emit('itemImageLoad')
          },
          itemClick(){
            this.$router.push('/detail/'+this.goodsItem.iid)
          }
        },
    }
</script>

<style>
.goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }
  .goods img {
    width: 100%;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: #f40;
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>