<template>
  <div class="tab-content">
    <category-content-list :goods='categoryList'/>
  </div>
</template>

<script>
import GoodsList from 'components/content/goods/GoodsList'
import CategoryContentList from './CategoryContentList'
export default {
  name: "TabContent",
  components:{
    CategoryContentList
  },
  props:{
    categoryList:{
      type:Array,
      default(){
        return []
      }
    }
  }
};
</script>

<style scoped>
</style>