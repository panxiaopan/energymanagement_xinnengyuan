<template>
  <li class="hj-vue-timeline-item-list">
    <div :class="{'hj-vue-timeline-item-time': !isFirst,'hj-vue-timeline-item-time-first': isFirst}">
      <slot name="time"></slot>
    </div>
    <div class="hj-vue-timeline-item-flow">
      <div :class="['hj-vue-timeline-item-list-color', {'hj-vue-timeline-item-list-head': !isFirst, 'hj-vue-timeline-item-list-head-first': isFirst}]">
      </div>
      <div class="hj-vue-timeline-item-tail"></div>
    </div>
    <div :class="{'hj-vue-timeline-item-content': !isFirst, 'hj-vue-timeline-item-content-first': isFirst}">
      <slot name="content"></slot>
    </div>
  </li>
</template>
<script>
export default {
  name: 'timeline-item-list',

  data() {
    return {};
  },
  props: {
    isFirst: {
      type: Boolean,
      default: false
    }
  }
};
</script>
