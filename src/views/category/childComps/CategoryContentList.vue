<template>
  <div class="goods">
    <div class="goods-item" @click="itemClick" v-for="(item ,index) in goods" :key="index">
      <a :href="item.link">
        <img @load="imageLoad" v-lazy="showImage(item)" :key="showImage(item)" alt />
      </a>
      <div class="goods-info">
        <p>{{item.title}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoryContentList",
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    imageLoad() {
      this.$bus.$emit("itemImageLoad");
    },
    itemClick() {
      this.$router.push("/detail/" + this.goodsItem.iid);
    },
    showImage(item) {
      return item.image || item.show.img;
    }
  },
  computed: {}
};
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
}
.goods-item {
  box-sizing: border-box;
  width:33.33%;
  position: relative;
  padding: 0 0.3rem 3.5rem;
}
.goods-item img {
  width: 100%;
  border-radius: 0.5rem;
  height: 100%;
}
.goods-info {
  font-size: 1rem;
  position: absolute;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
  bottom: 0.5rem;
}
.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0.3rem;
}
.goods-info .price {
  color: var(--color-high-text);
  margin-right: 1.6rem;
}
.goods-info .collect {
  position: relative;
}
</style>