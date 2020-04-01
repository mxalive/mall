<template>
  <div>
    <img src="~assets/img/icon/ok.svg" class="image" :class="{check:isChecked}" alt />
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default() {
        return false;
      }
    }
  }
};
</script>

<style scoped>
.image {
  width: 1.5rem;
  border-radius: 50%;
  border: 2px solid #aaa;
}
.check {
  background-color: aqua;
  border: 2px solid aqua;
}
</style>