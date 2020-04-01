<template>
  <div class="cart">
    <nav-bar class="content">
      <template v-slot:center>
        <div>购物车({{getGoodsNum}})</div>
      </template>
    </nav-bar>
    <scroll class="move">
      <cart-view />
    </scroll>
    <cart-bottom-bar  />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartView from "./childComps/CartView";
import CartBottomBar from "./childComps/CartBottomBar";
import Scroll from "components/common/scroll/Scroll";

import { mapGetters } from "vuex";
export default {
  name: "Cart",
  components: {
    NavBar,
    CartView,
    CartBottomBar,
    Scroll,
  },
  computed: {
    ...mapGetters(["getGoodsNum"])
  },
  methods: {
   
  },
};
</script>

<style scoped>
.cart {
  height: 100vh;
}
.content {
  background-color: var(--color-tint);
  color: #fff;
}
.move {
  height: calc(100% - 44px - 49px - 35px);
  overflow: hidden;
  
}
</style>