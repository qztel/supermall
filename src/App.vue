<template>
  <div id="app">
    <keep-alive exclude="Detail">
<!--      防止路由跳转之后销毁或重新创建-->
<!--      详情页不需要保留，所以将他排除-->
      <router-view></router-view>
    </keep-alive>
    <maintabbar class="maintabbar"></maintabbar>
  </div>
</template>

<script>
import maintabbar from './components/content/mainTabbar/maintabbar'

export default {
  name: 'App',
  components: {
  maintabbar
  }
}
</script>

<style>
  @import "assets/css/base.css";
  .maintabbar {
    z-index: 2;
  }
</style>
