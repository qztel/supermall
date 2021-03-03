<template>
  <div class="check-button" :class="{active: isChecked}">
<!--    <input type="checkbox" name="" :class="{active: isChecked}">-->
<!--    动态添加checked，来决定是否选中了按钮，默认为false，然后将数据传入底部组件中-->
<!--    根据按钮的是否选中，来决定全选按钮为true还是false-->
    <img src="~assets/img/cart/0.png" alt="">
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props: {
      isChecked: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .check-button{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 2px solid #aaa;
    text-align: center;

  }
  .check-button img{
    width: 90%;
    height: 90%;

  }

  .active {
    border-color: #aaa;
    background-color: hotpink;
  }
</style>
