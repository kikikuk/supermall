<template>
    <div class="tab-control">
        <div v-for="(item,index) in titles" 
        class="tab-control-item" :class="{active:index===currentIndex}"
        @click="itemClick(index)">
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name:'TabControl',
        props:{
            titles:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        components: {

        },
        data () {
            return {
                currentIndex:0
            };
        },
        computed: {

        },
        methods: {
            itemClick(index){
                this.currentIndex=index;
                this.$emit('tabClick',index)
            }
        }
    }
</script>

<style>
.tab-control{
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
    background-color: #fff;
}
.tab-control-item{
    flex:1;
}
.tab-control-item span{
    padding: 5px;
}
.active{
    color: #f40;
    }
    .active span{
    border-bottom: 3px #f40 solid;    

    }
</style>