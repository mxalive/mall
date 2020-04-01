<template>
  <tab-bar>
    <tab-bar-item path="/home" class="tab-bar">
      <template v-slot:item-icon>
        <img src="~assets/img/tabbar/home.svg" alt />
      </template>
      <template v-slot:item-icon-active>
        <img src="~assets/img/tabbar/home_active.svg" alt />
      </template>
      <template v-slot:item-text>
        <div>首页</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <template v-slot:item-icon>
        <img src="~assets/img/tabbar/sort.svg" alt />
      </template>
      <template v-slot:item-icon-active>
        <img src="~assets/img/tabbar/sort_active.svg" alt />
      </template>
      <template v-slot:item-text>
        <div>分类</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <template v-slot:item-icon>
        <img src="~assets/img/tabbar/shoppingcar.svg" alt />
      </template>
      <template v-slot:item-icon-active>
        <img src="~assets/img/tabbar/shoppingcar_active.svg" alt />
      </template>
      <template v-slot:item-text>
        <div>购物车</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <template v-slot:item-icon>
        <img src="~assets/img/tabbar/me.svg" alt />
      </template>
      <template v-slot:item-icon-active>
        <img src="~assets/img/tabbar/me_active.svg" alt />
      </template>
      <template v-slot:item-text>
        <div>我的</div>
      </template>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";
export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem
  }
};
</script>

<style scoped>
.tab-bar{
  position: relative;
  z-index: 9;
}
</style>>
