import Vue from 'vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyload from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store/index'
import App from './App.vue'
// import env from './env'
//mock开关
const mock = false
if (mock) {
  require('./mock/api')
}

// 根据前端的跨域方式做调整 /a/b
// axios.defaults.baseURL = 'https://mock.mengxuegu.com/mock/613721b75c91b95c0946d2f9/mockapi' // /api/a/b
axios.defaults.baseURL = '/api' // /api/a/b
axios.defaults.timeout = 8000
// 根据环境变量获取不同的请求地址
// axios.defaults.baseURL = env.baseURL;
Vue.prototype.$message = Message

// 接口错误拦截
axios.interceptors.response.use(function(response) {
  let res = response.data
  let path = location.hash
  if (res.status == 0) {
    return res.data
  } else if (res.status == 10) {
    if (path != '#/index') {
      window.location.href = '/#/login'
    }
    return Promise.reject(res) // 如果不抛出异常就会跳转到购物车页面
  } else {
    Message.warning(res.msg)
    return Promise.reject(res)
  }
},(error)=>{
  let res = error.response
  Message.error(res.data.message)
  return Promise.reject(error)
})

// Vue.prototype.$http = axios
Vue.use(VueAxios, axios)
// Vue.use(Message)
// 图片懒加载
Vue.use(VueLazyload, {
  loading: '/imgs/loading-svg/loading-bars.svg'
})
Vue.use(VueCookie)
Vue.config.productionTip = false
//过滤器
Vue.filter('capitalize', function(value) {
  if (!value) return ''
  return '￥' + value.toFixed(2) + '元'
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
