<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from "components/common/swiper"


  export default {
    name: "HomeSwiper",
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      },
      data() {
        return {
          isLoad: false
        }
      }
    },
    components: {
      SwiperItem,
      Swiper
    },
    methods: {
      //监听图片加载完成
      imageLoad() {
        //判断是否已经发送成功，如果成功，则不需要再次发送，防止重复
        if(!this.isLoad){
          this.$emit('lbtImageLoad')
          this.isLoad = true
        }
      }
    }
  }
</script>

<style scoped>

</style>
