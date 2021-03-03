<template>
<!--  判断goods对象中是否为空，如果为空，就不进行渲染-->
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span class="discount" v-if="goods.discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-service">
<!--      v-for遍历时，如果后面是数字，则会从1开始遍历，所以需要-1-->
      <span class="info-services-item" v-for="index in goods.services.length-1">
        <img :src="goods.services[index-1].icon">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBaseInfo",
    props: {
      goods: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .base-info {
    border-bottom: 3px solid #f2f5f8;
  }

.info-title {
  font-size: 17px;
  margin: 8px;
  text-indent: 2em
}

  .info-price {
    /*background-color: blue;*/
    margin-top: 10px;
    display: flex;
  }
  .n-price {
    font-size: 19px;
    margin-left: 10px;
    color: red;
  }
  .o-price {
    color: #5c6b77;
    margin-left: 5px;
    margin-top: 5px;
    font-size: 14px;
    text-decoration: line-through;
  }
  .discount {
    background-color: rgba(255,64,64,0.8);
    margin-left: 5px;
    height: 17px;
    line-height: 17px;
    border-radius: 5px;
    font-size: 14px;
    padding: 2px;
  }

  .info-other{
    line-height: 30px;
    display: flex;
    font-size: 12px;
    border-bottom: 1px solid rgba(100,100,100,.1);
    justify-content: space-between;
    margin: 10px 8px;
  }

  .info-service {
    display: flex;
    justify-content: space-between;
    line-height: 50px;
  }
  .info-services-item {
    margin: 0 8px;
    text-align: center;
    font-size: 11px;
  }
  .info-services-item img{
    height: 11px;
  }


</style>
