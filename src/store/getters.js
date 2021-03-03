export default {
  //需要在index.js中导入
  cartLength(state) {
    return state.cartList.length
  },
  cartList(state) {
    return state.cartList
  }
}
