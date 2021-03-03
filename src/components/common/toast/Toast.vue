<!--全局插件，需要在index.js中定义，然后在main.js中安装，然后就可以传入参数，进行插件内方法的调用-->
<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    props: {
      // message: {
      //   type: String,
      //   default: ''
      // },
      // isShow: {
      //   type: Boolean,
      //   default: false
      // }
    },
    data() {
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      show(message,duration=2000) {
          this.message = message
        this.isShow = true;

        setTimeout(() => {
          this.isShow = false;
        }, duration)
      }
    }
  }
</script>

<style scoped>
  .toast {
    position: fixed;
    font-size: 18px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 8px 10px;

    color: white;
    background-color: rgba(0,0,0,0.7);
    border-radius: 8px;

    z-index: 3;
  }
</style>
