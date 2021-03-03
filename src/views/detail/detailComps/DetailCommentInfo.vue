<template>
  <div>
    <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
      <div class="info-header">
        <div class="header-title">用户评价</div>
        <div class="header-more">
          更多
          <i class="arrow-right"></i>
        </div>
      </div>
      <div class="info-user">
        <img :src="commentInfo.user.avatar" alt="">
        <span>{{commentInfo.user.uname}}</span>
      </div>
      <div class="info-detail">
        <p>{{commentInfo.content}}</p>
        <div class="info-other">

<!--          服务器在返回时间的时候，一定返回的是一串数字153245896等，也就是时间戳-->
<!--          在这里传入showDate方法，进行选择-->
          <span class="date">{{commentInfo.created | showDate}}</span>
          <span>{{commentInfo.style}}</span>
        </div>
        <div class="info-imgs">
          <img :src="item" v-for="(item, index) in commentInfo.images">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {formatDate} from 'common/utils'

  export default {
    name: "DetailCommentInfo",
    props: {
      commentInfo: {
        type: Object,
      }
    },
    filters: {
      showDate(value) {
        //1.将时间戳转成Date对象
        const date = new Date(value * 1000)

        //2.将date进行格式化，转成字符串
        //需要使用utils中定义好的时间戳函数，可以将一串数字，变为正常的年月日时间
        //hh也可以传成HH，h显示十二个小时，H显示24小时,但是需要再utils中修改
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    }
  }
</script>

<style scoped>
  .comment-info {
    padding: 5px 12px;
    color: #333;
    border-bottom: 5px solid #f2f5f8;
  }
  .info-header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }
  .header-title {
    float: left;
    font-size: 15px;
  }
  .header-more {
    float: right;
    margin-right: 10px;
    font-size: 13px;
  }
  .info-user {
    padding: 10px 0 5px;
  }
  .info-user img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }
  .info-user span {
    position: relative;
    font-size: 15px;
    top: -15px;
    margin-left: 10px;
  }
  .info-detail {
    padding: 0 5px 15px;
  }
  .info-detail p {
    font-size: 14px;
    color: #777;
    line-height: 1.5;
  }
  .info-detail .info-other {
    font-size: 12px;
    color: #999;
    margin-top: 10px;
  }
  .info-other .date {
    margin-right: 8px;
  }
  .info-imgs {
    margin-top: 10px;
  }
  .info-imgs img {
    width: 70px;
    height: 70px;
    margin-right: 5px;
  }
</style>
