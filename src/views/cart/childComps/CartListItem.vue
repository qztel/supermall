
<template>
  <div id="shop-item">
    <div class="item-selector">
      <CheckButton :is-checked="itemInfo.checked"
                    @click.native="checkClick"></CheckButton>
    </div>
    <div class="item-img">
      <img :src="itemInfo.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">商品描述: {{itemInfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{itemInfo.goods}}</div>
        <div class="price">
          <button class="price-button" @click="plusbutton">-</button>
          <div class="item-count right">x{{itemInfo.count}}</div>
          <button class="price-button" @click="lessbutton">+</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from "../../../components/content/checkButton/CheckButton";

  export default {
    name: "CartListItem",
    props: {
      itemInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    components: {
      CheckButton
    },
    methods: {
      checkClick() {
        //使用Vuex中新定义的checked属性来计算是否选中了商品
        this.itemInfo.checked = !this.itemInfo.checked

      },
      plusbutton() {
        if (this.itemInfo.count > 1){
          this.itemInfo.count -=1
        }
      },
      lessbutton() {
        this.itemInfo.count +=1
        // console.log(this.itemInfo);
      }
    }
  }
</script>

<style scoped>
  #shop-item {
    width: 100%;
    display: flex;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }
  .item-selector {
    width: 13%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .item-img {
    padding: 5px;
    /*border: 1px solid #ccc;*/
  }
  .item-img img {
    width: 90px;
    height: 110px;
    display: block;
    border-radius: 5px;
  }
  .item-info {
    width: 100%;
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }
  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }
  .info-bottom {
    display: flex;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }
  .info-bottom .item-price {
    color: orangered;
  }
  .item-count {
    margin: 0 8px;
  }

  .price {
    display: flex;
    position: absolute;
    right: 20px;
  }
  .price-button {
    width: 20px;
  }
</style>
