<template>
  <div class="hj-custom-pagination">
    <el-pagination class="pull-right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" :layout="layout" :total="total"></el-pagination>
  </div>
</template>


<style lang='less'>
.hj-custom-pagination {
  margin-top: 15px;
  padding-bottom: 15px;
}
</style>

<script>
export default {
  name: 'customPagination',
  componentName: 'customPagination',
  mixins: [],
  components: {},
  props: {
    nowPage: {
      type: [Number],
      default: 1
    },
    pageSizes: {
      type: [Array],
      default: () => {
        return [10, 20, 30];
      }
    },
    pageSize: {
      type: [Number],
      default: 10
    },
    layout: {
      type: [String],
      default: 'total, sizes, prev, pager, next, jumper'
    },
    total: {
      type: [Number],
      default: 10
    },
    queryData: {
      type: Function,
      default: null
    }
    // config: {
    //   type: Object,
    //   default: () => null
    // }
  },
  data() {
    return {
      currentPage: 1,
      start: 0
      // defaultConfi:{
      //  pageSizes: [10, 20, 30],
      //  layout: 'total, sizes, prev, pager, next, jumper',
      // }
    };
  },
  computed: {
    // currentPage:{
    //   get(){
    //     return this.nowPage
    //   },
    //   set(val){
    //     this.handleCurrentChange(newVal)
    //   }
    // }
  },
  watch: {
    nowPage: {
      // immediate: true,
      handler(newVal, oldVal) {
        this.currentPage = newVal;
        this.handleCurrentChange(newVal);
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      // this.pageSize = val
      this.$emit('size-change', val);
      this.currentPage = 1;
      this.start = 0;
      this.$nextTick(() => {
        this.searchData(this.start);
      });
      // this.$parent.queryData()
      console.log(val);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.start = this.pageSize * (this.currentPage - 1);
      this.searchData(this.start);
      // this.$parent.queryData()
      console.log(val);
    },
    searchData(start) {
      if (this.queryData) {
        console.log('this.queryData', this.queryData);
        this.queryData();
      } else if (this.$parent.queryData) {
        this.$parent.queryData();
      }
    }
  },
  created() {},
  // render(){
  //   return (<div class="hj-custom-pagination">
  //         <el-pagination class="pull-right" onSize-change={this.handleSizeChange} onCurrent-change={this.handleCurrentChange} current-page={this.currentPage} page-sizes={this.pageSizes} page-size={this.pageSize} layout={this.layout} total={this.total}>
  //         </el-pagination>
  //         </div>)
  // },
  mounted() {},
  destroyed() {}
};
</script>


