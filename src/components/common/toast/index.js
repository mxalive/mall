import Toast from './Toast.vue'

const obj = {}
obj.install = (Vue) => {
  let toastTpl = Vue.extend(Toast)
  let tpl = new toastTpl()//实例化
  let div = document.createElement('div')
  tpl.$mount(div)//挂载
  //tpl.$el对应的就是创建的div,添加
  document.body.appendChild(tpl.$el)

  //在这里定义方法,也可以再组件里定义方法
  Vue.prototype.$toast = tpl
  tpl.show = (message = '商品已添加', time = 1500) => {
    tpl.isShow = true
    tpl.message = message
    //   let dis =()=>{
    //     tpl.isShow = false
    //   }
    //  let de= debounce(dis,1500)
    //  de()
    setTimeout(() => {
      tpl.isShow = false
    }, time)

  }

}
export default obj