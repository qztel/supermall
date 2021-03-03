<template>
  <tabbar>
    <!--      使用设置好的插槽,有几个,就放置几个插槽-->
    <!--      这里传入path为固定值,在点击后,就会将path传入地址,完成页面的跳转-->
    <!--      这里传入activeColor,用来动态的设置颜色，在别人使用时，也会随着设置更改颜色-->
    <Tabbaritem path="/home" activeColor="blue">
      <img slot="item-icon" src="~assets/img/tabbar/1.png" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/1-active.png" alt="">
      <div slot="item-text">首页</div>
    </Tabbaritem>
    <Tabbaritem path="/category" activeColor="blue">
      <img slot="item-icon" src="~assets/img/tabbar/3.png" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/3-active.png" alt="">
      <div slot="item-text">分类</div>
    </Tabbaritem>
    <Tabbaritem path="/cart" activeColor="blue">
      <img slot="item-icon" src="~assets/img/tabbar/4.png" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/4-active.png" alt="">
      <div slot="item-text">购物车</div>
    </Tabbaritem>
    <Tabbaritem path="/profile" activeColor="blue">
      <img slot="item-icon" src="~assets/img/tabbar/2.png" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/2-active.png" alt="">
      <div slot="item-text">我的</div>
    </Tabbaritem>
  </tabbar>
</template>

<script>
  import Tabbaritem from "components/common/tabbar/Tabbaritem";
  import Tabbar from 'components/common/tabbar/Tabbar.vue'  //导入组件

  export default {
    name: "maintabbar",
    components: {
      Tabbaritem,
      Tabbar
    }
  }
</script>

<style scoped>

</style>
