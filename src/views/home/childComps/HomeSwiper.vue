<template>
    <swiper>
      <swiper-item v-for="item in banner">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
//因为在swiper文件夹里面有一个index.js文件，将Swiper,SwiperItem以一个对象的形式导出，所以这里可以以对象的形式导入
import {Swiper,SwiperItem} from "components/common/swiper"

export default {
        name:'HomeSwiper',
        props:{
            banner:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        data(){
          return{
            isLoad:false
          }
        },
        components:{
            Swiper,
          SwiperItem
        },
        methods:{
          imageLoad(){
            // 设置isload目的是让这个图片加载一张发送了一次就可以了，避免多次发送没有意义
            if(!this.isLoad){
              // console.log('----homeSwiperimg load');
            this.$emit('swiperImageLoad')
            this.isLoad=true
            }
            
          }
        }
    }
</script>

<style scoped>

</style>