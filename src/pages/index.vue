<template>
  <div class="index">
    <div class="container">
      <div class="swiper-box">
        <div class="nav-menu">
          <ul class="menu-warp">
            <li class="menu-item">
              <a href="javascript:;">手机 电话卡 </a>
              <div class="children">
                <ul v-for="(item, i) in menuList" :key="i">
                  <li v-for="sub in item" :key="sub.id">
                    <a :href="sub ? '/#/product/' + sub.id : ''">
                      <img
                        :src="sub ? sub.img : '/imgs/item-box-1.png'"
                        alt=""
                      />
                      {{ sub ? sub.name : '小米9' }}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item"><a href="javascript:;">电视 盒子</a></li>
            <li class="menu-item"><a href="javascript:;">笔记本 平板</a></li>
            <li class="menu-item"><a href="javascript:;">家电 插线板</a></li>
            <li class="menu-item"><a href="javascript:;"> 出行 穿戴</a></li>
            <li class="menu-item"><a href="javascript:;">智能 路由器</a></li>
            <li class="menu-item"><a href="javascript:;">电源 配件</a></li>
            <li class="menu-item"><a href="javascript:;">生活 箱包</a></li>
          </ul>
        </div>
        <swiper :options="swiperOptions">
          <swiper-slide v-for="item in slideList" :key="item.id">
            <a :href="'/#/product/' + item.id"><img :src="item.img"/></a>
          </swiper-slide>
          <!-- Optional controls -->
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
      <!-- banner盒子 -->
      <div class="ads-box">
        <a
          :href="'/#/product/' + item.id"
          v-for="item in adsList"
          :key="item.id"
        >
          <img v-lazy="item.img" />
        </a>
      </div>
      <div class="banner">
        <a :href="'/#/product/' + 30">
          <img v-lazy="'/imgs/banner-1.png'" alt="" />
        </a>
      </div>
    </div>
    <!-- 产品盒子 -->
    <div class="product-box">
      <div class="container">
        <h2>手机</h2>
        <div class="wrapper">
          <div class="banner-left">
            <a :href="'/#/product/' + 30">
              <img v-lazy="'/imgs/mix-alpha.jpg'" alt="" />
            </a>
          </div>
          <div class="list-box">
            <div class="list" v-for="(arr, index) in phoneList" :key="index">
              <div class="item" v-for="(item, j) in arr" :key="j">
                <span :class="{ 'new-pro': j % 2 == 0 }">新品</span>
                <div class="item-img"><img v-lazy="item.mainImage" alt="" /></div>
                <div class="item-info">
                  <h3>{{ item.name }}</h3>
                  <p>{{ item.subtitle }}</p>
                  <p class="price" @click="addCart(item.id)">{{ item.price | capitalize }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <Modal
      title="提示"
      sureText="查看购物车"
      btnType="3"
      :modalType="'middle'"
      :showModal="showModal"
      @submit='goToCart'
      @cancel='showModal = false'
    >
    <template v-slot:body>
      <p>商品添加成功</p>
    </template>
    </Modal>
  </div>
</template>

<script>
import ServiceBar from './../components/ServiceBar.vue'
import Modal from './../components/Modal.vue'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
  name: 'index',
  data() {
    return {
      showModal:false,
      swiperOptions: {
        autoplay: true,
        loop: true,
        effect: 'cube',
        cubeEffect: {
          slideShadows: true,
          shadow: true,
          shadowOffset: 100,
          shadowScale: 0.6
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      slideList: [
        { id: '42', img: '/imgs/slider/slide-1.jpg' },
        { id: '45', img: '/imgs/slider/slide-2.jpg' },
        { id: '46', img: '/imgs/slider/slide-3.jpg' },
        { id: '47', img: '/imgs/slider/slide-4.jpg' },
        { id: '48', img: '/imgs/slider/slide-5.jpg' }
      ],
      menuList: [
        [
          {
            id: 30,
            img: '/imgs/item-box-1.png',
            name: '小米CC9'
          },
          {
            id: 31,
            img: '/imgs/item-box-2.png',
            name: '小米8青春版'
          },
          {
            id: 32,
            img: '/imgs/item-box-3.jpg',
            name: 'Redmi K20 Pro'
          },
          {
            id: 33,
            img: '/imgs/item-box-4.jpg',
            name: '移动4G专区'
          }
        ],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      adsList: [
        {
          id: 33,
          img: '/imgs/ads/ads-1.png'
        },
        {
          id: 48,
          img: '/imgs/ads/ads-2.jpg'
        },
        {
          id: 45,
          img: '/imgs/ads/ads-3.png'
        },
        {
          id: 47,
          img: '/imgs/ads/ads-4.jpg'
        }
      ],
      phoneList: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.axios
        .get('/products', {
          params: {
            categoryId: 100012,
            pageSize: 14
          }
        })
        .then(res => {
          res.list = res.list.slice(6, 14)
          this.phoneList = [res.list.slice(0, 4), res.list.slice(4, 8)]
        })
        .catch(err => {
          console.log('获取数据失败', err)
        })
    },
    //加购物车
    addCart(id){
      this.axios.post('/carts',{
        productId:id,
        selected: true
      }).then(res => {
        this.showModal = true;
        this.$store.dispatch('saveCartCount', res.cartTotalQuantity)
      }).catch(() => {
        this.showModal = true;
      })
    },
    //
    goToCart(){
      this.$router.push('/cart')
    }
  },
  components: {
    ServiceBar,
    swiper,
    swiperSlide,
    Modal
  }
}
</script>

<style lang="scss" scoped>
@import './../assets/scss/config.scss';
@import './../assets/scss/mixin.scss';
.index {
  .swiper-box {
    .nav-menu {
      position: absolute;
      width: 264px;
      height: 451px;
      z-index: 9;
      padding: 26px 0;
      box-sizing: border-box;
      background: rgba(85, 88, 90, 0.48);
      .menu-warp {
        .menu-item {
          height: 50px;
          line-height: 50px;
          a {
            display: block;
            position: relative;
            font-size: 16px;
            color: #fff;
            padding-left: 30px;
            &:before {
              content: ' ';
              position: absolute;
              top: 17.5px;
              right: 30px;
              @include bgImg(10px, 15px, '/imgs/icon-arrow.png');
            }
          }
          &:hover {
            background: #f60;
            .children {
              display: block;
            }
          }
          .children {
            display: none;
            position: absolute;
            top: 0;
            left: 264px;
            width: 962px;
            height: 451px;
            background: #fff;
            ul {
              display: flex;
              justify-content: space-around;
              height: 75px;
              li {
                height: 75px;
                line-height: 75px;
                flex: 1;
                padding-left: 23px;
                a {
                  font-size: 14px;
                  color: #333;
                }
                img {
                  width: 42px;
                  height: 35px;
                  vertical-align: middle;
                  margin-right: 3px;
                }
              }
            }
          }
        }
      }
    }
    .swiper-container {
      height: 451px;
      img {
        width: 100%;
        height: 100%;
      }
      .swiper-button-prev {
        position: absolute;
        left: 274px;
      }
    }
  }

  .ads-box {
    @include flex();
    margin: 14px 0 31px 0;
    a {
      width: 296px;
      height: 167px;
    }
  }
  .banner {
    margin-bottom: 50px;
  }
  .product-box {
    padding: 30px 0 50px;
    background: #f5f5f5;
    h2 {
      font-size: 22px;
      height: 21px;
      line-height: 21px;
      margin-bottom: 20px;
      color: #333;
    }
    .wrapper {
      display: flex;
      .banner-left {
        margin-right: 16px;
        img {
          width: 224px;
          height: 619px;
        }
      }
      .list-box {
        .list {
          @include flex();
          width: 986px;
          margin-bottom: 14px;
          &:last-child {
            margin: 0;
          }
          .item {
            width: 236px;
            height: 302px;
            background: #fff;
            text-align: center;
            span {
              display: inline-block;
              width: 67px;
              height: 24px;
              line-height: 24px;
              font-size: 14px;
              color: #fff;
              &.new-pro {
                background: #7ecf68;
              }
              &.kill-pro {
                background: #e82626;
              }
            }
            .item-img {
              img {
                width: 100%;
                height: 195px;
              }
            }
            .item-info {
              h3 {
                line-height: 14px;
                font-size: 14px;
                font-weight: bold;
                color: #333;
              }
              p {
                color: #999;
                line-height: 13px;
                margin: 6px auto 13px;
              }
              .price {
                font-size: 14px;
                font-weight: bold;
                color: #f20a0a;
                cursor: pointer;
                &:after {
                  @include bgImg(22px, 22px, '/imgs/icon-cart-hover.png');
                  content: '';
                  margin-left: 5px;
                  vertical-align: middle;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
