<template>
  <div class="pop">
    <p class="text">是否要移除已选中的商品</p>
    <div class="pop-bottom">
      <div class="leave">
        <check-button @click.native="cancel" :isChecked="pointA" />
        <span class="ss">取消</span>
      </div>
      <div class="enter">
        <check-button @click.native="confirm" :isChecked="pointB" />
        <span class="ss">确定</span>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
export default {
  name: "Pop",
  components: {
    CheckButton
  },
  data() {
    return {
      pointA: false,
      pointB: false
    };
  },

  methods: {
    cancel() {
      this.pointA = true;
      this.$emit("cancel", this.pointA);
      setTimeout(() => {
        this.pointA = false;
      }, 600);
    },
    confirm() {
      this.pointB = true;
      this.$emit("confirm", this.pointB);
      setTimeout(() => {
        this.pointB = false;
      }, 600);
    }
  }
};
</script>

<style scoped>
.pop {
  position: fixed;
  z-index: 999;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 8rem;
  width: 16rem;
  background-color: #fff;

  box-shadow: 0 0 0.2rem #aaa;
}
.text {
  margin: 1rem;
}
.pop-bottom {
  display: flex;
  justify-content: space-around;
  position: relative;
  bottom: -2rem;
}
.enter,
.leave {
  display: flex;
  align-items: center;
}
.ss {
  margin-left: 0.3rem;
}
</style>