import Vue from 'vue'
import Vuex from 'vuex'

import getters from "./getters";
// import mutations from './mutations'

//1.安装插件
Vue.use(Vuex)

//2.创建Store对象
const store = new Vuex.Store({
  getters,

  state: {
    //创建空数组，用来储存需要传入购物车的数据
    cartList: []
  },
  mutations: {
    addCart(state,payload) {
        //1.payload新添加的商品
        //定义一个空值，遍历所有的数组，如果新添加的商品的iid，和之前存在的数组中的iid相同
        //那么将这个新数组保存
        let oldProduct = null
        for(let item of state.cartList){
          if(item.iid ===payload.iid) {
            oldProduct = item;
          }
        }
        //1.1第二种方法：使用find函数查找，如果查找到了，就返回true
        //然后再将值传入下方的判断语句中
        // let oldproduct = state.cartList.find(function(item) {
        //   return item.iid === payload.iid
        // })

        //2.判断oldProduct
        //如果oldProduct有值，也就是存在相同的商品，那么使他的count+1
        if(oldProduct) {
          oldProduct.count += 1
        }else {
          //如果没有值，给新添加的商品一个count属性，让他等于1
          //当oldProduct有值时，就会使其count加1
          payload.count = 1
          // 添加一个属性，用来计算是否点击了选择按钮，选中商品，默认为false
          payload.checked = false
          state.cartList.push(payload)
        }
    }
  }
})

//3.挂载到Vue实例上
//在main.js中使用
export  default store
