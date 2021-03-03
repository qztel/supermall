<template>
  <div class="cart">
    <navbar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </navbar>
      <cart-list></cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import Navbar from "../../components/common/navbar/Navbar";
  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";


  import { mapGetters } from 'vuex'

  export default {
    name: "Cart",
    components: {
      Navbar,
      CartList,
      CartBottomBar,
    },
    data() {
      return {
        select: false
      }
    },
    computed: {
      //在这里使用这个方法，来调用VUEX中的getters.js文件，然后导出其中的方法
      //可以将方法直接转换成计算属性
      ...mapGetters(['cartLength', 'cartList'])
    }
  }
</script>

<style scoped>
  .cart{
    height: 100vh;
  }
  .nav-bar {
    background-color: #E87373;
    color: white;
    font-size: 17px;

  }

</style>
