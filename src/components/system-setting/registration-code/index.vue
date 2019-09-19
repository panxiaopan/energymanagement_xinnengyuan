<template>
  <div class="codemain">
    <div class="seachinput">
      <el-input
        placeholder="请输入注册码"
        v-model="keyword"
        class="input-with-select"
        @keyup.enter.native="keyenter"
      >
        <el-button slot="append" icon="el-icon-search" @click="serchword"></el-button>
      </el-input>
    </div>
    <el-table :data="codeData" border stripe style="width: 100%">
      <el-table-column prop="registCode" label="注册码"></el-table-column>
      <el-table-column label="是否被使用">
        <template slot-scope="scope">
          <span v-if="scope.row.registFlag">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column prop="registTime" label="日期"></el-table-column>
    </el-table>
    <div style="margin-top:10px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[10, 20, 30,]"
        :page-size="size"
        layout="sizes, prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
 <script>
export default {
  data() {
    return {
      start: 0,
      size: 10,
      keyword: "",
      codeData: [],
      total: null,
      currentPage: 1
    };
  },
  methods: {
    getcodedata() {
      let url = `http://192.168.1.99/efm-web/registCodes`;
      var json = {
        start: this.start,
        size: this.size,
        keyword: this.keyword
      };
      this.$http({
        json,
        url,
        method: "get"
      }).then(res => {
        console.log("书库");
        console.log(res);
        if (res.data.head.code == 0) {
          this.codeData = res.data.data.rows;
          if (this.start == 0) {
            this.total = res.data.data.total;
          }
        }
      });
    },
    handleCurrentChange(val) {
      //当前点击页
      let size_now = val * this.size;
      this.start = size_now;
      this.getcodedata();
    },
    handleSizeChange(val) {
      this.size = val;
      this.getcodedata();
    },
    keyenter(e) {
      //enter键
      if (e.keyCode == 13) {
        this.getcodedata();
      }
    },
    serchword() {
      //搜索
      this.getcodedata();
    }
  },
  mounted() {
    this.getcodedata();
  }
};
</script>
 

<style scoped lang='less'>
.codemain {
  height: 100%;
  width: 100%;
  background: #fff;
  padding: 50px 100px;
  overflow-y: auto;
}
.hjGreen .hj-system-setting-wrapper {
  height: 100%;
}
.seachinput {
  width: 300px;
  margin-bottom: 40px;
}
</style>
