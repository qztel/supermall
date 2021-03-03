<template>
  <div id="detail" >
      <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
      <scroll class="content"
              ref="scroll"
              @scroll="contentScroll"
              :probe-type="3">
        <detail-swiper :top-images=topImages></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shops"></detail-shop-info>
        <detail-goods-info :detail-info="detailInfo"
                           @imageLoad="imageLoad"></detail-goods-info>
        <detail-param-info ref="params" :param-info="paramInfo" ></detail-param-info>
        <detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>
        <div class="remd">推荐商品</div>
        <goods-list ref="recommend" :goods="recommends" class="goodslist"></goods-list>
      </scroll>
<!--      <div class="daodi">已经到底拉</div>-->
    <back-top @click.native="backClick" v-show="isShowBackTop" class="back-top"></back-top>
      <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
<!--      <toast :message="message" :is-show="show"></toast>-->
  </div>
</template>

<script>
  import DetailNavBar from "./detailComps/DetailNavBar";
  import DetailSwiper from "./detailComps/DetailSwiper";
  import DetailBaseInfo from "./detailComps/DetailBaseInfo";
  import DetailShopInfo from "./detailComps/DetailShopInfo";
  import DetailGoodsInfo from "./detailComps/DetailGoodsInfo";
  import DetailParamInfo from "./detailComps/DetailParamInfo";
  import DetailCommentInfo from "./detailComps/DetailCommentInfo";
  import DetailBottomBar from "./detailComps/DetailBottomBar";

  import Scroll from "../../components/common/scroll/Scroll";
  import GoodsList from "../../components/content/goods/GoodsList";
  // import Toast from "../../components/common/toast/Toast";

  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "../../network/detail";
  import {backTopMixin} from "../../common/mixin";


  export default {
    name: "Detail",
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shops: {},
        detailImages: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],

        //这里定义点击导航栏后，需要滚动到什么位置
        themeTopYs: [],
        //定义方法，调用防抖动函数
        getThemeTopY:null,
        //用来记录滑动到哪里的index
        currentIndex: 0,

        // message: '商品以被添加',
        // show: false
      }
    },
    //在这里使用混入，将保存的点击返回最顶层按钮的数据导入，并在监听滚动的函数中使用
    mixins: [backTopMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,

    // Toast,
    //推荐数据可以直接使用goodslist这个组件
    GoodsList
  },
    created() {
      //1.拿到route中的iid,并进行保存
      this.iid = this.$route.params.iid

      //2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        const data = res.result;

        //1.获取顶部的图片轮播数据
        //将数据传入轮播图组件中
        this.topImages = res.result.itemInfo.topImages

        //2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // console.log(this.goods);

        //3.创建店铺信息的对象
        this.shops = new Shop(data.shopInfo)

        //4.获取商品下方显示的详细信息
        this.detailInfo = data.detailInfo

        //5.获取商品参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        // console.log(this.paramInfo);

        //6.取出评论信息（有些商品没有评论信息）
        if(data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }

        //第一次获取各各组件的高度，从而进行点击跳转，但是在这里获取是不对的
        //因为this.$refs.params.$el压根没有渲染
        // this.themeTopYs.push(0);
        // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        //
        // //第二次获取时，值不对的原因是
        // //图片没有加载完，所以导致值有问题
        // this.$nextTick(() => {
        //   this.themeTopYs.push(0);
        //
        //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        // })
      })

      //3.请求商品详情页推荐的数据
      getRecommend().then(res => {
        // console.log(res);
        //拿到data.list中的推荐数据
        this.recommends = res.data.list
      })

      //4.给getThemeTopY赋值(并且给他进行防抖操作)
      this.getThemeTopY = this.debounce(() => {
        //将每个组件对应的高度获取，并放入数组中
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE);

        // console.log(this.themeTopYs);
      },100)
    },
        //详情页防抖动
    mounted() {
      const refresh = this.debounce(this.$refs.scroll.refresh,200)

      this.$bus.$on('detailImageLoad', () => {
        refresh()
      })
    },
    methods: {

      imageLoad() {
        //在这里调用，使其刷新添加图片的高度
        this.$refs.scroll.refresh()

        this.getThemeTopY()
      },
      //防抖动函数
      debounce(func, delay) {
        let timer = null
        return function (...args) {
          //clearTimeout取消setTimeout定义的方法
          if (timer) clearTimeout(timer)
          timer = setTimeout(() => {
            //apply: 在特定的作用域(this)中调用函数
            func.apply(this, args)
          },delay)
        }
      },
      titleClick(index) {
        //点击以后，传入index，拿取数组themeTopYs数组中对应的高度，然后点击进行跳转
        this.$refs.scroll.scroll.scrollTo(0,-this.themeTopYs[index]+44,100)
        // console.log(index);
      },
      contentScroll(position) {
        //监听滚动，获取滚动的Y值
        //1.获取Y值
        const positionY = -position.y

        //2.positionY和主题的值进行对比
        let length =this.themeTopYs.length

        for(let i = 0; i < length-1; i++) {
          if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
            this.currentIndex = i ;
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }

        //3.是否显示回到顶部，这里使用的是混入里的方法
        this.listenShoBackTop(position)
      },

      //点击添加到购物车
      addToCart() {
       //1.获取购物车需要展示的信息
        const product  = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.goods = this.goods.realPrice
        product.iid = this.iid

        //2.将商品添加到购物车
        //在这里使用Vuex来进行管理数据，然后可以传入购物车组件中，不能使用事件总线
        this.$store.commit('addCart',product)


        //这里可以使用以下方法，也可以自己创建全局插件，添加属性让他来进行显示，插件在Toast中
        this.$toast.show('商品已被添加',2000)
        // this.show = true;
        // setTimeout(() => {
        //   this.show = false;
        //   this.message = '商品数量+1'
        // },1500)
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    background-color: white;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    top: 0px;
    z-index: 4;
    background-color: white;
  }

  .content {
    height: calc(100% - 93px);
    position: fixed;
    left: 0;
    right: 0;
    z-index: 3;
    background-color: white;
  }


  .goodslist {
    background-color: white;
  }

  .remd {
    height: 35px;
    line-height: 35px;
    font-size: 18px;
    text-align: center;
    border-bottom: 5px solid #f2f5f8;
  }

  .back-top {
    z-index: 3;
    margin-bottom: 15px;
  }
</style>
