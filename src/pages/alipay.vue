<template>
<div class="alipay">
  <Loading v-if="loading"></Loading>
  <div class="form" v-html="content"></div>
</div>
</template>

<script>
import Loading from './../components/Loading.vue'
export default {
  name:'alipay',
  data(){
    return{
      orderId : this.$route.query.orderId,
      content:'',
      loading:true
    }
  },
  components:{
    Loading
  },
  mounted(){
    this.paySubmit();
  },
  methods:{
    paySubmit(){
      this.axios.post('/pay',{
        orderId:this.orderId,
        orderName:'Vue高仿小米商城', //扫码支付时订单名称
        amount:0.01, //单位元
        payType:1 //1支付宝，2微信
      }).then(res =>{
        this.content = res.content
        setTimeout(() => {
          document.getElementById('bestPayForm').submit();
        }, 100);
      })
    }
  }
}
</script>

<style lang="scss">
.alipay{

}
</style>