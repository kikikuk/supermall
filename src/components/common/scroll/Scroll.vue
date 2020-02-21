<template>
<!-- ref绑定到指定的元素 -->
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
    export default {
        name:'Scroll',
        components: {

        },
        props:{
            probeType:{
                type:Number,
                default:0
            },
            pullUpLoad:{
                type:Boolean,
                default:false
            }
        },
        data () {
            return {
                scroll:null
            };
        },
        computed: {

        },
        methods: {
            // time=300的意思是，如果不传入第三个time参数，则默认给他赋值为300
            scrollTo(x,y,time=300){
                // this.scroll && 先判断this.scroll 是否有值，有值再进行后面的，如果为null，就直接不执行了（因为有&&）
                this.scroll && this.scroll.scrollTo(x,y,time)
            },
            finishPullUp(){
                this.scroll.finishPullUp()
            },
            refresh(){
                this.scroll && this.scroll.refresh()
            },
            getScrollY(){
                return this.scroll?this.scroll.y:0
            }
        },
        mounted(){
            // 1.创建BScroll对象
            this.scroll=new BScroll(this.$refs.wrapper,{
                click:true,
                probeType:this.probeType,
                pullUpLoad:this.pullUpLoad
            })
            // 2.监听滚动的区域
            if(this.probeType===2||this.probeType===3){
                this.scroll.on('scroll',(position)=>{
                // console.log(position);
                this.$emit('scroll',position)
            })
            }
            
            //3.监听上拉加载事件
            if(this.pullUpLoad){
                 this.scroll.on('pullingUp',()=>{
                // console.log('上拉加载');
                this.$emit('pullingUp')
                
            })
            }
           
        }
    }
</script>

<style>
</style>