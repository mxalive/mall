<template>
  <transition name="display">
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
  </transition>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      isShow:false,
      message:''
    }
  },
  
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 10px;
  color: #fff;
  font-size: 1rem;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 999;
}
.display-enter,.display-leave-to{
  opacity: 0;
  /* background-color: aqua */
}
.display-enter-active,.display-leave-active{
  transition: all 0.5s ease
}
</style>