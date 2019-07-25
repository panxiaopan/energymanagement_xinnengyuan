<template>
  <el-row>
    <el-container>
      <el-header>
        <el-dropdown style="float:right" @command="handleCommand">
          <!-- <i class="el-icon-setting" style="margin-right: 15px"></i> -->
          <el-button icon="el-icon-user-solid" size="small">潘高敬</el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="退出">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-menu
          :default-active="$route.path"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          :unique-opened="true"
          active-text-color="#ffd04b"
        >
          <template v-for=" (item,index) in menudata">
            <el-menu-item :key="item.menudata" :index="item.path" v-if="item.subNodes.length==0">
              <template slot="title">
                <!-- <i  :class="item[0].permissionIcon" class="fa  menuicon"></i> -->
                <span>{{item.name}}</span>
              </template>
            </el-menu-item>
            <el-submenu :key="item.index" :index="String(index)" v-if="item.subNodes.length !==0">
              <template slot="title">
                <!-- <i  :class="item[0].permissionIcon" class="fa  menuicon"></i>   -->
                <span>{{item.name}}</span>
              </template>
              <el-menu-item :key="item.index" :index="item.path" v-for="item in item.subNodes">
                <!-- <i  :class="item.permissionIcon" class="fa  menuicon"></i> -->
                {{item.name}}
              </el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </el-header>

      <el-container>
        <el-aside width="220px">
          <el-col>
            <div class="back_main" @click="backMain">
              <i class="el-icon-back"></i>
              <span slot="title">{{name}}</span>
            </div>
            <el-menu default-active="2" class="el-menu-vertical-demo">
              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">能源综合总汇</span>
              </el-menu-item>
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>子站类表</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item
                    v-for="(item,index) in submenuData"
                    :index="item.value"
                    :key="index"
                  >{{item.type.desc}}</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
      <!-- <el-footer>Footer</el-footer> -->
    </el-container>
  </el-row>
</template>

<script>
import { getstationsidNameType } from "@/api/api";
export default {
  data() {
    return {
      menudata: [],
      // activeIndex2: "1"
      name: "",
      submenuData: [] //子站菜单
    };
  },
  methods: {
    handleSelect(index) {
      //跳转路由
      this.$router.push(index);
    },
    handleCommand(command) {
      //退出
      console.log(command);
      if (command == "退出") {
        window.sessionStorage.removeItem("menudata"); //退出时候就清空
        this.$router.push("/login");
      }
    },
    getmenu() {
      var parms = this.$route.params.id;
      getstationsidNameType(parms).then(res => {
        console.log("菜单");
        console.log(res);
        if (res.data.head.code == 0) {
          // let data =res.data.data
          // for(let i=0; i<data.length;i++){
          // }
          this.submenuData = res.data.data;
        }
      });
    },
    backMain() {
      //返回上一页
      this.$router.go(-1);
    }
  },
  mounted() {
    this.name = sessionStorage.getItem("station");
    this.menudata = JSON.parse(sessionStorage.getItem("menudata"));
    this.getmenu();
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  height: calc(100% - 60px);
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
  cursor: pointer;
}
.unitName {
  font-size: 14px;
  color: #636f8a;
  margin-left: 10px;
  display: inline-block;
}
//一会更换
.el-main {
  // background: #f0f3fc;
  padding: 0px;
  // margin: 20px;
}
.el-container {
  height: 100%;
  .el-header,
  .el-footer {
    background-color: #545c64;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
}
.el-menu-demo {
  width: 80%;
}
</style>