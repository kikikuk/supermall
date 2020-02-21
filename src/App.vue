<template>
  <div id="app">
    <!-- 让home不要随意销毁，去到其他页面回来还可以保持原来刷到的位置 -->
    <!-- exclude="Detail"    detail界面每次进入都要刷新数据，不能keep-alive -->
    <keep-alive exclude="Detail">
    <router-view></router-view>
    </keep-alive>
    <main-tar-bar></main-tar-bar>
  </div>
</template>

<script>
import MainTarBar from 'components/content/maintarbar/MainTarBar'

export default {
  name: "app",
  components: {
    MainTarBar
  }
}
</script>

<style>
/* 在style里面引用的时候，要用@import */
@import "assets/css/base.css"
</style>
