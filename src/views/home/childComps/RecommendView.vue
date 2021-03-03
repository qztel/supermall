<template>
  <div class="recommend">
    <div v-for="item in recommend" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props: {
      recommend: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .recommend {
  display: flex;
    width: 100%;
    text-align: center;
    font-size: 12px;

    padding: 10px 0px 20px;
    border-bottom: 8px solid #eee;
}
  .recommend-item {
    flex: 1;

  }
  .recommend-item img {
    width: 65px;
    height: 65px;
    margin-bottom: 5px;
  }
</style>
