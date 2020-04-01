<template>
  <div>
    <div class="outer" v-for="(item,index) in cartList" :key="index">
      <!-- <cart-list>
      <cart-list-item/>
      </cart-list>-->
      <check-button class="button" @click.native="check(item)" :isChecked="item.checked" />
      <div class="content">
        <div class="image">
          <img :src="item.image" alt />
        </div>

        <div class="info-list">
          <p class="title">{{item.title}}</p>
          <p class="desc">{{item.desc}}</p>
          <div class="price-num">
            <span class="price">{{'¥'+item.price}}</span>
            <span class="num">
              <a
                class="clickNum"
                :style="{background:(reduceIndex==index?'aqua':''),transition:(reduceIndex==index?'background 100ms':'background 500ms')}"
                @touchend="reducing"
                @touchstart="reduce(item,index)"
              >-</a>
              {{"x"+item.count}}
              <a
                class="clickNum"
                :style="{background:(addIndex==index?'aqua':''),transition:(addIndex==index?'background 100ms':'background 500ms')}"
                @touchend="adding"
                @touchstart="add(item,index)"
              >+</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import CartList from "components/content/cartList/CartList";
// import CartListItem from "components/content/cartList/CartListItem";
import CheckButton from "components/content/checkButton/CheckButton";

export default {
  name: "CartView",
  data() {
    return {
      isActive: false,
      isActiving: false,
      re: null,
      ad: null,
      addStyle: {
        background: "",
        transition: ""
      },
      // reduceStyle: {
      //   background: "",
      //   transition: ""
      // },
      reduceIndex: null,
      addIndex: null,
      timer: null,
      timing: null
    };
  },
  components: {
    // CartList,
    // CartListItem
    CheckButton
  },
  computed: {
    cartList() {
      return this.$store.state.cartList;
    }
  },
  mounted() {},
  methods: {
    check(item) {
      item.checked = !item.checked;
    },
    reduce(item, index) {
      this.reduceIndex = index;
      if (item.count == 1) return;
      item.count--;
      this.timer = setTimeout(() => {
        this.timing = setInterval(() => {
          if (item.count == 1) return;
          item.count--;
        }, 300);
      }, 800);
    },
    add(item, index) {
      this.addIndex = index;
      item.count++;
      this.timer = setTimeout(() => {
        this.timing = setInterval(() => {
          if (item.count == 1) return;
          item.count++;
        }, 300);
      }, 800);
    },
    reducing() {
      this.reduceIndex = null;
      clearTimeout(this.timer);
      if (this.timing) {
        clearInterval(this.timing);
      }
    },
    adding() {
      this.addIndex = null;
      clearTimeout(this.timer);
      if (this.timing) {
        clearInterval(this.timing);
      }
    }
  }
};
</script>

<style scoped>
.outer {
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  align-items: center;
}
.button {
  margin: 0 0.5rem;
  width: 1.5rem
}
.content {
  /* width: 90%; */
  flex: 1;
  display: flex;
  padding: 0.5rem 0;
}
.image {
  margin-right: 0.8rem;
}
.image img {
  width: 5.5rem;
  height: 8rem;
  border-radius: 0.5rem;
}
.info-list .title,
.info-list .desc {
  width: 13rem;
  /* height:2rem; */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.info-list .title {
  font-size: 1.1rem;
  color: black;
}
.info-list .desc {
  margin: 1rem 0;
  font-size: 0.9rem;
}
.price-num {
  /* border: 1px solid rebeccapurple; */
  margin-top: 2.8rem;
  font-size: 1.1rem;
}
.price {
  color: orangered;
  /* border: 1px solid rebeccapurple; */
  padding-left: 0.4rem;
  /* text-indent: 0.5rem; */
}
.num {
  position: relative;
  right: -15vw;
}
.clickNum {
  display: inline-block;
  /* position: relative; */
  /* z-index: 9; */
  width: 2rem;
  height: 1.1rem;
  line-height: 1.1rem;
  text-align: center;
  font-size: 1rem;
  color: #fff;
  background: #b0c4de;
  border-radius: 10%;
}

</style>