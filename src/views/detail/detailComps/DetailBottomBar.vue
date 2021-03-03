<template>
  <div class="bottom-bar">
    <div class="bar-item">
      <div>
        <img src="~assets/img/detail/2.png" alt=""><br>
        <span class="text">客服</span>
      </div>
      <div>
        <img src="~assets/img/detail/3.png" alt=""><br>
        <span class="text">店铺</span>
      </div>
      <div>
        <img src="~assets/img/detail/4.png" alt=""><br>
        <span class="text">收藏</span>
      </div>
    </div>

    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBottomBar",
    methods: {
      addToCart() {
        this.$emit('addCart')
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    height: 58px;
    position: fixed;
    background-color: #fff;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    text-align: center;
    z-index: 3;
  }
  .bar-item {
    flex: 1;
    display: flex;

  }
  .bar-item img {
    margin-top: 6px;
    width: 28px;
    height: 28px;
  }
  .bar-item>div {
    flex: 1;
  }
  .bar-left .text {
    font-size: 13px;
  }
  .bar-right {
    font-size: 15px;
    color: #fff;
    line-height: 58px;
  }
  .bar-right .cart {
    background-color: #ffe817;
    color: #333;
  }
  .bar-right .buy {
    background-color: #f69;
  }
</style>
