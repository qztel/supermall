<template>
  <div id="tab-bar">
<!--    在大的组件中添加插槽,可以动态的改变其内容,例如,首页,图片等-->
    <slot></slot>
  </div>
</template>

<script>


  export default {
    name: "Tabbar"
  }
</script>

<style scoped>
  #tab-bar {
    display: flex;
    background-color: #f2f2f2;

    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;

    box-shadow: 0px -1px 1px rgba(100,100,100,0.2);
  }

</style>