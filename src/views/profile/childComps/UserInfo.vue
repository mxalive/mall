<template>
  <div class="container">
    <div class="img">
      <img src="~assets/img/icon/profile.svg" alt />
    </div>
    <div class="info">
      <div class="top">
        <span>登录</span>/
        <span>注册</span>
      </div>
      <div class="bottom">
        <img src="~assets/img/icon/phone.svg" alt />
        <span class="text">暂无绑定手机号</span>
      </div>
    </div>
    <div class="leadTo"></div>
  </div>
</template>

<script>
export default {
  name: "UserInfo"
};
</script>

<style scoped>
.container {
  display: flex;
  position: relative;
  background-color: var(--color-high-text);
  padding: 1rem 0;
  font-size: 1.3rem;
  align-items: center;
  color: white;
}
.img img {
  width: 17vw;
}
.img {
  margin: 0 3vw;
  display: flex;
  align-items: center;
}
.info .top {
  padding: 0.3rem;
}
.bottom {
  display: flex;
  align-items: center;
}
.bottom img {
  width: 6vw;
}

.leadTo {
  position: absolute;
  right: 2rem;
  width: 1rem;
  height: 1rem;
}
.leadTo::before {
  content: "";
  width: 1rem;
  height: 1rem;
  position: absolute;
  border-bottom: 1px solid white;
  border-right: 1px solid white;
  transform: rotate(-45deg);
}
</style>