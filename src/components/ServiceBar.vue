<template>
  <div class="service">
    <div class="container">
      <ul>
        <li><span class="icon-setting"></span>预约维修服务</li>
        <li><span class="icon-7day"></span>7天无理由退货</li>
        <li><span class="icon-15day"></span>15天免费换货</li>
        <li><span class="icon-post"></span>满150元包邮</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name:'service-bar',
  data(){
    return{

    }
  }
}
</script>

<style lang="scss" scoped>
@import './../assets/scss/mixin.scss';
.service{
  padding:33px 0;
  color: #666;
  font-size: 16px;
  li{
    float: left;
    width: 24.9%;
    text-align: center;
    border-right: 1px solid #ccc;
    &:last-child{
      border: 0
    }
    .icon-setting{
      @include bgImg(20px,20px,'/imgs/icon-setting.png');
      margin-right: 8px;
      vertical-align: middle;
    }
    .icon-7day{
      @include bgImg(20px,20px,'/imgs/icon-7day.png');
      margin-right: 8px;
      vertical-align: middle;
    }
    .icon-15day{
      @include bgImg(20px,20px,'/imgs/icon-15day.png');
      margin-right: 8px;
      vertical-align: middle;
    }
    .icon-post{
      @include bgImg(20px,20px,'/imgs/icon-post.png');
      margin-right: 8px;
      vertical-align: middle;
    }
  }
}
</style>