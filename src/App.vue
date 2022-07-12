<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import login from './../public/mock/user/login.json'
// import storage from './storage/index'
export default {
  name: 'App',
  components: {},
  data() {
    return {}
  },
  mounted() {
    let cookie = this.$cookie.get('userId')
    // 判断有没有登录ck 在进行获取 用户名和购物车数量
    if (cookie) {
      this.getUser()
      this.getCartCount()
    }
  },
  methods: {
    getUser() {
      this.axios.get('/user').then((res = {}) => {
        //to-do 保存到vuex里面
        this.$store.dispatch('saveUserName', res.username)
      })
    },
    getCartCount() {
      this.axios.get('/carts/products/sum').then((res = 0) => {
        this.$store.dispatch('saveCartCount', res)
      })
    }
  }
}
</script>

<style lang="scss">
@import './assets/scss/reset.scss';
@import './assets/scss/button.scss';
</style>
