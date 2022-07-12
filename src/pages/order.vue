<template>
  <div>
    <router-view></router-view>
    <ServiceBar></ServiceBar>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import ServiceBar from '../components/ServiceBar.vue'
import NavFooter from './../components/NavFooter'
export default {
  name: 'order',
  data() {
    return {
    }
  },
  components: {
    NavFooter,
    ServiceBar
  }
}
</script>

<style></style>
