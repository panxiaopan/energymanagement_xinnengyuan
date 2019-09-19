<template>
  <div class="hj-maintence-staff-tab">
    <search-widget ref="searchWidget" :config="config" @click-add="clickAdd"></search-widget>
    <el-table
      v-loading="loading"
      ref="table"
      :data="tableLists"
      border
      style="min-width:100%;"
      @sort-change="sortChange"
      @cell-click="cellClick"
    >
      <el-table-column :label="$t('systemSetting.identifier')" prop="seriesNumber" :width="70">
        <template slot-scope="scope">{{(scope.$index+1)+($refs.pagination.currentPage-1)*pageSize}}</template>
      </el-table-column>
      <el-table-column
        v-for="tableItem in tableConfig"
        :key="tableItem.label"
        :sortable="tableItem.sortable"
        :label="tableItem.label"
        :prop="tableItem.prop"
        :min-width="tableItem.minWidth?tableItem.minWidth : '--'"
        :width="tableItem.width?tableItem.width : '--'"
      >
        <template slot-scope="scope">
          <span
            :class="tableItem.linkColor?'linkColor':''"
            @click.stop="clickCell(scope.row, tableItem.prop,tableItem.linkColor,scope.$index,tableLists)"
          >{{scope.row[tableItem.prop]}}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="isShowAction"
        :label="operationName||defaultOperationName"
        prop="action"
        :width="120"
      >
        <template slot-scope="scope">
          <!-- <el-button v-if="showEdit&&authEdit" @click.native.prevent="editRow(scope.row,scope.$index, tableLists)" size="mini" style="border-radius:14px;border:1px solid #ccc;"><i class="el-icon-edit"></i></el-button> -->
          <el-button
            v-if="showDelete&&authEdit"
            @click.native.prevent="deleteRow(scope.row,scope.$index, tableLists)"
            size="mini"
            style="border-radius:14px;border:1px solid #ccc;"
          >
            <i class="el-icon-delete"></i>
          </el-button>
          <el-button
            v-if="showView&&authEdit"
            @click.native.prevent="viewRow(scope.row,scope.$index, tableLists)"
            size="mini"
            style="border-radius:14px;"
          >
            <i class="el-icon-view" aria-hidden="true"></i>
          </el-button>
          <el-tooltip style="margin: 4px;" effect="dark" content="转换'用户'角色为'运维'角色" placement="top">
            <el-button
              v-if="showTransfer&&authTransform"
              @click.native.prevent="transferRole(scope.row,scope.$index, tableLists)"
              size="mini"
              style="border-radius:14px;border:1px solid #ccc;"
            >
              <i class="iconfont icon-switch-role"></i>
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <custom-pagination
      ref="pagination"
      :total="total"
      :page-size="pageSize"
      @size-change="handleSizeChange"
    ></custom-pagination>

    <el-dialog :title="$t('systemSetting.switchRole')" :visible.sync="transferRoledialogVisible">
      <el-form
        ref="transferRoleForm"
        label-position="right"
        label-width="150px"
        :model="transferRoleForm"
        :rules="transferRoleRules"
      >
        <!-- $t('systemSetting.userGroup') -->
        <el-form-item :label="initI18n('userGroup')" prop="groupId">
          <div
            style="display:flex;justify-content:space-between;z-index:1111111;line-height: 22px;"
          >
            <el-cascader
              ref="transferRoleCascader"
              style="width:75%;"
              v-model="transferRoleForm.groupId"
              size="small"
              :options="transferRoleOptions"
              :props="transferRoleDefaultProps"
              change-on-select
              clearable
              @change="transferRoleChange"
            ></el-cascader>
          </div>
        </el-form-item>
        <!-- initI18n $t('systemSetting.password')-->
        <el-form-item :label="initI18n('password')" prop="password">
          <el-input
            v-model.lazy.trim="transferRoleForm.password"
            style="width:75%;"
            @change="changePassword"
            :placeholder="$t('systemSetting.inputPwd')"
            type="password"
            :minlength="6"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancleTransferRole" size="large">取 消</el-button>
        <el-button type="primary" @click="confirmTransferRole" size="large">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import SearchWidget from "../search-widget";
import CustomPagination from "../custom-pagination";
import Vue from "vue";
import { MessageBox } from "element-ui";
import CreateUserForm from "../create-user-form";
import md5 from "md5";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers("systemSetting");

export default {
  name: "maintenanceStaffTab",
  componentName: "maintenanceStaffTab",
  mixins: [],
  components: {
    SearchWidget,
    CustomPagination,
    CreateUserForm
  },
  // <--props-->
  props: {
    config: {
      type: Object,
      default: () => {
        return { showSearch: false };
      }
    },
    type: {
      type: String,
      default: "maintainer" //user
    },
    pathAlias: {
      type: String,
      default: ""
    },
    authEdit: Boolean,
    authTransform: Boolean,
    isShowAction: {
      type: Boolean,
      default: true
    },
    showEdit: {
      type: Boolean,
      default: true
    },
    showDelete: {
      type: Boolean,
      default: true
    },
    showTransfer: {
      type: Boolean,
      default: false
    },
    showView: {
      type: Boolean,
      default: false
    },
    queryUrl: {
      type: String,
      default: "../auth/getUserList.do"
      // default: `./auth/groups/${this.nodeId}/users`
    },
    nodeId: {
      type: [Number, String],
      default: NaN
    },
    defaultOrderCol: {
      type: String,
      default: "create_time"
    },
    operationName: {
      type: String,
      default: () => {
        return "";
      }
    }
  },
  data() {
    var userOrderFieldMap = new Map([
      ["loginName", "login_name"],
      ["username", "user_name"],
      ["tel", "tel"],
      ["roles", "roles"],
      ["createTime", "create_time"]
    ]);

    var validateGroupId = (rule, value, callback) => {
      console.log("validateGroupId", "rule", rule, "value", value);
      if (!value.length) {
        callback(new Error(this.$t("systemSetting.selectUserGroup")));
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      console.log("validateGroupId", "rule", rule, "value", value);
      if (!value.length) {
        callback(new Error(this.$t("systemSetting.inputPwd")));
      } else {
        callback();
      }
    };
    var exampleOptions = [
      {
        name: "test",
        id: "3",
        subTrees: [{ name: "teste", id: "33", subTrees: undefined }]
      }
    ];
    const app = window.app;
    console.log("----window");
    console.log(app);
    return {
      transferRoledialogVisible: false,
      app: app,
      transferRoleForm: {
        groupId: [],
        password: ""
      },
      transferRoleRules: {
        groupId: [
          {
            type: "array",
            require: true,
            message: this.$t("systemSetting.selectUserGroup")
          },
          {
            validator: validateGroupId,
            trigger: "blur"
          }
        ],
        password: [
          {
            type: "string",
            require: true,
            message: this.$t("systemSetting.inputPwd")
          },
          {
            rang: { min: 6 },
            message: this.$t("systemSetting.inputPwdTips"),
            trigger: "blur"
          },
          {
            validator: validatePassword,
            trigger: "blur"
          }
        ]
      },
      transferRoleOptions: [],
      exampleOptions,
      transferRoleDefaultProps: {
        label: "name",
        value: "id",
        children: "subTrees"
      },
      loading: false,
      tableLists: [],
      orderCol: this.defaultOrderCol,
      orderType: "desc",
      pageSize: 10,
      total: 10,
      defaultOperationName: this.$t("systemSetting.operation"),
      tableConfig: [
        {
          label: this.$t("systemSetting.nickname"),
          prop: "username",
          sortable: "custom",
          linkColor: this.showEdit && this.authEdit
        },
        {
          label: this.$t("systemSetting.loginName"),
          prop: "loginName",
          sortable: "custom"
        },
        {
          label: this.$t("systemSetting.telephone"),
          prop: "tel",
          sortable: "custom",
          width: 150
        },
        {
          label: this.$t("systemSetting.belongGroup"),
          prop: "attachPath",
          sortable: false,
          linkColor: true,
          minWidth: 150
        },
        {
          label: this.$t("systemSetting.role"),
          prop: "roles",
          sortable: "custom",
          minWidth: 150
        },
        {
          label: this.$t("systemSetting.createTime"),
          prop: "createTime",
          sortable: "custom",
          width: 200
        }
      ],
      userOrderFieldMap,
      json: {}
    };
  },
  computed: {
    ...mapState(["userTreeList"])
  },
  watch: {},
  methods: {
    ...mapMutations(["updateMaintenanceEditePage"]),
    handleSizeChange(val) {
      this.pageSize = val;
    },
    initI18n(type) {
      return this.$t(`systemSetting[${type}]`);
    },
    sortChange(val) {
      var { column, prop, order } = val;
      if (prop || order) {
        this.orderCol =
          this.userOrderFieldMap.get(prop) || this.defaultOrderCol;
        this.orderType = order == "ascending" ? "asc" : "desc";
        // asc，默认）或者降序（desc）
      } else {
        this.orderCol = this.defaultOrderCol;
        this.orderType = "desc";
      }
      this.queryData();
    },
    cellClick(row, column, cell, event) {
      // row, column, cell, event
      console.log("row", row, "column", column, "cell", cell, "event", event);
      this.$emit("cell-click", { row, column, cell, event });
    },
    clickCell(row, prop, isLink, index, tableData) {
      if (isLink) {
        if (prop == "attachPath" && row.path.length) {
          var pathArr = row.path.split("_");

          var lastPathId = +pathArr[pathArr.length - 1];
          this.$emit("click-path", lastPathId);
          return;
        }
        if (prop == "username" && this.showEdit && this.authEdit) {
          this.editRow(row, index, tableData);
          return;
        }
      }
    },
    checkChildArr(arr) {
      if (!arr || !arr.length) {
        return;
      }
      arr.forEach(item => {
        if (!item.subTrees) {
          return;
        }
        // item.id=item.id+''
        if (!item.subTrees.length) {
          item.subTrees = undefined;
          return;
        }
        this.checkChildArr(item.subTrees);
      });
    },
    transferRoleChange(val) {
      console.log("transferRoleChange", val, this.transferRoleForm.groupId);
    },
    cancleTransferRole() {
      this.transferRoledialogVisible = false;
    },
    confirmTransferRole() {
      //validate validateField
      this.$refs.transferRoleForm.validate(valid => {
        if (valid) {
          this.queryTransferRole();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    changePassword(val) {
      console.log("changePassword", val);
    },
    queryTransferRole() {
      var url = `./auth/users/${this.transferRoleForm.selectedUserId}/adminRole`;
      var json = {
        // selectedUserId: this.transferRoleForm.selectedUserId,
        groupId: +this.transferRoleForm.groupId[
          this.transferRoleForm.groupId.length - 1
        ],
        password: md5(this.transferRoleForm.password)
      };
      this.$http({
        url,
        json,
        method: "post"
      }).then(response => {
        let code =
          response.data && response.data.head && response.data.head.code;
        if (+code === 0) {
          console.log("queryTransferRole", response);
          this.queryData();
          this.transferRoledialogVisible = false;
        } else {
          this.transferRoledialogVisible = false;
        }
      });
    },
    transferRole(row, index, tableData) {
      this.transferRoleForm.selectedUserId = row.userId;
      if (!this.transferRoleOptions.length) {
        // var options = this.$store.state.userTreeList;
        var options = this.userTreeList;
        this.checkChildArr(options);
        this.transferRoleOptions = options;
      }
      if (!this.transferRoleForm.groupId.length) {
        if (this.pathAlias && this.pathAlias.length) {
          this.transferRoleForm.groupId = this.pathAlias
            .trim()
            .split("_")
            .map(item => +item);
        } else {
          this.transferRoleForm.groupId = [];
        }
      }
      this.transferRoledialogVisible = true;
    },
    editRow(row, index, tableData) {
      // this.$store.commit("updateMaintenanceEditePage", {
      //   total: this.total,
      //   url: this.queryUrl,
      //   json: this.json
      // });
      this.updateMaintenanceEditePage({
        total: this.total,
        url: this.queryUrl,
        json: this.json
      });
      var paramsData = {
        row,
        index,
        list: tableData,
        total: this.total,
        url: this.url,
        json: this.json,
        userListNodeId: this.nodeId
      };
      // this.$router.push({
      //   name: 'maintenanceStaff',
      //   params: { activeName: this.type, activeId: this.nodeId }
      // });
      this.$emit("edit-row", paramsData);
      this.editMaintenanceStaff(paramsData);
      console.log("editRow", row);
    },
    editMaintenanceStaff(paramsData) {
      this.$router.push({
        name: "maintenanceStaffBasePropertyPage",
        params: {
          currentNodeId: paramsData.row.userId,
          pageType: this.type,
          userType: paramsData.row.type,
          userListNodeId: this.nodeId
        }
      });
    },
    deleteMaintenanceStaff(selectedUserId) {
      var url = `./auth/users/${selectedUserId}`;
      // var json = {
      //   params: {
      //     selectedUserId
      //   }
      // };
      this.$http({
        // json,
        url,
        method: "delete"
      }).then(response => {
        let code =
          response.data && response.data.head && response.data.head.code;
        if (+code === 0) {
          this.queryData();
          this.$message({
            type: "success",
            message: this.$t("systemSetting.removeSuccessfully")
          });
        }
      });
    },
    deleteRow(row, index, tableData) {
      this.$confirm(
        this.$t("systemSetting.removeMaintenanceStaffTips"),
        this.$t("systemSetting.warnig2"),
        {
          confirmButtonText: this.$t("systemSetting.ok"),
          cancelButtonText: this.$t("systemSetting.cancel"),
          type: "warning"
        }
      )
        .then(() => {
          this.$emit("delete-row", {
            row,
            index,
            list: tableData
          });
          this.deleteMaintenanceStaff(row.userId);
        })
        .catch(() => {
          //取消删除
        });
    },
    viewRow(row, index, tableData) {
      console.log("viewRow ", row);
    },
    queryData(isResetCurrentPage) {
      if (isNaN(this.nodeId) || !this.queryUrl) {
        return;
      }
      if (isResetCurrentPage) {
        // this.$refs.pagination.currentPage = 0; 这会导致一进入权限管理页面就请求两次用户列表。必须和custome-pagination组件的初始值一致。
        this.$refs.pagination.currentPage = 1;
      }
      this.loading = true;
      var url = this.queryUrl;
      var json = {
        // id: this.nodeId,
        size: this.pageSize,
        start: this.$refs.pagination.start,
        allFlag: this.$refs.searchWidget.showChildrenContent,
        keyword: this.$refs.searchWidget.queryString,
        orderCol: this.orderCol,
        orderType: this.orderType,
        type: this.type
      };
      this.json = json;
      this.$http({ json, url }).then(response => {
        let code =
          response.data && response.data.head && response.data.head.code;
        if (+code === 0) {
          this.loading = false;
          this.total =
            (response.data.data && response.data.data.total) || this.total;
          this.tableLists =
            (response.data.data && response.data.data.rows) || [];
        } else {
          this.loading = false;
          this.total = 1;
          this.$refs.pagination.currentPage = 1;
        }
      });
    },
    saveAdd(instance, done) {
      let form = this.$refs.userForm && this.$refs.userForm.$refs.userForm;
      form.validate(valid => {
        if (valid) {
          instance.confirmButtonLoading = true;
          instance.confirmButtonText = this.$t("systemSetting.excuting");
          var url = "./auth/users";
          console.log("this.$refs.userForm", this.$refs.userForm);
          var json = this.$refs.userForm.getFormData();
          console.log("json", json);
          json.type = this.type;
          json.groupId = json.groupId[json.groupId.length - 1];
          this.$http({
            json,
            url,
            method: "post"
          }).then(response => {
            let code =
              response.data && response.data.head && response.data.head.code;
            if (+code === 0) {
              done();
              instance.confirmButtonLoading = false;
              this.$refs.userForm.resetFormData();
              this.$message.success(this.$t("systemSetting.addSuccessfully"));
              this.queryData();
            } else {
              done();
              instance.confirmButtonLoading = false;
            }
          });
        }
      });
    },
    clickAdd() {
      if (this.pathAlias && this.pathAlias.length) {
        var userGroupId = this.pathAlias
          .trim()
          .split("_")
          .map(item => +item);
      } else {
        var userGroupId = [];
      }
      var title = this.$t("systemSetting.addProprietor");
      var message = h => {
        return (
          <create-user-form
            ref="userForm"
            user-group-id={userGroupId}
            user-data={this.userTreeList}
          />
        );
      };
      if (this.type == "user") {
        title =
          this.$t("systemSetting.addProprietor") +
          "(" +
          this.$t("systemSetting.defaultPwdTips") +
          ")";
      } else if (this.type == "maintainer") {
        title =
          this.$t("systemSetting.addOpsUser") +
          "(" +
          this.$t("systemSetting.defaultPwdTips") +
          ")";
      }
      MessageBox({
        title: title,
        message: message(this.$createElement),
        showCancelButton: true,
        confirmButtonText: this.$t("systemSetting.ok"),
        cancelButtonText: this.$t("systemSetting.cancel"),
        closeOnClickModal: false,
        customClass: "hj-custom-message-box--userRightsManagement",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            // instance.confirmButtonLoading = true;
            // instance.confirmButtonText = this.$t("systemSetting.excuting");
            this.saveAdd(instance, done);
          } else {
            done();
            this.$refs.userForm && this.$refs.userForm.resetFormData();
          }
        }
      }).then(action => {});
    }
  },
  created() {},
  mounted() {},
  destroyed() {}
};
</script>
<style lang="less">
@import "./index.less";
</style>


