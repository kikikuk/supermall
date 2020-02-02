<template>
  <div id="app">
    <router-view></router-view>
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
