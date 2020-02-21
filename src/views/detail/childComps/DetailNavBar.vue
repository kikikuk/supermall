<template>
    <div>
        <nav-bar class="nav-bar">
            <div slot="left" class="back" @click="backClick">
                <img src="~assets/img/common/back.svg" alt="">
            </div>
             <div slot="center" class="title">
                 <div v-for="(item,index) in titles" 
                 class="titleItem" :class="{active:currentIndex===index}"
                 @click="titleClick(index)">{{item}}</div>
             </div>
        </nav-bar>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

    export default {
        name:'DetailNavBar',
        components: {
            NavBar
        },
        data () {
            return {
                titles:['商品','参数','评论','推荐'],
                currentIndex:0
            };
        },
        computed: {

        },
        methods: {
            titleClick(index){
                this.currentIndex=index
            },
            backClick(){
                this.$router.back()
                // 或者是.go(-1)
            }
        },
    }
</script>

<style scoped>
.nav-bar{
    position: relative;
    z-index: 9;
    background-color: #fff;
}
.title{
    display: flex;
}
.titleItem{
    flex: 1
}
.active{
    color: #f40;
}
.back img{
    margin-top: 12px;
}
</style>
