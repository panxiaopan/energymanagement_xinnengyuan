<template>
  <div class="hj-work-order-management-wrapper">
    <task-list list-type="workOrder" ref="workOrder"></task-list>
  </div>
</template>

<script>
import TaskList from "../task-management/task-list";
// import { createNamespacedHelpers } from "vuex";
// const { mapState, mapActions } = createNamespacedHelpers(
//   "operationManagement"
// );
export default {
  name: "WorkOrderMangement",
  components: {
    TaskList
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {
    if (this.$refs.workOrder) {
      this.$refs.workOrder.queryDataList();
    }
  }
};
</script>
<style lang="less" scoped >
@import "./index.less";
</style>