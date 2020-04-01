<template>
  <div class="category">
    <nav-bar class="nav-bar">
      <template v-slot:center>
        <div>商品分类</div>
      </template>
    </nav-bar>
    <div class="container">
      <scroll class="scroll" ref="scroll">
        <tab-menu :categories="categories" @itemClick="itemClick" />
      </scroll>
      <div class="rightS">
        <tab-control
          v-show="isShow"
          :class="{show:isShow}"
          ref="tabControls"
          @tabClick="tabClick"
          :titles="['综合','新品','销量']"
        />
        <scroll class="scrolls" ref="scroll" :probeType="3" @scroll="scrollPosition">
          <tab-content class="tab-content" :categoryList="categoryList" />
          <tab-control ref="tabControl" @tabClick="tabClick" :titles="['综合','新品','销量']" />
          <tab-content-detail :categoryDetail="categoryDetail" />
        </scroll>
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar";
import TabMenu from "./childComps/TabMenu";
import TabContent from "./childComps/TabContent";
import Scroll from "components/common/scroll/Scroll";
import TabControl from "components/content/tabControl/TabControl";
import TabContentDetail from "./childComps/TabContentDetail";

import {
  getCategory,
  getSubcategory,
  getCategoryDetail
} from "network/category";
import { itemListenerMixin, backTop } from "common/mixin";

export default {
  name: "Category",
  data() {
    return {
      categories: [],
      categoryList: [],
      miniWallkey: null,
      currentType: "",
      categoryDetail: [],
      isShow: false
    };
  },
  mixins: [itemListenerMixin],
  components: {
    TabMenu,
    NavBar,
    Scroll,
    TabContent,
    TabControl,
    TabContentDetail
  },
  created() {
    this.getCategory();
  },
  mounted() {},
  methods: {
    getCategory() {
      getCategory().then(res => {
        // console.log(res);
        this.categories = res.data.category.list;
        if (this.categories[0]) {
          this.itemClick(
            this.categories[0].maitKey,
            this.categories[0].miniWallkey
          );
        }
      });
    },
    itemClick(maitKey, miniWallkey) {
      getSubcategory(maitKey).then(res => {
        this.categoryList = res.data.list;
        // console.log(res.data);
      });
      this.miniWallkey = miniWallkey;
      this.getCategoryDetail("sell");
    },
    getCategoryDetail(currentType) {
      let miniWallkey = this.miniWallkey;
      getCategoryDetail(miniWallkey, currentType).then(res => {
        // console.log(res);
        this.categoryDetail = res;
      });
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.getCategoryDetail(this.currentType);
      this.$refs.tabControls.currentIndex = index;
      this.$refs.tabControl.currentIndex = index;
    },
    scrollPosition(position) {
      this.isShow = Math.abs(position.y) > this.tabPosition;
    }
  },
  deactivated() {
    //取消全局监听事件
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  }
};
</script>

<style scoped>
.category {
  font-size: 0;
  position: relative;
}
.nav-bar {
  background-color: var(--color-tint);
  font-size: 1rem;
  color: #fff;
  font-weight: 800;
  position: relative;
  z-index: 9;
}
.container {
  display: flex;
  height: 100vh;
}
.scroll {
  height: calc(100% - 49px - 44px);
  overflow: hidden;
}
.rightS {
  height: calc(100% - 49px - 44px);
  flex: 1;
  position: relative;
}
.scrolls {
  height: 100%;
  overflow: hidden;
  position: absolute;
  top: 0;
  right: 0;
}
.tab-content {
  padding-top: 0.5rem;
}
.show {
  position: relative;
  z-index: 9;
}
</style>