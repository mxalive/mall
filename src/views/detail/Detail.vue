<template>
  <div class="detail">
    <detail-nav-bar ref="nav" class="detail-nav-bar" @titleClick="titleClick" />
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detailInfo="detailInfo" @imgLoad="imgLoad" />
      <detail-param-info :paramInfo="paramInfo" ref="params" />
      <detail-comment-info :commentInfo="commentInfo" ref="comment" />
      <goods-list :goods="recommendGoods" ref="recommend" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addToCart="addToCart" />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import GoodsList from "components/content/goods/GoodsList";
import DetailBottomBar from "./childComps/DetailBottomBar";

import { debounce } from "common/utils";
import { itemListenerMixin, backTop } from "common/mixin";

import Scroll from "components/common/scroll/Scroll";
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommendGoods
} from "network/detail";
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar
  },
  //包含事件总线的组件间通信
  mixins: [itemListenerMixin, backTop],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendGoods: [],
      titleTo: [0],
      getTitleTo: null,
      currentIndex: 0
    };
  },
  created() {
    (this.iid = this.$route.params.iid),
      getDetail(this.iid).then(res => {
        // console.log(res);
        //获取顶部轮播图数据
        const data = res.result;
        this.topImages = data.itemInfo.topImages;
        //获取商品信息
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );
        //创建店铺信息对象
        this.shop = new Shop(data.shopInfo);
        //保存商品详细信息
        this.detailInfo = data.detailInfo;
        this.paramInfo = new GoodsParam(
          data.itemParams.info,
          data.itemParams.rule
        );
        //取出评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0];
        }
      });
    getRecommendGoods().then(res => {
      // console.log(res);
      this.recommendGoods = res.data.list;
    });
  },
  mounted() {
    this.getTitleTo = debounce(() => {
      this.titleTo = [];
      this.titleTo.push(0);
      this.titleTo.push(this.$refs.params.$el.offsetTop);
      this.titleTo.push(this.$refs.comment.$el.offsetTop);
      this.titleTo.push(this.$refs.recommend.$el.offsetTop);
      this.titleTo.push(Number.MAX_VALUE);
    }, 100);
  },
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  methods: {
    //父子组件通信下的图片加载完成事件
    imgLoad() {
      this.refresh();
      this.getTitleTo();
    },
    //点击移动到指定位置
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.titleTo[index], 200);
    },
    //滚动到指定区域题目相应的变化
    contentScroll(position) {
      this.showBackTop(position, 1000);
      for (let index = 0; index < this.titleTo.length - 1; index++) {
        if (
          this.currentIndex != index &&
          -position.y >= this.titleTo[index] &&
          -position.y < this.titleTo[index + 1]
        ) {
          this.currentIndex = index;
          this.$refs.nav.currentIndex = index;
        }
      }
    },
    //获取购物车要展示的信息
    addToCart() {
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      this.$store
        .dispatch("addCart", product)
        .then(res => {
          this.$toast.show(res, 2000);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
/* .detail-nav-bar {
  position: relative;
  z-index: 9;
} */
.content {
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}
</style>