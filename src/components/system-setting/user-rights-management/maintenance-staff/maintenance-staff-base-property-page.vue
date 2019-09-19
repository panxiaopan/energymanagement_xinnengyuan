<template>
  <div class="maintenanceStaffBasePropertyPage" :style="{minHeight: wrapperHeight}">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="userRightsIndexRouter">{{$t("systemSetting.userAuthorityMng")}}</el-breadcrumb-item>
      <el-breadcrumb-item :to="activeTabRouter">{{activeItem.name}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{activeProperty}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row type="flex" style="margin-top:15px;" :gutter="15">
      <el-col
        v-show="pageType!='socialUnit'"
        :xs="6"
        :sm="6"
        :md="6"
        :lg="5"
        :span="4"
        style="border:1px solid #ccc;"
        :style="{minHeight: userListHeight}"
      >
        <vertical-list
          v-show="pageType!='socialUnit'"
          :verticalTitle="verticalTitle"
          ref="verticalList"
          :list="list"
          :url="userUrl"
          :json="userJson"
          :total="total"
          :select-node-id="currentNodeId"
          @change-node="changeNode"
        ></vertical-list>
      </el-col>
      <el-col :span="mainContentSpan" :xs="xsSpan" :sm="smSpan" :md="mdSpan" :lg="lgSpan">
        <div v-show="isShowProperty" style="flex-grow:0;">
          <el-row type="flex" :gutter="30">
            <el-col>
              <maintenance-staff-base-property
                :auth-edit="addAndUpdateUserAuth.auth"
                :auth-reset-password="resetPasswordAuth.auth"
                v-loading="propertyLoading"
                @update-usergroup="updateUsergroup"
                :data="rowData"
                style="margin-top:0px;"
              ></maintenance-staff-base-property>
            </el-col>
            <el-col>
              <el-transfer
                v-model="roleList"
                :data="data"
                :props="{key:'roleId', label:'roleName'}"
                :titles="transferTitles"
                :button-texts="transferBtnTexts"
                @change="handleChangePath"
              ></el-transfer>
            </el-col>
          </el-row>
        </div>
        <social-unit-tab
          ref="userStationList"
          :is-group="false"
          :query-url="queryUserStationsUrl"
          :user-type="userType"
          :show-edit-path-btn="showEditPathBtn"
          :auth-edit="addAndUpdateUserAuth.auth"
          :node-id="currentNodeId"
          :config="stationConfig"
          :deal-fun="processUserStationList"
        ></social-unit-tab>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers("systemSetting");
import MaintenanceStaffBaseProperty from "./maintenance-staff-base-property";
import VerticalList from "./vertical-list";
import RoleList from "./role-list";
import AuthValidator from "@/mixins/authValidator.js";
import SocialUnitTab from "./social-unit-tab";
export default {
  name: "maintenanceStaffBasePropertyPage",
  componentName: "maintenanceStaffBasePropertyPage",
  mixins: [AuthValidator],
  components: {
    SocialUnitTab,
    RoleList,
    MaintenanceStaffBaseProperty,
    VerticalList
  },
  props: {
    // 用户组Id
    userListNodeId: {
      type: [String, Number],
      default: NaN
    },
    // selectNodeId: {
    //   type: [String, Number],
    //   default: NaN
    // },

    // 用户id
    currentNodeId: {
      type: [String, Number],
      default: NaN
    },
    nodePath: {
      type: String,
      default: ""
    },
    pageType: {
      type: String,
      default: ""
    },
    userType: {
      type: String,
      default: ""
    } // "maintainer" "user"
  },
  data() {
    var wrapperHeight = window.innerHeight - 60 - 15 + "px";
    var params = this.$route.params;
    var userListHeight = window.innerHeight - 60 - 58 + "px";
    var stationConfig = {
      showSearch: false,
      childrenLabel: this.$t("systemSetting.socialUnit"),
      showAddIcon: true,
      showPath: false
    };
    var showEditPathBtn = false;
    return {
      verticalTitle: this.$t("systemSetting.userListInGroup"),
      showEditPathBtn,
      transferTitles: [
        this.$t("systemSetting.roleList"),
        this.$t("systemSetting.selectedRole")
      ],
      transferBtnTexts: [
        this.$t("systemSetting.delete"),
        this.$t("systemSetting.add")
      ],
      stationConfig,
      propertyLoading: false,
      getAllRolesUrl: "./auth/roles",
      data: [],
      roleList: [1, 4],
      userListHeight,
      wrapperHeight,
      userTableList: [
        {
          seriesNumber: 1,
          groupName: "test1",
          groupName: "test12",
          roles: "test13",
          tel: "test1234",
          operation: ""
        }
      ],
      editeRouterParams: null,
      isShowProperty: true,
      list: [],
      rowData: {
        address: "",
        addrjson: "",
        attachPath: "",
        createTime: "",
        path: "",
        roleList: "",
        roles: "",
        tel: "",
        type: "",
        updateTime: "",
        userId: "",
        username: ""
      },
      customNodeId: null
      // customQueryUrl: null
    };
  },
  computed: {
    addAndUpdateUserAuth() {
      return this.$store.state.hjSystemAuthObj.taskManagementAuth;
    },
    resetPasswordAuth() {
      return this.$store.state.hjSystemAuthObj.resetPasswordAuth;
    },
    ...mapState({
      userUrl: state => state.maintenanceStaffBasePropertyPage.userList.url,
      userJson: state => state.maintenanceStaffBasePropertyPage.userList.json,
      total: state => state.maintenanceStaffBasePropertyPage.userList.total
    }),
    activeTabRouter() {
      return this.activeItem.routeParams;
    },
    userRightsIndexRouter() {
      // history.back();
      return {
        path: `/systemSetting/userRightsManagement/maintenanceStaff/user/${this.userListNodeId}`
      };
    },
    activeItem() {
      if (this.pageType == "maintainer") {
        return {
          name: this.$t("systemSetting.opsMember"),
          routeParams: {
            name: "maintenanceStaff",
            params: { activeName: "maintainer", activeId: this.userListNodeId }
          }
        };
      } else if (this.pageType == "user") {
        return {
          name: this.$t("systemSetting.proprietor"),
          routeParams: {
            name: "maintenanceStaff",
            params: { activeName: "user", activeId: this.userListNodeId }
          }
        };
      } else if (this.pageType == "socialUnit") {
        return {
          name: this.$t("systemSetting.socialUnit"),
          routeParams: {
            name: "maintenanceStaff",
            params: { activeName: "socialUnit", activeId: this.userListNodeId }
          }
        };
      }
    },
    queryUserStationsUrl() {
      console.log("路由");
      console.log(this.$route.params.currentNodeId); //

      return `./auth/users/${this.$route.params.currentNodeId}/stations`; //这个是接口
    },
    activeProperty() {
      switch (this.userType) {
        case "maintainer":
          return this.$t("systemSetting.opsUserProperty");
          break;
        case "user":
          return this.$t("systemSetting.proprietorProperty");
          break;
        case "socialUnit":
          return this.$t("systemSetting.userProperty");
          break;
        default:
          return this.$t("systemSetting.opsUserProperty");
      }
    },
    mainContentSpan() {
      if (this.list && this.list.length) {
        return 20;
      } else {
        return 24;
      }
    },
    xsSpan() {
      if (this.list && this.list.length) {
        return 18;
      } else {
        return 24;
      }
    },
    smSpan() {
      if (this.list && this.list.length) {
        return 18;
      } else {
        return 24;
      }
    },
    mdSpan() {
      if (this.list && this.list.length) {
        return 18;
      } else {
        return 24;
      }
    },
    lgSpan() {
      if (this.list && this.list.length) {
        return 19;
      } else {
        return 24;
      }
    }
  },
  watch: {
    rowData(newVal, oldVal) {
      if (Array.isArray(newVal.roleList) && newVal.roleList.length) {
        this.roleList = newVal.roleList.map(item => {
          return item.roleId;
        });
      } else {
        this.roleList = [];
      }
    },
    "addAndUpdateUserAuth.auth"(newVal, oldVal) {
      this.data = this.data.map(item => {
        item.disabled = !newVal;
        return item;
      });
      this.stationConfig.showAddIcon = newVal;
    },
    "$route.params"(newVal, oldVal) {
      console.log("new route params++++++++++", newVal, oldVal);
      // this.customNodeId = newVal.currentNodeId;
      // this.customQueryUrl = `./auth/users/${newVal.currentNodeId}/stations`; //这个是接口
      // console.log(this.customQueryUrl);
      this.$refs.userStationList.queryData();
      this.queryPropertyData();
    }
  },

  methods: {
    queryPropertyData() {
      var url = `./auth/users/${this.$route.params.currentNodeId}`;
      this.propertyLoading = true;
      this.$http({ url }).then(response => {
        this.rowData = response.data.data;
        this.propertyLoading = false;
      });
    },
    // editStationOwner(paramsData) {
    //   // paramsData: row, index, tableData
    //   console.log("maintenanceStaffBasePropertyPage");
    //   console.log("editStationOwner paramsData", paramsData);
    //   var userType = paramsData.row.type ? paramsData.row.type : "user";
    //   // switch(userType){
    //   //   case 'maintainer':
    //   //   userType = 'maintenanceStaff'
    //   //   break;
    //   //   case 'user':
    //   //   default:
    //   //   userType = 'user'
    //   // }
    //   this.editeRouterParams = {
    //     name: "maintenanceStaffBasePropertyPage",
    //     params: {
    //       currentNodeId: paramsData.row.userId,
    //       pageType: this.pageType,
    //       userType,
    //       userListNodeId: this.userListNodeId
    //     }
    //   };
    //   console.log("this.editeRouterParams", this.editeRouterParams);
    //   this.$router.push(this.editeRouterParams);
    // },

    setRoleList() {
      if (
        this.rowData &&
        this.rowData.roleList &&
        this.rowData.roleList.length
      ) {
        // this.roleList = this.rowData.roleList
        this.roleList = this.rowData.roleList.map(item => {
          return item.roleId;
          // return 4
        });
      } else {
        this.roleList = [];
      }
    },
    addRole(roleIds) {
      if (!roleIds || !roleIds.length) {
        return;
      }
      var url = `./auth/users/${this.currentNodeId}/roles`;
      var json = {
        addRoleIds: roleIds
      };
      this.$http({
        json,
        url,
        method: "post"
      }).then(response => {
        let code =
          response.data && response.data.head && response.data.head.code;
        if (+code === 0) {
          var newRolist = roleIds.map(item => {
            this.rowData.roleList.push({ roleId: item });
            console.log(this.rowData);
            // this.$set(this.rowData, this.rowData.length, {roleId: item})
          });
        } else {
          this.roleList = this.rowData.roleList.map(item => {
            return item.roleId;
          });
        }
      });
    },
    deleteRole(roleIds) {
      var url = `./auth/users/${this.currentNodeId}/roles`;
      var json = {
        removeRoleIds: roleIds
      };
      //action : delete
      this.$http({
        json,
        url,
        method: "delete"
      });
    },
    updateUsergroup() {
      this.$refs.userStationList.queryData(true);
    },
    handleChangePath(val, arrow, roleIds) {
      console.log(
        "handleChangePath",
        "val",
        val,
        "arrow",
        arrow,
        "roleIds",
        roleIds,
        "data",
        this.data
      );
      let message = this.$t("systemSetting.mustOneRoleAtLeast");
      if (val.length === 0 && arrow === "left") {
        this.$message.error(message);
        this.roleList = roleIds; //至少保留一个角色
        return;
      }
      if (arrow == "right") {
        //添加角色
        this.addRole(roleIds);
      } else {
        //删除角色
        this.deleteRole(roleIds);
      }
    },
    clickAddMaintenanceStaff() {},
    // deleteRow(params) {
    //   //row,index,list
    //   var url = `./auth/users/${this.currentNodeId}/stations/${
    //     params.row.id
    //   }/unview`;

    //   this.$http({
    //     url,
    //     method: "delete"
    //   }).then(response => {
    //     let code =
    //       response.data && response.data.head && response.data.head.code;
    //     if (+code === 0) {
    //       this.$refs.userStationList.queryData();
    //     }
    //   });
    // },

    changeNode(nodeId, rowItem) {
      // if (nodeId == this.currentNodeId) {
      //   return;
      // }

      this.customNodeId = nodeId;
      console.log(
        "nodeId, this.pageType, this.userType, this.userListNodeId",
        nodeId,
        this.pageType,
        this.userType,
        this.userListNodeId
      );
      console.log(
        `/systemSetting/userRightsManagement/maintenanceStaffBasePropertyPage/${this.userListNodeId}/${nodeId}/${this.pageType}/${this.userType}`
      );
      this.$router.push({
        path: `/systemSetting/userRightsManagement/maintenanceStaffBasePropertyPage/${this.userListNodeId}/${nodeId}/${this.pageType}/${this.userType}`
        // params: {
        //   currentNodeId: nodeId,
        //   pageType: this.pageType,
        //   userType: this.userType,
        //   userListNodeId: this.userListNodeId
        // }
      });
      // this.rowData = rowItem;
      // this.$nextTick(() => {
      //   this.$refs.userStationList.queryData();
      // });
      // this.$refs.userStationList.queryData({ nodeId: nodeId });
    },
    processUserStationList(response, callback) {
      var total = response.data.data.total;
      var tableData = response.data.data.rows;
      callback(total, tableData);
    },
    queryRolesData() {
      var url = this.getAllRolesUrl;
      var json = {};
      this.$http({
        url,
        json
      }).then(response => {
        var data = response.data.data;
        if (data && data.length) {
          this.data = data.map(item => {
            item.disabled = !this.addAndUpdateUserAuth.auth;
            return item;
          });
        } else {
          this.data = [];
        }
        this.$nextTick(() => {
          this.setRoleList();
        });
      });
    }
  },
  mounted() {
    this.queryRolesData();
    if ((!this.list || !this.list.length) && this.pageType != "socialUnit") {
      // this.currentNodeId = NaN;
      this.$nextTick(() => {
        this.$refs.verticalList.queryData(true);
      });
    }
    // if (this.pageType == "socialUnit") {
    this.$refs.userStationList.queryData();
    this.queryPropertyData();
    // console.log("jiedian");
    // console.log(this.currentNodeId);
    // }
  }
};
</script>

