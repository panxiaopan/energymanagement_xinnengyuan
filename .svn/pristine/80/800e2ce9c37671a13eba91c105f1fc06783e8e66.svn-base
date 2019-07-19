<template>
  <!-- <div>社会单位详情</div> -->
  <el-row>
    <el-col :span="24" style="height:100%">
      <el-row :gutter="20">
        <el-col :span="4" class="main_concent">
          <div class="back_main">
            <i class="fa fa-reply" aria-hidden="true" style="cursor:pointer" @click="backMain"></i>
            <span calss="unitName">康和盛大厦新能源站</span>
          </div>
          <el-menu default-active="2" class="el-menu-vertical-demo" :unique-opened="true">
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">综合态势</span>
            </el-menu-item>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>子菜单类表</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
        <el-col :span="20" class="main_concent"></el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    backMain() {
      //返回上一页
      this.$router.go(-1);
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.el-row {
  height: 100%;
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}

.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.main_concent {
  height: 100%;
}
.el-menu-vertical-demo {
  border: 1px solid #e6e6e6;
}
.back_main {
  height: 60px;
  border: 1px solid #e6e6e6;
  border-bottom: none;
  background: #f4f4fa;
  text-align: center;
  line-height: 60px;
}
.unitName {
  font-size: 14px;
  color: #636f8a;
  margin-left: 10px;
  display: inline-block;
}
</style>