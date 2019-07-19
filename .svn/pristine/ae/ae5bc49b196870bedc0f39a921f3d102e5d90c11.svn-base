<template>
  <!-- <div>实时监控页面</div> -->
  <el-row>
    <el-col :span="24">
      <div class="demo-input-suffix">
        <!-- 属性方式： -->
        <el-input placeholder="请输入电站名称和地址" v-model="searchOne">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </el-col>
    <el-col :span="24" style="padding:20px">
      <el-table :data="tableData" border style="width: 100%" stripe>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="adress" label="地址"></el-table-column>
        <el-table-column prop="install" label="安装日期" width="180"></el-table-column>
        <el-table-column prop="type" label="子站类型"></el-table-column>
        <el-table-column prop="num" label="设备数量(个)"></el-table-column>
        <el-table-column prop="type" label="状态"></el-table-column>
        <el-table-column prop="updatatime" label="更新时间" width="180"></el-table-column>
        <el-table-column label="操作">
          <template>
            <i class="fa fa-eye" aria-hidden="true" style="cursor:pointer" @click="To_view"></i>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      searchOne: "", //搜索
      tableData: [
        {
          name: "康和盛大厦能源站",
          adress: "深圳南山区沙河西路",
          install: "2018-08-02",
          type: "光伏、储能",
          num: "125",
          type: "良好",
          updatatime: "2018-09-08"
        },
        {
          name: "康和盛大厦能源站",
          adress: "深圳南山区沙河西路",
          install: "2018-08-02",
          type: "光伏、储能",
          num: "125",
          type: "良好",
          updatatime: "2018-09-08"
        },
        {
          name: "康和盛大厦能源站",
          adress: "深圳南山区沙河西路",
          install: "2018-08-02",
          type: "光伏、储能",
          num: "125",
          type: "良好",
          updatatime: "2018-09-08"
        },
        {
          name: "康和盛大厦能源站",
          adress: "深圳南山区沙河西路",
          install: "2018-08-02",
          type: "光伏、储能",
          num: "125",
          type: "良好",
          updatatime: "2018-09-08"
        },
        {
          name: "康和盛大厦能源站",
          adress: "深圳南山区沙河西路",
          install: "2018-08-02",
          type: "光伏、储能",
          num: "125",
          type: "良好",
          updatatime: "2018-09-08"
        },
        {
          name: "康和盛大厦能源站",
          adress: "深圳南山区沙河西路",
          install: "2018-08-02",
          type: "光伏、储能",
          num: "125",
          type: "良好",
          updatatime: "2018-09-08"
        }
      ] //实时监控的表格
    };
  },
  methods: {
    To_view() {
      //点击查看
      this.$router.push("/realTimeDeal");
    }
  }
};
</script>

<style lang="scss" scoped>
.demo-input-suffix {
  width: 400px;
  margin: 40px 0px 20px 20px;
}
</style>