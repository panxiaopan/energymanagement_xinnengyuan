<template>
  <div class="hj-custom-marquee">
    <div class="hj-custom-marquee__content" :style="{transform: transform, color: textColor}">{{content}}</div>
  </div>
</template>
<style scoped>
.hj-custom-marquee {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: transparent;
  display: flex;
  align-items: center;
}
/* .hj-custom-marquee__content { */
/* color: #ffffff; */
/* width: 100%; */
/* height: 100%; */
/* } */
</style>


<script>
export default {
  name: "HjMarquee",
  props: {
    speed: {
      type: [String, Number],
      default: 5
    },
    direction: {
      type: String,
      default: "left"
    },
    content: {
      type: String,
      default: "Hello Marquee!"
    },
    textColor: {
      type: String,
      default: "#ffffff"
    }
  },
  data() {
    return {
      timer: null,
      // transform: this.direction === "top" ? "translateY(0)" : "translateX(0)",
      translatePos: 0,
      targetEleComputedProps: 0
      // targetParentEleWidth: 0
    };
  },
  computed: {
    transform() {
      return this.direction === "top"
        ? `translateY(${-this.translatePos}px)`
        : `translateX(${-this.translatePos}px)`;
    }
  },
  methods: {
    init() {
      this.timer = setTimeout(() => {
        if (this.translatePos <= this.targetEleComputedProps) {
          this.translatePos++;
        } else {
          // this.targetEleComputedProps = 0 +;
          this.translatePos = -this.targetParentEleComputedProps;
        }
        this.init();
      }, 100 / this.speed);
    },
    stop() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
    },
    start() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.init();
    }
  },
  mounted() {
    var targetParentEle = document.querySelector(".hj-custom-marquee");
    var targetEle = document.querySelector(".hj-custom-marquee__content");
    var targetEleHeight = window
      .getComputedStyle(targetEle)
      .getPropertyValue("height")
      .slice(0, -2);
    var targetEleWidth = window
      .getComputedStyle(targetEle)
      .getPropertyValue("width")
      .slice(0, -2);
    var targetParentEleHeight = window
      .getComputedStyle(targetParentEle)
      .getPropertyValue("height")
      .slice(0, -2);
    var targetParentEleWidth = window
      .getComputedStyle(targetParentEle)
      .getPropertyValue("width")
      .slice(0, -2);
    this.targetEleComputedProps =
      this.direction === "left" ? targetEleWidth : targetEleHeight;
    this.targetParentEleComputedProps =
      this.direction === "left" ? targetParentEleWidth : targetParentEleHeight;
    this.init();
  },
  destroyed() {
    clearTimeout(this.timer);
  }
};
</script>