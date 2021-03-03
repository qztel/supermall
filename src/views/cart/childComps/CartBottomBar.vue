<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button"
                    :is-checked="isSelectAll"
                    @click.native="checkClick"/>
      <span>全选</span>
    </div>

    <div class="total-price">
      合计: ￥{{totalPrice}}
    </div>

    <div class="calculate" @click="calculateClick">
      去计算：({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from "../../../components/content/checkButton/CheckButton";
  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    data() {
      return {
        checkedStatus: [],
        reg: /true/i
      }
    },
    computed: {
      totalPrice() {
        //这里定义计算属性来进行筛选
        //首先使用filter方法来筛选checked为true的商品
        //然后再使用reduce方法来对剩下的商品进行价格计算和汇总
        return this.$store.getters.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.goods * item.count
        },0).toFixed(2)//保留两位小数
      },
      checkLength() {
        //用来计算选中商品的个数
        return this.$store.state.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        //全选按钮在有被选中的商品时，应该为false
        //1.所以要先判断是否存在商品被选中，有被选中的话，长度就不为0
        //然后再进行取反，就得到的全选为false
        // return !(this.$store.state.cartList.filter(item => item.checked).length)

        //2.使用find方法进行判断，如果有一个商品没被选中，则全选按钮为false，
        //如果全被选中，则就为true
        //if判断如果没有商品时，就显示为false
        if(this.$store.state.cartList.length ===0) return false
        return !this.$store.state.cartList.find(item => !item.checked)

        //3.普通遍历
        // for(let item of this.$store.state.cartList) {
        //   if(!item.checked) {
        //     return false
        //   }
        // }
        // return true
      }
    },
    methods: {
      checkClick() {
        if(this.isSelectAll) { //如果全部选中的话，就变为false
          this.$store.state.cartList.forEach(item => item.checked = false)
        } else { //如果没选中的话，就变为true
          this.$store.state.cartList.forEach(item => item.checked = true)
        }
      },
      calculateClick() {
        //1.判断选中的商品是否大于一个
        const checkedLength = []
        for(let item of this.$store.state.cartList) {
          if(item.checked === true) {
            checkedLength.push(item.checked)
          }
        }
        if(checkedLength.length <= 0){
          this.$toast.show('请选择需要结算的商品',2000)
        }

      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    display: flex;
    font-size: 16px;

    width: 100%;
    height: 50px;

    position:relative;

    line-height: 50px;
    background-color: #eee;
  }
  .check-content {
    display: flex;
    align-items: center;

  }
  .check-button {
    line-height: 22px;
    margin-left: 20px;
    margin-right: 10px;
    width: 25px;
    height: 22px;
  }

  .total-price {
    margin-left: 20px;
  }

  .calculate {
    text-align: center;
    position: absolute;
    width: 25%;
    right: 0px;
    background-color: orange;
    border: 3px solid white;
  }
</style>
