<template>
  <div class="footer">
    <div class="footer-logo">
      <img src="/imgs/logo-footer.png" alt="">
      <p>小米商城</p>
    </div>
    <div class="footer-link">
      <a href="">河畔一角主页</a><span> | </span>
      <a href="">React全家桶课程</a><span> | </span>
      <a href="">微信支付专项课程</a><span> | </span>
      <a href="">配套课程：Java通用型支付+电商平台双系统实战</a>
    </div>
    <div class="copyright">
Copyright ©2020 <span class="domain">mi.futurefe.com</span> All Rights Reserved.
    </div>
  </div>
</template>

<script>
export default {
  name:'nav-footer',
  data(){
    return{

    }
  }
}
</script>

<style lang="scss" scoped>
.footer{
  height: 234px;
  border-top: 4px solid #ff6600;
  font-size: 16px;
  text-align: center;
  background: #333;
  color: #999;
  .footer-logo{
    margin-top: 46px;
    margin-bottom: 31px;
    img{
      width: 53px;
      height: 36px;
      margin-bottom: 13px;
    }
  }
  .footer-link{
    margin-bottom: 13px;
     a{
      display: inline-block;
      text-decoration: none;
      font-size: 16px;
      color: #999;
    }
    span{
      margin: 0 10px;
    }
  }
  .copyright{
    .domain{
      color: #ff6600;
    }
  }
}
</style>