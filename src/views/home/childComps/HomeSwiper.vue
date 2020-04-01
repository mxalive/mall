<template>
  <swiper :animDuration="animDuration" :timeInterval="timeInterval" v-if="banners.length">
    <swiper-item v-for="(item,index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" @load="swiperImageLoad" alt />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  data() {
    return {
      timeInterval: 2000,
      animDuration: 300,
      isLoad: false
    };
  },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    swiperImageLoad() {
      if (!this.isLoad) {
        this.$emit("swiperImageLoad");
        this.isLoad = true;
      }
    }
  }
};
</script>

<style scoped>
</style>