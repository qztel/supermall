<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles"
         class="tab-control-item"
         :class="{active: index === current}"
          @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        current: 0
      }
    },
    methods: {
      itemClick(index) {
        this.current = index
        this.$emit('tabclick',index)
      }
    }
  }
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 15px;
    background-color: white;
  }

  .tab-control-item {
    flex: 1;
    height: 40px;
    line-height: 40px;
  }
  .tab-control-item span{
    padding: 5px;
  }

  .active {
    color: red;

  }
  .active span{
    border-bottom: 3px solid red;
  }
</style>
