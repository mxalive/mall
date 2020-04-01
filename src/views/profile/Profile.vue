<template>
  <div>
    <nav-bar class="nav-bar">
      <template v-slot:center>
        <div>个人信息</div>
      </template>
    </nav-bar>
    <user-info />
    <div class="textContainer">
      <div class="leftText">
        <span class="highColor">0.00</span>
        <span>元</span>
        <p class="textInterval">我的余额</p>
      </div>
      <div class="centerText">
        <span class="highColor">0</span>
        <span>个</span>
        <p class="textInterval">我的优惠</p>
      </div>
      <div class="rightText">
        <span class="highColor">0</span>
        <span>分</span>
        <p class="textInterval">我的积分</p>
      </div>
    </div>
    <list-view :listData="orderList" class="order-list"></list-view>
    <list-view :listData="serviceList" class="service-list"></list-view>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import UserInfo from "./childComps/UserInfo";
import ListView from "./childComps/ListView";
export default {
  name: "Profile",
  components: {
    NavBar,
    UserInfo,
    ListView
  },
  data: function() {
    return {
      orderList: [
        { icon: "#icon-message", iconColor: "#ff8198", info: "我的消息" },
        { icon: "#icon-jifen", iconColor: "#fc7b53", info: "积分商城" },
        { icon: "#icon-huiyuan", iconColor: "#ffc636", info: "会员卡" }
      ],
      serviceList: [
        { icon: "#icon-gouwuchekong", iconColor: "#ff8198", info: "我的购物车" },
        { icon: "#icon-Group-", iconColor: "#ff8198", info: "下载购物APP" }
      ]
    };
  }
};
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-high-text);
  color: white;
  font-size: 1.3rem;
}
.textContainer {
  display: flex;
  justify-content: space-evenly;
  text-align: center;
  border-bottom: 4vw solid rgba(0, 0, 0, 0.1);
}
.centerText,
.leftText,
.rightText {
  padding: 1.6rem 0;
}
.centerText {
  padding: 1.6rem 2rem;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}
.highColor {
  color: aqua;
  font-size: 1.3rem;
}
.textInterval {
  margin-top: 0.3rem;
}
.order-list {
  margin-top: 12px;
  border-bottom: 4vw solid rgba(0, 0, 0, 0.1);
}
</style>