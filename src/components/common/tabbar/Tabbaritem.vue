<template>
<!--  在这里添加点击事件,使点击后,可以跳转到对应的地址-->
  <div class="tab-bar-item" @click="itemclick">
<!--    在这里之前的插槽里，再设置几个插槽，就可以动态的改变其内容-->
<!--    然后再添加另一份图片，在活跃时显示它们，用到v-if，v-else,当isActive为true时，为活跃状态-->
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot  name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "Tabbaritem",
    props: {
      path: String,   //定义一个字符串,path的值由自己传入
      activeColor: {   //定义一个字符串，用来规定动态的颜色，默认为red红色， 用来在app.vue里接收颜色
        type: String,
        default: 'red'
      }
    },
    data() {
      return {
        // isActive: true  //这里为控制插槽中的内容是否活跃,不能设置为固定，所以需要用下面的方法
      }
    },
    computed: {
      isActive() {
        //返回一个值，活跃状态下的path，是否等于点击之后传入进去的path
        return this.$route.path.indexOf(this.path) !==-1
      },

      //判断组件是否处于活跃状态，如果处于，则将activeColor赋予activeStyle，反之，给予默认值
      activeStyle() {
        return this.isActive ? {color: this.activeColor} : {}
      }
    },
    methods: {
      itemclick (){
        if (this.$route.path == this.path){
          return 0
        }else this.$router.push(this.path)   //点击后,将点击插槽对应的path传入,完成页面的跳转


      }
    }
  }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;  /*常用高度*/
    font-size: 14px;
  }
  .tab-bar-item img {
    height: 24px;
    width: 24px;
    margin-top: 3px;
  }
  .active {
    color: green;
  }
</style>
