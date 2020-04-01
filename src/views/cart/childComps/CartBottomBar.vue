<template>
  <div class="bottom-bar">
    <check-button class="button" @click.native="selectAll" :isChecked="isSelectAll" />
    <span class="text">全选</span>
    <span class="all">合计: {{'¥'+totalPrice}}</span>
    <span class="delete" @click="gone">删除({{getGoodsNum}})</span>
    <span class="calc" @click="calc">购买({{getGoodsNum}})</span>
    <transition name="notice">
      <pop v-show="isShow" @cancel="cancel" @confirm="confirm" />
    </transition>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
import Pop from "components/common/pop/Pop";

export default {
  name: "CartBottomBar",
  data() {
    return {
      isShow: false,
      obj: null
    };
  },
  components: {
    CheckButton,
    Pop
  },
  computed: {
    getGoodsNum() {
      return this.$store.state.cartList.filter(item => item.checked).length;
    },
    totalPrice() {
      return this.$store.state.cartList
        .filter(item => {
          return item.checked;
        })
        .reduce((pre, item) => {
          return pre + item.price * item.count;
        }, 0)
        .toFixed(2);
    },
    isSelectAll() {
      if (this.$store.state.cartList.length == 0) return false;
      // if(this.$store.state.cartList.length==0)return false
      return !this.$store.state.cartList.find(item => !item.checked);
    }
  },
  mounted() {},
  methods: {
    selectAll() {
      if (this.isSelectAll) {
        this.$store.state.cartList.forEach(item => (item.checked = false));
      } else {
        this.$store.state.cartList.forEach(item => (item.checked = true));
      }
    },
    calc() {
      this.obj = this.$store.state.cartList.find(item => item.checked);
      if (this.obj == undefined) {
        this.$toast.show("请选择要购买的商品");
      } else {
        this.$toast.show("已购买");
      }
    },
    gone() {
      this.obj = this.$store.state.cartList.find(item => item.checked);
      if (this.obj == undefined) {
        this.$toast.show("请选择要移除的商品");
      } else {
        this.isShow = true;
      }
    },
    cancel(pointA) {
      this.isShow = false;
      this.$store.state.cartList.forEach(item => {
        item.checked = false;
      });
    },
    confirm(pointB) {
      this.$store.dispatch("subCart");
      this.isShow = false;
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  height: 35px;
  width: 100%;
  position: fixed;
  bottom: 49px;
  right: 0;
  left: 0;
  display: flex;
  align-items: center;
  text-align: center;
}
.button {
  margin: 0 0.5rem;
}
.all {
  margin-left: 1rem;
}

.delete {
  width: 6rem;
  height: 35px;
  line-height: 35px;
  background-color: orangered;
  position: absolute;
  color: #fff;
  right: 6rem;
}
.calc {
  width: 6rem;
  height: 35px;
  line-height: 35px;
  background-color: aqua;
  position: absolute;
  right: 0;
  color: #fff;
}

.notice-enter,
.notice-leave-to {
  opacity: 0;
}
.notice-enter-active,
.notice-leave-active {
  transition: all 0.6s cubic-bezier(0.05, 0.85, 1, 0.23);
}
</style>