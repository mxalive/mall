<template>
  <div class="recommend">
    <div class="recom-item" v-for="(item,index) in recommends" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt />
      </a>
      <div>{{item.title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style  scoped>
.recommend {
  display: flex;
  width: 100%;
  padding: 0.9rem 0 2.5rem;
  border-bottom: 0.7rem solid #eee;
  font-size: 1rem;
}
.recom-item {
  flex: 1;
  text-align: center;
}
.recom-item img {
  width: 5.4rem;
  margin-bottom: 0.6rem;
}
</style>