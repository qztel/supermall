import {debouce} from './utils'
//在这里进行混入操作，可以减少代码重复量
// export const itemListenerMixin ={
//   mounted() {
//
//   }
// }
import BackTop from "../components/content/backTop/BackTop";
export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,

      //定义回到顶部按钮中的一个常量
      backtopDistance:1000
    }
  },
  methods: {
    backClick(){
      this.$refs.scroll.scroll.scrollTo(0,0,500)
    },
    listenShoBackTop(position) {
      this.isShowBackTop = -position.y > 1300
    }
  }
}
