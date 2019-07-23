    
<template>
  <div class="paagenumber">
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      @current-change="pageIndexChange"
      :total="pagetotal"
      size="small"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  props: ["pagetotal", "pageSize"],
  methods: {
    pageIndexChange(idx) {
      this.$emit("fanye", idx);
    }
  },
  mounted() {}
};
</script>