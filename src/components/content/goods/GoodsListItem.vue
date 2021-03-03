<template>
  <div class="goods-item" @click="itemClick">
<!--    @Load可以进行监听图片是否加载完成-->
<!--    <img :src="goodsItem.show.img" alt="" @load="imageLoad">-->

<!--    因为在商品详情页面也需要使用这个组件，但是另一个接口的使用方法不能用show来读取图片数据-->
<!--    所以需要定义计算属性，如果goodsItem.image拿不到图片，就回去goodsItem.show.img中拿-->
    <img :src="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      价格：<span class="price">{{goodsItem.price}}</span> |

      收藏：<span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default() {
          return []
        }
      }
    },
    computed: {
      showImage() {
        return this.goodsItem.image ||this.goodsItem.show.img
      }
    },
    methods: {
      itemClick() {
        //点击路由,进行跳转到详情页,并将商品的ID传入进去
        //因此需要拿到goodsItem对象的iid
        this.$router.push('/detail/' + this.goodsItem.iid)
      },

      imageLoad() {
        //在这里使用$bus，会将这个事件发送到事件总线中，从而在别的地方也可以使用这个方法
        //再使用emit，将其发射出去
        if (this.$route.path.indexOf('/home') !== -1){
          //在这里监听路由，如果是home图片加载完成，就发送homeImageLoad
          this.$bus.$emit('homeImageLoad')
        }else if (this.$route.path.indexOf('/detail') !== -1){
          //在这里监听路由，如果是home图片加载完成，就发送detailImageLoad
          this.$bus.$emit('detailImageLoad')
        }
      }
    }
  }
</script>

<style scoped>
  .goods-item {
    padding: 5px 0px;
    position: relative;
    width: 48%;

  }
  .goods-item img{
    width: 100%;
    height: 240px;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    bottom: 5px;
    overflow: hidden;
    text-align: center;
  }
  .goods-info p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .price {
    color: #E87373;
  }

  .collect {
    color: #E87373;
  }
</style>
