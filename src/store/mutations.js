import {
  ADD_COUNT,
  ADD_TO_CART,
  SUB_CART
} from './mutation-types'
export default {
  [ADD_COUNT](state, payload) {
    payload.count += 1
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = false
    state.cartList.push(payload)
  },
  [SUB_CART](state,keys) {
  //  state.cartList=keys
  for(let i=0;i<keys.length;i++){
    for(let j=0;j<state.cartList.length;j++){
      if(keys[i]==state.cartList[j]){
        // let indexs=state.cartList.indexOf(state.cartList[j])
        state.cartList.splice(j,1)
      }
    }
  }
  }
}