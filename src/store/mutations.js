/* 
商城Vuex-mutations
*/
// 读取
export default {
  saveUserName(state,username){
    state.username = username
  },
  saveCartCount(state,cartCount){
    state.cartCount = cartCount
  }
}