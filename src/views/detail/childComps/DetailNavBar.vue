<template>
  <div>
    <nav-bar>
      <template v-slot:left>
        <div :class="{changeColor:isBack}" class="outer" @click="backClick">
          <div class="back"></div>
        </div>
      </template>
      <template v-slot:center>
        <div class="titles">
          <div
            @click="itemClick(index)"
            class="title"
            :class="{active:currentIndex==index}"
            v-for="(item,index) in titles"
            :key="index"
          >{{item}}</div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
      isActive: false,
      isBack: false
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("titleClick", index);
    },
    backClick() {
      this.isBack = true;
      window.setTimeout(() => {
        this.$router.back();
        this.isBack = false;
      }, 300);
    }
  }
};
</script>

<style scoped>
.titles {
  display: flex;
  font-size: 1rem;
}
.title {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.outer {
  position: relative;
  width: 100%;
  height: 44px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
}
.back {
  transform: rotate(45deg);
  height: 1rem;
  width: 1rem;
  border-bottom: 1px solid black;
  border-left: 1px solid black;
}
.changeColor {
  background-color: var(--color-high-text);
  transition: all 300ms;
}
</style>