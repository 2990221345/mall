<template>
  <div class="noData">
    <img src="/imgs/icon-no-data.png" alt="">
    <p>当前暂无提交的订单记录.</p>
  </div>
</template>

<script>
export default {
  name:'no-data',
  data(){
    return{

    }
  }
}
</script>

<style lang="scss">
.noData{
  text-align: center;
  font-size: 20px;
  color: #999;
  margin: 50px;
  img{
    width: 240px;
    height: 180px;
    margin-bottom: 30px;
  }
}
</style>