<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar"
};
</script>

<style>
.nav-bar {
  height: 44px;
  display: flex;
  text-align: center;
  align-items: center;
  box-shadow: 0px 1px 1px  rgba(161, 99, 99, 0.2)
}
.left,
.right {
  width: 60px;
}
.center {
  flex: 1;
}
</style>