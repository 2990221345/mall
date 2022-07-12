/* 
商城Vuex-action
*/
// 传输
export default {
  saveUserName(context,username){
    context.commit('saveUserName',username)
  },
  saveCartCount(context,cartCount){
    context.commit('saveCartCount',cartCount)
  }
}