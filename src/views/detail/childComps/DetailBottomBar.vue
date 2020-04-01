<template>
  <div>
    <div class="left">
      <div class="service">
        <div>
          <img src="~assets/img/bottomBar/service.svg" alt />
          <p>客服</p>
        </div>
        <div>
          <img src="~assets/img/bottomBar/store.svg" alt />
          <p>店铺</p>
        </div>
        <div>
          <img src="~assets/img/bottomBar/get.svg" alt />
          <p>收藏</p>
        </div>
      </div>
      <div class="center" @click="addToCart">
        <span>加入购物车</span>
      </div>
      <div class="right">
        <span>购买</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  methods: {
    addToCart(){
      this.$emit('addToCart')
    }
  },
};
</script>

<style scoped>
.left {
  height: 49px;
  width: 100%;
  display: flex;
  text-align: center;
  background-color: #fff;
  position: relative;
  bottom: 0;
  z-index: 9;
}

.service {
  
  display: flex;
  justify-content: space-around;
  width: 50%;
}
.service img {
  width: 1.5rem;
  margin: 0.2rem 0;
  vertical-align: middle;

}
.center,
.right {
  flex: 1;
  height: 100%;
}
.center{
  background-color: var(--color-high-text)
}
.right{
  background-color:aqua;
}
.center span,
.right span {
  display: inline-block;
  height: 100%;
  font-size: 1rem;
  line-height:49px;
}
</style>