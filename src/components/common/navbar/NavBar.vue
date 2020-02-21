<template>
  <div class="nav-bar">
    <!-- slot要设置样式的话最好是在外面包一层div，否则不好 -->
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar"
};
</script>

<style scoped>
.nav-bar{
  display: flex;
  line-height: 44px;
  height: 44px;
  text-align: center;
  box-shadow: 0 1px 1px rgba(100, 100, 100, .1)
}
.left, .right{
  width: 60px;
}
.center{
  /* 当其他部分的宽度固定的时候，flex设置为1，会自动占满剩余的空间 */
  flex: 1;
}
</style>