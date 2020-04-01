<template>
  <div class="back-top">
    <img src="~assets/img/icon/top.svg" alt="">
  </div>
</template>

<script>
  export default {
    name:'BackTop'
  }
</script>

<style scoped>
.back-top{
  position: fixed;
  right: 0.9rem;
  bottom: 4.2rem
}
.back-top img{
  background-color: #fff;
  border-radius:1.1rem; 
  width: 2.2rem;
  height: 2.2rem;
}
</style>