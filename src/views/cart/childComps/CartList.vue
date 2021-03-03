<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item
        v-for="(item, index) in cartList"
        :item-info="item"
        :key="index"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
  import Scroll from "../../../components/common/scroll/Scroll";
  import CartListItem from "./CartListItem";

  import {mapGetters} from 'vuex'

  export default {
    name: "CartList",
    components: {
      Scroll,
      CartListItem
    },
    computed: {
      ...mapGetters(['cartList'])
    },
    activated() {
      //在进入购物车时，里面没有数据的话，默认可滚动高度为0，所以需要在组件创建的时候就进行刷新
      this.$refs.scroll.refresh()
    },
  }
</script>

<style scoped>
  .cart-list{
    height: calc(100% - 93px - 50px)
  }
  .content {
    height: 100%;
    overflow: hidden;
    font-size: 20px;
  }
</style>
