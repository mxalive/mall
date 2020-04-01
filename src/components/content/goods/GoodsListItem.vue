<template>
  <div class="goods-item" @click="itemClick">
    <img @load="imageLoad" v-lazy="showImage" :key="showImage" alt />
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsLIstItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    imageLoad() {
      this.$bus.$emit("itemImageLoad");
    },
    itemClick() {
      this.$router.push("/detail/" + this.goodsItem.iid);
    }
  },
  computed: {
    showImage() {
      return (this.goodsItem.image ||this.goodsItem.img)|| this.goodsItem.show.img;
    }
  }
};
</script>

<style scoped>
.goods-item {
  width: 48%;
  position: relative;
  padding-bottom: 3.5rem;
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
.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -1.2rem;
  top: -0.1rem;
  width: 1.2rem;
  height: 1.2rem;
  background: center/80% url("~assets/img/icon/collect.svg") no-repeat;
}
</style>