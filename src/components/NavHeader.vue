<template>
  <div class="header">
    <div class="nav-topbar">
      <div class="container">
        <div class="topbar-menu">
          <a href="javascript:;">小米商城</a>
          <a href="javascript:;">Miul</a>
          <a href="javascript:;">云服务</a>
          <a href="javascript:;">协议规则</a>
        </div>
        <div class="topbar-user">
          <a href="javascript:;" v-if="username">{{ username || '' }}</a>
          <a href="javascript:;" v-if="!username" @click="goLogin">登录</a>
          <a href="javascript:;" v-if="username" @click="logout">退出登录</a>
          <a href="/#/order/list" v-if="username">我的订单</a>
          <a href="javascript:;" class="my-cart" @click="goCart"
            ><span class="icon-cart"></span>购物车 ({{ cartCount }})</a
          >
        </div>
      </div>
    </div>
    <div class="nav-header">
      <div class="container">
        <div class="header-logo">
          <a href="/#/index"></a>
        </div>
        <div class="header-menu">
          <div class="item-menu">
            <span>小米手机</span>
            <div class="children">
              <ul>
                <li
                  class="product"
                  v-for="(item, index) in phoneList"
                  :key="index"
                >
                  <a :href="'/#/product/' + item.id" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="item.mainImage" :alt="item.subtitle" />
                    </div>
                    <div class="pro-name">{{ item.name }}</div>
                    <div class="pro-price">{{ item.price | capitalize }}</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-menu">
            <span>RedMI手机</span>
            <div class="children"></div>
          </div>
          <div class="item-menu">
            <span>电视</span>
            <div class="children">
              <ul>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-1.jpg'" alt="" />
                    </div>
                    <div class="pro-name">小米壁画电视 65英寸</div>
                    <div class="pro-price">{{ 6999 | capitalize }}</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-2.jpg'" alt="" />
                    </div>
                    <div class="pro-name">小米全面屏电视E55A</div>
                    <div class="pro-price">1999元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-3.png'" alt="" />
                    </div>
                    <div class="pro-name">小米电视4A 32英寸</div>
                    <div class="pro-price">699元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-4.jpg'" alt="" />
                    </div>
                    <div class="pro-name">小米电视4A 55英寸</div>
                    <div class="pro-price">1799元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-5.jpg'" alt="" />
                    </div>
                    <div class="pro-name">小米电视4A 65英寸</div>
                    <div class="pro-price">2699元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-6.png'" alt="" />
                    </div>
                    <div class="pro-name">查看全部</div>
                    <div class="pro-price">查看全部</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="header-search">
          <div class="wrapper">
            <input type="text" name="keyword" />
            <a href="javascript:;"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
export default {
  name: 'nav-header',
  data() {
    return {
      // username:this.$store.state.username,
      phoneList: []
    }
  },
  computed: {
    // username(){
    //   return this.$store.state.username
    // },
    // cartCount(){
    //   return this.$store.state.cartCount
    // },
    ...mapState(['username', 'cartCount'])
  },
  create() {},
  mounted() {
    let params = this.$route.params.from
    if (params && params == 'login') {
      this.getCartCount()
    }
    this.getProductList()
  },
  methods: {
    goLogin() {
      this.$router.push('/login')
    },
    getProductList() {
      this.axios
        .get('/products', {
          params: {
            categoryId: '100012',
            pageSize: 6
          }
        })
        .then(res => {
          if (res.list.length >= 6) {
            this.phoneList = res.list.slice(0, 6)
          }
        })
    },
    goCart() {
      this.$router.push('/cart')
    },
    getCartCount() {
      this.axios.get('/carts/products/sum').then((res = 0) => {
        this.$store.dispatch('saveCartCount', res)
      })
    },
    logout() {
      this.axios.post('/user/logout').then(() => {
        this.$message.success('退出成功')
        // 写入空cookie 立即失效
         this.$cookie.set('userId', '', { expires: '-1' })
         //删除cookie
        // this.$cookie.delete('userId')
        // this.$store.dispatch('SavaUserName','')
        this.saveUserName('')
        this.saveCartCount(0)
      })
    },
    ...mapActions(['saveUserName', 'saveCartCount'])
  }
}
</script>

<style lang="scss">
@import './../assets/scss/base.scss';
@import './../assets/scss/mixin.scss';
@import './../assets/scss/config.scss';
.header {
  .nav-topbar {
    height: 39px;
    line-height: 39px;
    background-color: #333333;
    color: #b0b0b0;
    .container {
      @include flex();
      a {
        display: inline-block;
        color: #b0b0b0;
        margin-right: 17px;
      }
      .my-cart {
        width: 110px;
        background: #ff6600;
        text-align: center;
        color: #fff;
        margin-right: 0;
        .icon-cart {
          @include bgImg(16px, 12px, '/imgs/icon-cart-checked.png');
          margin-right: 4px;
        }
      }
    }
  }
  .nav-header {
    .container {
      position: relative;
      height: 112px;
      @include flex();
      .header-menu {
        display: inline-block;
        width: 643px;
        padding-left: 209px;
        .item-menu {
          display: inline-block;
          color: #333;
          font-weight: bold;
          font-size: 16px;
          line-height: 112px;
          margin-right: 20px;
          span {
            cursor: pointer;
          }
          &:hover {
            color: $colorA;
            .children {
              height: 220px;
              opacity: 1;
            }
          }
          .children {
            position: absolute;
            overflow: hidden;
            top: 122px;
            left: 0;
            width: 1226px;
            height: 0;
            opacity: 0;
            transition: all 0.5s;
            border-top: 1px solid #e5e5e5;
            box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
            z-index: 10;
            background: #fff;
            .product {
              position: relative;
              float: left;
              width: 16.6%;
              height: 220px;
              font-size: 12px;
              line-height: 12px;
              text-align: center;
              a {
                display: inline-block;
              }
              img {
                width: auto;
                height: 111px;
                margin-top: 26px;
              }
              .pro-img {
                height: 137px;
              }
              .pro-name {
                font-weight: bold;
                margin-top: 19px;
                margin-bottom: 8px;
                color: $colorB;
              }
              .pro-price {
                color: $colorA;
              }
              &:before {
                content: '';
                position: absolute;
                top: 28px;
                right: 0;
                border-left: 1px solid $colorF;
                height: 100px;
                width: 1px;
              }
              &:last-child::before {
                display: none;
              }
            }
          }
        }
      }
      .header-search {
        width: 319px;
        .wrapper {
          height: 50px;
          border: 1px solid #e0e0e0;
          display: flex;
          align-items: center;
          input {
            width: 265px;
            height: 50px;
            padding-left: 14px;
            box-sizing: border-box;
            border: none;
            border-right: 1px solid #e0e0e0;
          }
          a {
            display: inline-block;
            @include bgImg(18px, 18px, '/imgs/icon-search.png');
            margin-left: 17px;
          }
        }
      }
    }
  }
}
</style>
