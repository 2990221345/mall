<template>
<div class="loading">
  <img src="/imgs/loading-svg/loading-spinning-bubbles.svg" alt="加载中">
</div>
</template>

<script>
export default {
  name:'loading',
  data(){
    return{

    }
  }
}
</script>

<style lang="scss">
.loading{
  height: 80px;
  line-height: 80px;
  text-align: center;
  padding: 30px;
  img{
    height: 100%;
  }
}
</style>