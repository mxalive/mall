import { debounce } from './utils'
import BackTop from "components/content/backTop/BackTop";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      refresh: null,
      tabPosition: null
    }
  },
  mounted() {
    //监听item中的图片加载完成
    this.refresh = debounce(this.$refs.scroll.refresh, 200);
    this.itemImgListener = () => {
      this.refresh();
      if (this.$refs.tabControl) {
        this.tabPosition = this.$refs.tabControl.$el.offsetTop
      }

    };
    this.$bus.$on("itemImageLoad", this.itemImgListener);

  },
}
export const backTop = {
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 300);
    },
    showBackTop(position, distance) {
      //显示返回按钮
      this.isShowBackTop = Math.abs(position.y) > distance;
    }
  },
  components: {
    BackTop
  }
}