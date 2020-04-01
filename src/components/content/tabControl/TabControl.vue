<template>
  <div class="tab-control">
    <div
      v-for="(item,index) in titles"
      :key="index"
      class="tab-control-item"
      @click="isActive(index)"
      :class="{active:currentIndex==index}"
    >
      <span>{{item}}</span>
      
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    isActive(index) {
      this.currentIndex = index;
      this.$emit('tabClick',index)
    }
  }
};
</script>

<style  scoped>
.tab-control {
  display: flex;
  text-align: center;
  height: 3rem;
  font-size: 1rem;
  line-height: 3rem;
  background-color: #fff
}
.tab-control-item {
  flex: 1;
}
.tab-control-item span{
  padding: 0.3rem
}
.active{
  color: var(--color-high-text)
}
.active :hover{
  transition: color 0.3s
}
.active span{
  border-bottom: 0.2rem solid var(--color-high-text);
}
</style>