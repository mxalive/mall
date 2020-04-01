<template>
  <div>
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="r-price">{{'¥'+goods.realPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <!-- <span>{{goods.colums[0]}}</span> -->
      <span v-for="(item,index) in goods.colums" :key="index">{{item}}</span>
      <!-- <span class="info-other-center">{{goods.colums[1]}}</span>
      <span>{{goods.services[1].name}}</span>-->
    </div>
    <div class="info-service">
      <span class="info-service-item" v-for="(index,num) in goods.services" :key="num">
        <img :src="index.icon" alt />
        <span>{{index.name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style scoped>
.info-title {
  font-size: 1.1rem;
  color: black;
  margin: 0 0.2rem;
}
.info-price {
  font-size: 1.1rem;
  margin: 0.6rem 0.2rem;
  color: var(--color-high-text);
}
.info-price span:nth-child(2) {
  margin: 0 0.5rem;
  font-size: 0.8rem;
  text-decoration: line-through;
  color: var(--color-text);
}
.info-price .discount {
  display: inline-block;
  background-color: var(--color-high-text);
  padding: 0.15rem 0.3rem;
  border-radius: 10px;
  color: white;
  font-size: 0.8rem;
  line-height: 100%;
  transform: translateY(-0.2rem);
}
.info-other {
  display: flex;
  justify-content: space-between;
  text-align: center;
  font-size: 0.8rem;
  padding: 0 0 0.3rem;
  margin: 0 0.2rem;
  border-bottom: 0.1rem solid rgba(0, 0, 0, 0.1);
}

.info-service {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  padding: 1rem 0.2rem;
  border-bottom: 0.3rem solid rgba(0, 0, 0, 0.1);
  color: black;
}

.info-service-item img {
  height: 0.8rem;
}
</style>