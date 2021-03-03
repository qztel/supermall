<template>
<!--  ref：绑定ref以后，就可以准确的拿到元素对象-->
<div class="wrapper" ref="wrapper">
  <div class="content">
    <slot></slot>
  </div>
</div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default:0
      },
      pullUpload: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      //1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        //这里根据组件是否需要 实时监听，需要动态传入，传入的值为数字
        probeType:this.probeType,
        click: true,
        pullUpLoad: this.pullUpload,
        useTransition: false
      })

      //2.监听滚动位置
      //将滚动事件发送出去，谁想用，就可以调用，方法为 @scroll
      this.scroll.on('scroll',(position) => {
        this.$emit('scroll',position)
      })

      //3.监听上拉加载更多事件
      this.scroll.on('pullingUp',() => {
        this.$emit('pullingUp')
      })
    },
    methods: {
      //定义上拉加载更多事件，如果连续滚动，只能加载一次，添加方法后就可以连续滚动
      finishPullUp() {
        this.scroll.finishPullUp()
      },
      refresh() {
        //前面这些为了防止图片加载过快，scroll没有挂载，而出现报错的问题
        //这是一个判断，判断scroll是否存在
        this.scroll && this.scroll.refresh()
        // console.log('-----');
      }
    }
  }

</script>

<style scoped>

</style>
