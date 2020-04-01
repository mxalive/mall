<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <tab-control
      ref="tabControl2"
      @tabClick="tabClick"
      v-show="isShow"
      :class="{show:isShow}"
      :titles="['流行','新款','精选']"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      @pullingUp="pullingUp"
      :pull-up-load="true"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control ref="tabControl1" @tabClick="tabClick" :titles="['流行','新款','精选']" />
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>
<script>
import HomeSwiper from "./childComps/HomeSwiper";
import FeatureView from "./childComps/FeatureView";
import RecommendView from "./childComps/RecommendView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";

import { debounce } from "common/utils";
import { getHomeMultidata, getHomeGoods } from "network/home";
import { itemListenerMixin, backTop } from "common/mixin";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll
  },
  mixins: [itemListenerMixin, backTop],

  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isShow: false,
      tabOffsetTop: 0,
      saveY: 0,
      imgs: [
        {
          list: require("../../assets/img/pictures/01.jpg"),
          link: "https://www.baidu.com/s?ie=UTF-8&wd=vue%20touch"
        },
        {
          list: require("../../assets/img/pictures/02.jpg"),

          link: "https://www.baidu.com/s?ie=UTF-8&wd=vue%20touch"
        },
        {
          list: require("../../assets/img/pictures/03.jpg"),

          link: "https://www.baidu.com/s?ie=UTF-8&wd=vue%20touch"
        },
        {
          list: require("../../assets/img/pictures/04.jpg"),

          link: "https://www.baidu.com/s?ie=UTF-8&wd=vue%20touch"
        },
        {
          list: require("../../assets/img/pictures/05.jpg"),

          link: "https://www.baidu.com/s?ie=UTF-8&wd=vue%20touch"
        }
      ]
    };
  },
  created() {
    //请求展示页面数据
    this.getHomeMultidata();
    //请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
    //取消全局监听事件
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  mounted() {},

  methods: {
    /**
     * 处理事件的函数
     */
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
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

    contentScroll(position) {
      this.showBackTop(position, 1000);
      //判断tabControl是否fixed
      this.isShow = Math.abs(position.y) > this.tabOffsetTop;
    },
    pullingUp() {
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl1.$el.offsetTop;
    },

    /**
     * 获取商品数据的函数
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      let page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp();
      });
    }
  }
};
</script>

<style scoped>
#home {
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: white;
  position: relative;
  z-index: 9;
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
.content {
  /* margin-top: 44px; */
  /* height: calc(100% - 93px);
  overflow: hidden; */
  position: absolute;
  top: 44px;
  bottom: 49px;
  overflow: hidden;
  right: 0;
  left: 0;
}
/* .fixed {
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
  z-index: 9;
} */
.show {
  position: relative;
  z-index: 9;
}
</style>