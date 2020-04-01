<template>
  <swiper class="swiper" v-if="topImages.length">
    <swiper-item v-for="(item,index) in topImages" :key="index">
      <img :src="item" alt />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {}
};
</script>

<style scoped>
.swiper {
  height: 20rem;
  overflow: hidden;
}
</style>