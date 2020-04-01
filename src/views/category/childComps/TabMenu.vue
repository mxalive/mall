<template>
  <div>
    <div
      class="tab-menu"
      @click="itemClick(index,item)"
      v-for="(item,index) in categories"
      :key="index"
      :class="{active:currentIndex==index}"
    >{{item.title}}</div>
  </div>
</template>

<script>
export default {
  name: "TabMenu",
  data() {
    return {
      currentIndex: 0
    };
  },
  props: {
    categories: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    itemClick(index, item) {
      this.currentIndex = index;
      this.$emit("itemClick", item.maitKey,item.miniWallkey);
    }
  }
};
</script>

<style scoped>
.tab-menu {
  position: relative;
  z-index: 9;
  text-align: center;
  width: 6rem;
  height: 2.9rem;
  line-height: 2.9rem;
  font-size: 1rem;
  background-color: rgba(0, 0, 0, 0.1);
  vertical-align: middle;
}
.active {
  background-color: #fff;
}
.active::before {
  content: "";
  display: block;
  position: absolute;
  left: 0rem;
  width: 0.3rem;
  height: 100%;
  background-color: aqua;
}
</style>