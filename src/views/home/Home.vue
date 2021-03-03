<template>
  <div id="home" class="wrapper">
   <Navbar class="home-nav"><div slot="center">购物街</div></Navbar>
    <tab-control :titles="['流行','新款','精选']"
                 @tabclick="tabclick"
                 ref="tabControl1"
                  class="tabControl"
                  v-show="isTabFixed"></tab-control>
    <Scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-upload="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" class="home-swiper"
                   @lbtImageLoad="lbtImageLoad"></home-swiper>
      <recommend-view :recommend="recommend"></recommend-view>
      <Feature></Feature>
      <tab-control :titles="['流行','新款','精选']"
                   @tabclick="tabclick"
                    ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </Scroll>
<!--    监听组件事件的点击，必须添加native-->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import Feature from "./childComps/Feature";

  import Navbar from "../../components/common/navbar/Navbar";
  import TabControl from "../../components/content/tabControl/TabControl";
  import GoodsList from "../../components/content/goods/GoodsList";
  import Scroll from "../../components/common/scroll/Scroll";
  import BackTop from "../../components/content/backTop/BackTop";

  import {getHomeMultidata} from "network/home";
  import {getHomeGoods} from "network/home";


  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      Feature,

      Navbar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return  {
        banners: [],
        recommend: [],

        //定义三个变量，流行，新款，精选，page，代表加载的数据到第几页了
        // list用来存放所有对应的数据
        goods: {
          'pop' : {page: 0, list: []},
          'new' : {page: 0, list: []},
          'sell' : {page: 0, list: []}
        },
        //当前默认类型为pop
        currentType: 'pop',

        //默认不显示回到顶部的图标
        isShowBackTop: false,

        //用来存储流行精选导航栏的位置
        tabOffsetTop: 0,
        //用来决定流行精选导航栏什么时候需要吸顶
        isTabFixed: true,

        //用来确定是否离开home路由
        saveY: 0

      }
    },
    //路由跳转后,会记录位置,不会进行销毁
    activated() {
        this.$refs.scroll.scroll.scrollTo(0,this.saveY,0)
        this.$refs.scroll.scroll.refresh()
    },
    deactivated() {
      this.saveY = this.$refs.scroll.scroll.y
    },

    created() {
      //1.请求多个数据
      this.getHomeMultidata()
      //2.请求流行精选等商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
      //2.获取tabControl的offsetTop(位置)
      //但是在这里获取是不正确的值，需要监听其他图片加载完成后，才能获取到正确数值
      //所有的组件都有一个属性$el：用来获取组件中的元素

      //3.监听item中图片加载完成
      //使用$bus，来调用事件总线中的事件
      //程序中默认没有$bus，则需要再main.js中自行添加
      const refresh = this.debounce(this.$refs.scroll.refresh,200)
      //在这里使用防抖动函数，将需要执行的函数和时间传递进去，
      //然后图片加载时，等待两百毫秒，如果一张图片没在两百毫秒内加载的话，就会执行刷新
      //总体意思就是等待30张图片加载完以后，在进行执行刷新，网速过慢的话，会执行多次
      this.$bus.$on('homeImageLoad', () => {
        refresh()
      })
    },
    computed: {
      //定义计算属性，将复杂的代码放入，然后再进行使用
      showGoods() {
        return this.goods[this.currentType].list
      }
    },

    //将请求数据的数组进行封装，然后再生命周期函数中使用
    methods: {
//事件监听相关方法：

      //防抖动函数作用
      //再监听图片加载时，会频繁连续调用监听方法
      //因此需要添加防抖动函数，让其只执行一次
      debounce(func, delay) {
        let timer = null
        return function (...args) {
          //如果timer有返回的结果时，就会进行清空，知道他没有值为止
          //意思就是每次调用刷新函数，就会进行清空调用，直到最后一张图片，之后就没有值了，所以不会进行清空，
          if (timer) clearTimeout(timer)
          //clearTimeout用来清除setTimeout方法
          timer = setTimeout(() => {
            //apply: 在特定的作用域(this)中调用函数
            func.apply(this, args)
          },delay)
        }
      },

      //监听点击的是流行还是新款还是精选
      tabclick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        //使两个导航栏中选中的值是一样的
        this.$refs.tabControl1.current = index;
        this.$refs.tabControl2.current = index;
        this.$refs.scroll.scroll.scrollTo(0,(-this.tabOffsetTop - 44),0)
      },

      //监听返回顶层按钮的事件
      backClick(){
        //拿到对象以后，可以直接访问其中的数据以及方法等
        //使其将x,y全变为0，并在500毫秒内执行
        this.$refs.scroll.scroll.scrollTo(0,0,500)
        //如果有需要，可以直接在组件的methods中定义函数，然后在这里直接拿到并使用
      },

      //监听滚动后，拿到其滚动的坐标,并进行判断，是否超过此坐标
      contentScroll(position){
        //1.判断BackTop是否显示
        if(position.y> -1000){
          this.isShowBackTop = false
        }else if(position.y< -1000){
          this.isShowBackTop =true
        }
        //2.决定tabControl是否吸顶(position: fixed)
          this.isTabFixed = (-position.y - 5) > (this.tabOffsetTop + 44)
      },

      //监听上拉加载更多，等上拉到底部时，调用这个方法
      loadMore() {
        this.getHomeGoods(this.currentType)

        //在滚动时，图片没有加载完的话会产生滚动不了BUG
        //添加方法，会在图片传过来以后进行刷新，从而消除BUG
        //但不能直接添加，需要在首页图片组件中添加防抖动方法
      },

      //监听轮播图加载完成
      lbtImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },

//网络请求相关的方法：
      getHomeMultidata() {
        //拿到对应的数据，放入对应的空数组中
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommend = res.data.recommend.list;
        })
      },

      getHomeGoods(type) {
        //定义一个page，每次请求时，都会将页码进行加1
        //从而进行上拉加载下一页的操作
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
          //将拿到的数据数组放入另一个数组中，就可以用到push(...xxx)来实现
          this.goods[type].list.push(...res.data.list)
          //拿到以后，再将请求到数据的页码加一，下次请求时就会请求第二页的数据
          this.goods[type].page += 1
          //调用scroll中定义好的方法，实现连续的上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      }
  }
  }
</script>

<style scoped>
  #home {
    /*视觉窗口：*/
    height: 100vh;
    position: relative;
  }
  .home-nav {
  background-color: #E87373;
  color: white;
  font-size: 17px;
}

  .home-swiper{
    margin-top: 44px;
  }

  .tabControl {
    position: relative;
    z-index: 1;
    margin-top: -1px;
  }


  /*也可以使用这种方式来定位最合适的地方*/

  /*.content {*/
  /*  height: calc(100% - 97px);*/
  /*  overflow: hidden;*/
  /*  margin-top: 44px;*/
  /*}*/

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 50px;
    left: 0;
    right: 0;
  }



</style>
