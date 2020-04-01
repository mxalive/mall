<template>
  <div id="container">
    <div id="swiper">
      <slot></slot>
    </div>
    <div id="indicator">
      <slot name="indicator" v-if="showIndicator && slideCount>1">
        <div
          v-for="(item ,index) in slideCount"
          :key="index"
          :class="{active:vIndex==index+1}"
          @click="clickIndicator(index)"
          class="indi-item"
        ></div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Swiper",
  props: {
    //时间间隔,多久执行一次
    timeInterval: {
      type: Number,
      default: 3000
    },
    //执行动画时间
    animDuration: {
      type: Number,
      default: 300
    },
    //划动的比例
    moveProportion: {
      type: Number,
      default: 0.25
    },
    showIndicator: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      slideCount: 0, // 元素个数
      swiperWidth: 0, // swiper的宽度
      swiperStyle: {}, // swiper样式
      currentIndex: 1, // 当前的index
      vIndex: 1 //用于指示器的标识(virtual-index)
    };
  },
  mounted() {
    setTimeout(() => {
      this.handleDom();
      // 2.开启定时器
      this.slideStart();
      this.touchMove();
    }, 300);
  },
  methods: {
    /**
     *处理自动划动相关的函数
     */
    //获取dom相关信息
    handleDom() {
      // 1.获取要操作的元素
      let swiper = document.getElementById("swiper");
      let slide = swiper.querySelectorAll(".slide");
      // 2.保存个数
      this.slideCount = slide.length;
      // 3.如果大于1个, 那么在后面添加一个slide
      if (this.slideCount > 1) {
        let cloneFirst = slide[0].cloneNode(true);
        let cloneLast = slide[this.slideCount - 1].cloneNode(true);
        swiper.insertBefore(cloneLast, slide[0]);
        swiper.appendChild(cloneFirst);
        this.swiperWidth = swiper.offsetWidth;
        this.swiperStyle = swiper.style;
        this.setTransform(-this.swiperWidth, 0);
      }
    },
    //开始划动
    slideStart() {
      this.timer = window.setInterval(() => {
        this.currentIndex++;
        this.vIndex++;
        this.slidePosition(-this.currentIndex * this.swiperWidth);
      }, this.timeInterval);
    },
    //停止划动
    slideStop() {
      window.clearInterval(this.timer);
    },
    //划动位置
    slidePosition(currentPosition) {
      // 1.开始滚动动画
      // this.sliding = true;
      this.setTransform(currentPosition, this.animDuration);
      this.checkPosition();
      // this.sliding = false;
    },
    //设置移动
    setTransform(position, slideTime) {
      this.swiperStyle.transition = "transform " + slideTime + "ms";
      // `translate3d(${position}px, 0, 0)`${变量},加上反单引号可以拼接字符串
      this.swiperStyle.transform = `translate3d(${position}px, 0, 0)`;
    },
    checkPosition() {
      //判断最后一张图片
      if (this.currentIndex == this.slideCount + 1) {
        this.vIndex = 1;
        window.setTimeout(() => {
          this.currentIndex = 1;
          this.setTransform(-this.currentIndex * this.swiperWidth, 0);
        }, this.animDuration);
      } else if (this.currentIndex <= 0) {
        this.setTransform(0, this.animDuration);
        this.vIndex = this.slideCount;
        window.setTimeout(() => {
          this.currentIndex = this.slideCount;
          this.setTransform(-this.currentIndex * this.swiperWidth, 0);
        }, this.animDuration);
      }
    },
    /**
     * 处理手动拖动相关的函数
     */
    touchMove() {
      let swiper = document.getElementById("swiper");
      swiper.onmousedown = e => {
        this.slideStop();
        this.startX = e.clientX;
        swiper.onmousemove = e => {
          let currentX = e.clientX;
          let currentDistance = currentX - this.startX;
          let currentPosition = -this.currentIndex * this.swiperWidth;
          let moveDistance = currentPosition + currentDistance;
          // 移动到当前位置;
          this.setTransform(moveDistance, 0);
        };
      };

      swiper.onmouseup = event => {
        swiper.onmousemove = null;
        this.endX = event.clientX;
        this.distance = this.startX - this.endX;
        this.currentMove = Math.abs(this.distance);
        if (
          this.currentMove > this.swiperWidth * this.moveProportion &&
          this.distance > 0
        ) {
          this.currentIndex++;
          this.vIndex++;
        } else if (
          this.currentMove > this.swiperWidth * this.moveProportion &&
          this.distance < 0
        ) {
          this.currentIndex--;
          this.vIndex--;
        }
        //移动到正确的位置
        this.slidePosition(-this.currentIndex * this.swiperWidth);
        this.slideStart();
      };
    },
    clickIndicator(index) {
      this.slideStop();
      this.currentIndex = index;
      this.slidePosition(-index * this.swiperWidth);
      this.slideStart();
    }
  }
};
</script>

<style scoped>
#container {
  position: relative;
  overflow: hidden;
  height: 150px;
  /* border: 1px solid red; */
}
#swiper {
  display: flex;
}
#indicator {
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  bottom: 8px;
}
.indi-item {
  box-sizing: border-box;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #fff;
  line-height: 8px;
  text-align: center;
  font-size: 12px;
  margin: 0 5px;
}
.indi-item.active {
  background-color: rgba(212, 62, 46, 1);
}
</style>