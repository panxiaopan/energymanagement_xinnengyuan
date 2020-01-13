<template>
  <div>
    <el-row>
      <el-col :span="5">
        <div class="left">
          <el-tree
            class="filter-tree"
            :data="treeData"
            default-expand-all
            :filter-node-method="filterNode"
            @node-click="nodeclick"
            :expand-on-click-node="false"
            :highlight-current="true"
            accordion
            ref="tree"            
          ></el-tree>
        </div>
      </el-col>
      <el-col :span="19">
        <div class="right">
          持续完善中，敬请期待...
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      treeData:[
        {label: '空调'},
        {label: '空压机'},
        {label: '锅炉'}
      ]
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.left {
  width: 100%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 3px 16px 0px rgba(103, 119, 137, 0.2);
  padding: 20px;
  height: 800px;
}
.right{
  padding: 20px;
  height: 800px;
  margin-left: 20px;  
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 3px 16px 0px rgba(103, 119, 137, 0.2);
}
</style>