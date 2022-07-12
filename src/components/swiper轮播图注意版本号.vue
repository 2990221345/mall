<template>
  <div class="index">
    <div class="container">
      <div class="swiper-box">
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
      <div class="adx-box"></div>
      <div class="banner"></div>
      <div class="product-box"></div>
      index
    </div>
    <service-bar></service-bar>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
  name: 'index',
  data() {
    return {
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
          clickable :true
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
      ]
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style lang="scss" scoped>
.index {
  .swiper-box {
    .swiper-container {
      height: 451px;
      img {
        width: 100%;
      }
    }
  }
}
</style>
