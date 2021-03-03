<template>
  <div>
    <Navbar>
      <div slot="left" class="back" @click="backClick">
        <
      </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in titles"
             class="title-item"
              :class="{active: index === currentIndex}"
              @click="titleClick(index)">{{item}}</div>
      </div>
    </Navbar>
  </div>
</template>

<script>
  import Navbar from "../../../components/common/navbar/Navbar";

  export default {
    name: "DetailNavBar",
    components: {
      Navbar
    },
    data() {
      return {
        titles: ['商品','参数','评论','推荐'],
        currentIndex: 0
      }
    },
    methods: {
      titleClick(index) {
        this.currentIndex = index
        this.$emit('titleClick',index)
      },
      backClick() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  .title {
    display: flex;
  }
  .title-item {
    flex: 1;
    font-size: 15px;
  }

  .active {
    color: red;
  }

  .back {
    font-size: 25px;
    margin-top: -1px;
  }
</style>
