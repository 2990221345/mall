<template>
  <div class="cart">
    <order-header title="我的购物车">
      <template v-slot:tip>
        <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="cart-box">
          <ul class="cart-item-head">
            <li class="col-1">
              <span
                class="checkbox"
                :class="{ 'checked': allChecked }"
                @click="toggleAll"
              ></span
              >全选
            </li>
            <li class="col-3">商品名称</li>
            <li class="col-1">单价</li>
            <li class="col-2">数量</li>
            <li class="col-1">小计</li>
            <li class="col-1">操作</li>
          </ul>
          <ul class="cart-item-list">
            <li class="cart-item" v-for="(item, index) in list" :key="index">
              <div class="item-check">
                <span
                  class="checkbox"
                  :class="{ checked: item.productSelected }"
                  @click="updataCart(item)"
                ></span>
              </div>
              <div class="item-name">
                <img v-lazy="item.productMainImage" alt="" />
                <span>{{
                  item.productName + ' ， ' + item.productSubtitle
                }}</span>
              </div>
              <div class="item-price">{{ item.productPrice }}元</div>
              <div class="item-num">
                <div class="num-box">
                  <a href="javascript:;" @click="updataCart(item, '-')">-</a>
                  <span>{{ item.quantity }}</span>
                  <a href="javascript:;" @click="updataCart(item, '+')">+</a>
                </div>
              </div>
              <div class="item-total">{{ item.productPrice }}元</div>
              <div class="item-del" @click="delProduct(item)"></div>
            </li>
          </ul>
        </div>
        <div class="order-wrap clearfix">
          <div class="cart-tip fl">
            <a href="/">继续购物</a>
            共<span>{{ list.length }}</span
            >件商品，已选择<span>{{ checkedNum }}</span
            >件
          </div>
          <div class="total fr">
            合计：<span>{{ cartTotalPrice }}</span
            >元
            <a href="javascript:;" class="btn" @click="order">去结算</a>
          </div>
        </div>
      </div>
    </div>
    <Modal
      :showModal="isShow"
      title="确定删除该商品吗？"
      btnType="3"
      @submit="submit"
      @cancel="isShow = false"
    >
      <template v-slot:body>
        <p>删除后不可恢复</p>
      </template>
    </Modal>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import OrderHeader from './../components/OrderHeader'
import NavFooter from '../components/NavFooter'
import ServiceBar from '../components/ServiceBar.vue'
import Modal from './../components/Modal.vue'
export default {
  name: 'cart',
  components: {
    OrderHeader,
    NavFooter,
    ServiceBar,
    Modal,
  },
  data() {
    return {
      list: [], //商品列表
      allChecked: false, //是否全选
      cartTotalPrice: 0, //商品总金额
      checkedNum: 0, //选中商品数量
      isShow: false,
      transition: false,
      productId: null // 删除的商品id
    }
  },
  mounted() {
    this.getCartList()
  },
  methods: {
    //挂载页面完成后获取购物车数据接口
    getCartList() {
      this.axios.get('/carts').then(res => {
        this.renderData(res)
      })
    },
    // 更新购物车数量和购物车状态
    updataCart(item, type) {
      let quantity = item.quantity
      let selected = item.productSelected
      if (type == '-') {
        if (quantity == 1) {
          this.$message.warning('商品至少保留一件')
          return
        }
        --quantity
      } else if (type == '+') {
        if (quantity >= item.productStock) {
           this.$message.warning('商品不能超过库存数量')
          return
        }
        ++quantity
      } else {
        selected = !item.productSelected
      }
      this.axios
        .put(`/carts/${item.productId}`, {
          quantity,
          selected
        })
        .then(res => {
          this.renderData(res)
        })
    },
    // 删除弹出模态框
    delProduct(item) {
      this.isShow = true
      this.productId = item.productId
    },
    // 确认删除按钮
    submit() {
      this.axios.delete(`/carts/${this.productId}`).then(res => {
        this.renderData(res)
        this.isShow = false
        this.$store.dispatch('saveCartCount', res.cartTotalQuantity)
        this.$message.success('删除成功')
      })
    },
    //控制全选功能
    toggleAll() {
      let url = this.allChecked ? '/carts/unSelectAll' : '/carts/selectAll'
      this.axios.put(url).then(res => {
        this.renderData(res)
      })
    },
    //封装的共用方法
    renderData(res) {
      this.list = res.cartProductVoList || [] //商品列表
      this.allChecked = res.selectedAll // 是否全选
      this.cartTotalPrice = res.cartTotalPrice //商品总价格
      this.checkedNum = this.list.filter(item => item.productSelected).length //选中的数量
    },
    // 购物车下单
    order() {
      let isCheck = this.list.every(item => !item.productSelected);
      if(isCheck){
         this.$message.info('必须选择一项商品')
      }else{
        this.$router.push('/order/Confirm')
      }
    }
  }
}
</script>

<style lang="scss">
.cart {
  .wrapper {
    background-color: #f5f5f5;
    padding-top: 30px;
    padding-bottom: 114px;
    .cart-box {
      background-color: #fff;
      font-size: 14px;
      color: #999999;
      text-align: center;
      .checkbox {
        display: inline-block;
        width: 22px;
        height: 22px;
        border: 1px solid #e5e5e5;
        vertical-align: middle;
        margin-right: 17px;
        cursor: pointer;
        &.checked {
          background: url('/imgs/icon-gou.png') #ff6600 no-repeat center;
          background-size: 16px 12px;
          border: none;
        }
      }
      .cart-item-head {
        display: flex;
        height: 79px;
        line-height: 79px;
        .col-1 {
          flex: 1;
        }
        .col-2 {
          flex: 2;
        }
        .col-3 {
          flex: 3;
        }
      }
      .cart-item-list {
        .cart-item {
          display: flex;
          align-items: center;
          height: 125px;
          border-top: 1px solid #e5e5e5;
          font-size: 16px;
          .item-check {
            flex: 1;
          }
          .item-name {
            flex: 3;
            font-size: 18px;
            color: #333333;
            display: flex;
            align-items: center;
            img {
              width: 80px;
              height: 80px;
              vertical-align: middle;
            }
            span {
              margin-left: 30px;
            }
          }
          .item-price {
            flex: 1;
            color: #333333;
          }
          .item-num {
            flex: 2;
            .num-box {
              display: inline-block;
              width: 150px;
              height: 40px;
              line-height: 40px;
              border: 1px solid #e5e5e5;
              font-size: 14px;
              a {
                display: inline-block;
                width: 50px;
                color: #333333;
              }
              span {
                display: inline-block;
                width: 50px;
                color: #333333;
              }
            }
          }
          .item-total {
            flex: 1;
            color: #ff6600;
          }
          .item-del {
            flex: 1;
            width: 14px;
            height: 12px;
            background: url('/imgs/icon-close.png') no-repeat center;
            background-size: contain;
            cursor: pointer;
          }
        }
      }
    }
    .order-wrap {
      font-size: 14px;
      color: #666666;
      margin-top: 20px;
      height: 50px;
      line-height: 50px;
      .cart-tip {
        margin-left: 29px;
        a {
          color: #666666;
          margin-right: 37px;
        }
        span {
          color: #ff6600;
          margin: 0 5px;
        }
      }
      .total {
        font-size: 14px;
        color: #ff6600;
        span {
          font-size: 24px;
        }
        a {
          width: 202px;
          height: 50px;
          line-height: 50px;
          font-size: 18px;
          margin-left: 37px;
        }
      }
    }
  }
}
</style>
