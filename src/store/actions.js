import {
  ADD_COUNT,
  ADD_TO_CART,
  SUB_CART
} from './mutation-types'
export default {
  addCart({ commit, state }, payload) {
    // let oldProduct =null
    // for(let item of state.cartList){
    //   if(item.iid===payload.iid){
    //     oldProduct=item
    //   }
    // }
    return new Promise(res => {

      let oldProduct = state.cartList.find(item => item.iid === payload.iid)
      if (oldProduct) {
        commit(ADD_COUNT, oldProduct)
        res('添加的商品+1')
      } else {
        payload.count = 1
        commit(ADD_TO_CART, payload)
        res('商品已被添加到购物车')

      }
    })
  },
  subCart({ commit, state }) {
    // let keys = state.cartList.filter((item) => {
    //   return item.checked == true
    // })
    // let newKeys=state.cartList.filter(item=>!keys.includes(item))
 let keys = state.cartList.filter((item) => {
      return item.checked == true
    })
    commit(SUB_CART,keys)
  }
}