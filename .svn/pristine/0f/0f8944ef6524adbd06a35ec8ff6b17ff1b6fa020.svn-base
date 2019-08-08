<template>
  <li>
    <ul>
      <slot></slot>
    </ul>

    <div class="hj-vue-timeline-item">
      <div :class="{'hj-vue-timeline-item-time': !isFirst, 'hj-vue-timeline-item-time-first': isFirst}">
        <slot name="time"></slot>
      </div>
      <div class="hj-vue-timeline-item-flow">
        <div :class="{'hj-vue-timeline-item-head': !isFirst|| (isFirst&&hasChild),'hj-vue-timeline-item-head-first': isFirst && !hasChild }" :style="headStyle">
          <span :class="['hj-vue-timeline-item-checked', {'el-icon-check':isFirst && !hasChild, 'el-icon-arrow-up': !isFirst|| (isFirst&&hasChild)}]"></span>
        </div>
        <div class="hj-vue-timeline-item-tail" :style="tailStyle"></div>
      </div>
      <div :class="{'hj-vue-timeline-item-content': !isFirst, 'hj-vue-timeline-item-content-first': isFirst}">
        <slot name="content"></slot>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: 'timeline-item',

  data() {
    return {
      isLast: true,
      isFirst: true,
      headStyle: { backgroundColor: this.$parent.color }
    };
  },
  props: {
    hasChild: {
      type: Boolean,
      default: false
    }
  },
  beforeDestroy() {
    // this will be null
    const $parent = this.$parent;
    this.$nextTick(() => {
      $parent.setChildProps();
    });
  },
  computed: {
    tailStyle() {
      return this.isLast
        ? { display: 'none', backgroundColor: this.$parent.color }
        : { display: 'block', backgroundColor: this.$parent.color };
    }
  },
  mounted() {
    this.$parent.setChildProps();
  }
};
</script>
