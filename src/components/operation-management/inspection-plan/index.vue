<template>
  <div class="hj-inspection-plan-wrapper">
    <div class="hj-inspection-plan__head">
      <el-row class="panel__item">
        <el-col :span="2" class="panel__item__left">
          <span :title="filterText.createDate">{{filterText.createDate}}</span>
        </el-col>
        <el-col :span="8" class="panel__item__right">
          <el-date-picker
            v-model="eventDateValue"
            size="small"
            type="daterange"
            :picker-options="eventDatePickerOption"
            format="yyyy-MM-dd"
            @change="changeEventDate"
          ></el-date-picker>
        </el-col>
      </el-row>
      <el-row class="panel__item">
        <el-col :span="2" class="panel__item__left">
          <span :title="filterText.keyword">{{filterText.keyword}}</span>
        </el-col>
        <el-col :span="6" class="panel__item__right">
          <el-input
            v-model="keyword"
            :placeholder="placeholderObj.searchKeyword"
            size="small"
            @keyup.enter.stop.native="handleEnterSearch"
          >
            <i slot="suffix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </el-col>
        <div class="panel__item__right--report" v-if="addInspectionPlanAuth.auth">
          <el-button size="small" @click="click2CreatePlan" type="primary">{{filterText.createPlan}}</el-button>
        </div>
      </el-row>
    </div>
    <div class="hj-inspection-plan__body">
      <el-table
        :data="dataList"
        stripe
        border
        style="width: 100%"
        @sort-change="sortChange"
        v-loading="tableLoading"
        :max-height="maxTableHeight"
      >
        <el-table-column
          prop="socialUnit"
          :label="tableText.socialUnit"
          min-width="110"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{scope.row.socialUnit && scope.row.socialUnit.name || ''}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="creator" :label="tableText.creator" min-width="100" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.creator && scope.row.creator.name || ''}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          :label="tableText.inspectionTitle"
          min-width="100"
          align="center"
        ></el-table-column>
        <!-- <el-table-column prop="creationTime" :label="tableText.creationTime" min-width="100" >
        </el-table-column>-->
        <el-table-column
          prop="startTime"
          :label="tableText.startTime"
          min-width="100"
          align="center"
        ></el-table-column>
        <el-table-column prop="endTime" :label="tableText.endTime" min-width="100" align="center"></el-table-column>
        <el-table-column prop="cycle" :label="tableText.cycle" min-width="110" align="center">
          <template slot-scope="scope">
            <span>{{cycleName.get(scope.row.cycle && scope.row.cycle.value) || ''}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="orderTimeInAdvance"
          :label="tableText.orderTimeInAdvance"
          min-width="100"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{scope.row.orderTimeInAdvance && scope.row.orderTimeInAdvance.desc || ''}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="executor" :label="tableText.executor" min-width="110" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.executor && scope.row.executor.name || ''}}</span>
          </template>
        </el-table-column>

        <!-- <el-table-column prop="description" :label="tableText.description" min-width="110" align="center">
        </el-table-column>-->
        <el-table-column
          prop="operation"
          :label="tableText.operation"
          min-width="50"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              @click="click2ViewDetails(scope)"
              size="small"
              circle
              :title="tableText.viewDetails"
            >
              <i class="el-icon-edit"></i>
            </el-button>
            <!-- <el-button @click="click2Delete(scope)" size="small" circle><i class="el-icon-delete"></i></el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="hj-inspection-plan__pagination">
      <el-pagination
        @size-change="changePageSize"
        @current-change="changeCurrentPage"
        :current-page.sync="paginationOptions.currentPage"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="paginationOptions.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";
// const { mapState } = createNamespacedHelpers("operationManagement");

import InspectionForm from "./inspection-form.vue";
import md5 from "md5";
export default {
  name: "InspectionPlan",
  components: {
    InspectionForm
  },
  props: {
    queryUrl: {
      type: String,
      default: "./patrols/plans"
    }
  },
  data() {
    var tableText = {
      creator: this.$t("workOrderManagement.creator"),
      creationTime: this.$t("workOrderManagement.creationTime"),
      startTime: this.$t("workOrderManagement.startTime"),
      endTime: this.$t("workOrderManagement.endTime"),
      socialUnit: this.$t("workOrderManagement.socialUnit"),
      executor: this.$t("workOrderManagement.executor"),
      inspectionTitle: this.$t("workOrderManagement.inspectionTitle"),
      description: this.$t("workOrderManagement.inspectionDescription"),
      operation: this.$t("workOrderManagement.operation"),
      cycle: "巡检周期",
      orderTimeInAdvance: "工单生成规则",
      viewDetails: "查看/编辑巡检计划"
    };
    var filterText = {
      createDate: this.$t("workOrderManagement.inspectionDate"),
      keyword: this.$t("common.search"),
      createPlan: this.$t("workOrderManagement.createInspectionPlan")
    };
    var placeholderObj = {
      searchKeyword: this.$t("workOrderManagement.searchTips")
    };
    var eventDatePickerOption = {
      firstDayOfWeek: 1
      // disabledDate(time) {
      //   return time.getTime() > Date.now();
      // }
    };
    return {
      tableText,
      dataList: [],
      total: 0,
      activeTabName: "inspection",
      inspectionPlanName: this.$t("common.inspectionPlan"),
      paginationOptions: {
        currentPage: 1,
        pageSize: 10
      },
      keyword: "",
      filterText,
      placeholderObj,
      eventDateValue: "",
      eventDatePickerOption,
      tableLoading: false,
      cycleMap: new Map([[2, "everyday"], [3, "everyWeek"], [6, "everyMonth"]]),
      cycleName: new Map([[2, "每天"], [3, "每周"], [6, "每月"]])
    };
  },
  computed: {
    ...mapState({
      addInspectionPlanAuth: state =>
        state.hjSystemAuthObj.addInspectionPlanAuth
    }),
    password() {
      return this.$store.state.login.userInfo.password;
    },
    maxTableHeight() {
      return window.innerHeight * (1 - 0.28);
    },
    config() {
      let url = this.queryUrl;
      let startTime = "";
      let endTime = "";

      let size = this.paginationOptions.pageSize;
      let start = (this.paginationOptions.currentPage - 1) * size;
      if (this.eventDateValue) {
        startTime = moment(this.eventDateValue[0])
          .startOf("day")
          .format("YYYY-MM-DD HH:mm:ss");
        endTime = moment(this.eventDateValue[1])
          .endOf("day")
          .format("YYYY-MM-DD HH:mm:ss");
      }

      let keyword = this.keyword;
      let json = {
        start,
        size,
        startTime,
        endTime,
        keyword
      };
      return {
        url,
        json
      };
    }
  },
  methods: {
    sortChange() {
      console.log("sort change +++++++++");
    },
    handleTabClick() {
      console.log("tabname");
    },
    changePageSize(pageSize) {
      this.paginationOptions.currentPage = 1;
      this.paginationOptions.pageSize = pageSize;
      this.queryDataList();
    },
    changeCurrentPage() {
      this.queryDataList();
    },
    handleEnterSearch() {
      //重新回到第一页查询
      this.paginationOptions.currentPage = 1;
      this.queryDataList();
    },
    click2CreatePlan() {
      if (this.$refs.inspectionForm) {
        this.$refs.inspectionForm.resetForm();
        // 由于此前可能是修改表单 直接resetForm无法清空 直接清空formObj
        // let formObj = this.$refs.inspectionForm.formObj
      }
      let initFormData = {
        socialUnit: "",
        inspectionTitle: "",
        inspectionContent: "",
        inspector: "",
        planStartTime: "",
        planEndTime: "",
        workOrderTime: "",
        inspectionPeriod: ""
      };
      let message = h => {
        return (
          <inspection-form ref="inspectionForm" init-form-data={initFormData} />
        );
      };
      this.$msgbox({
        title: this.$t("common.inspectionPlan"),
        message: message(this.$createElement),
        showCancelButton: true,
        customClass: "hj-custom-message-box--form",
        confirmButtonText: this.$t("common.ok"),
        cancelButtonText: this.$t("common.cancel"),
        closeOnClickModal: false,

        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            console.log("this.inspectionForm", this.$refs.inspectionForm);
            let inspectionForm =
              this.$refs.inspectionForm && this.$refs.inspectionForm.$refs.form;
            inspectionForm.validate(valid => {
              if (valid) {
                this.$refs.inspectionForm.submitLoading = true;
                let promise = this.$refs.inspectionForm.submitPromise();
                promise
                  .then(response => {
                    let code =
                      response.data &&
                      response.data.head &&
                      response.data.head.code;
                    // let data = response.data && response.data.data
                    if (code === 0) {
                      let message = this.$t("systemSetting.addSuccessfully");
                      this.$message.success(message);
                      done();
                      this.$nextTick(() => {
                        this.queryDataList();
                      });
                    }
                    this.$refs.inspectionForm.submitLoading = false;
                  })
                  .catch(err => {
                    this.$refs.inspectionForm.submitLoading = false;
                  });
              }
            });
          } else {
            done();
          }
        }
      });
    },
    changeEventDate() {
      console.log("change event date+++");
      this.queryDataList();
    },
    click2ViewDetails(scope) {
      // if (this.$refs.inspectionForm) {
      //   this.$refs.inspectionForm.resetForm();
      // }

      let cycle = (scope.row.cycle && scope.row.cycle.value) || "";
      let cycleValue = this.cycleMap.get(cycle);
      let { dayOfWeek, dayOfMonth } = scope.row.cycleAdditionalMessage;
      let initFormData = {
        socialUnit: (scope.row.socialUnit && scope.row.socialUnit.id) || "",
        inspectionTitle: scope.row.title || "",
        inspectionContent: scope.row.description || "",
        inspector: (scope.row.executor && scope.row.executor.id) || "",
        planStartTime: scope.row.startTime || "",
        planEndTime: scope.row.endTime || "",
        workOrderTime:
          (scope.row.orderTimeInAdvance &&
            scope.row.orderTimeInAdvance.value) ||
          "",
        inspectionPeriod: cycleValue,
        dayOfWeek,
        dayOfMonth
      };
      let postUrl = `./patrols/plans/${scope.row.id}`;
      let message = h => {
        return (
          <inspection-form
            ref="inspectionForm"
            init-form-data={initFormData}
            form-method="put"
            post-url={postUrl}
          />
        );
      };
      this.$msgbox({
        title: this.$t("common.inspectionPlan"),
        message: message(this.$createElement),
        showCancelButton: true,
        customClass: "hj-custom-message-box--form",
        confirmButtonText: this.$t("common.ok"),
        cancelButtonText: this.$t("common.cancel"),
        closeOnClickModal: false,

        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            console.log("this.inspectionForm", this.$refs.inspectionForm);
            let inspectionForm =
              this.$refs.inspectionForm && this.$refs.inspectionForm.$refs.form;
            inspectionForm.validate(valid => {
              if (valid) {
                this.$refs.inspectionForm.submitLoading = true;
                let promise = this.$refs.inspectionForm.submitPromise();
                promise
                  .then(response => {
                    let code =
                      response.data &&
                      response.data.head &&
                      response.data.head.code;
                    // let data = response.data && response.data.data
                    if (code === 0) {
                      let message = this.$t("systemSetting.updateSuccessfully");
                      this.$message.success(message);
                      done();
                      this.$nextTick(() => {
                        this.queryDataList();
                      });
                    }
                    this.$refs.inspectionForm.submitLoading = false;
                  })
                  .catch(err => {
                    this.$refs.inspectionForm.submitLoading = false;
                  });
              }
            });
          } else {
            done();
          }
        }
      });
    },
    click2Delete() {
      this.$confirm(
        this.$t("workOrderManagement.removeInspectionPlanTips"),
        this.$t("common.warning2"),
        {
          confirmButtonText: this.$t("common.ok"),
          cancelButtonText: this.$t("common.cancel"),
          type: "warning"
        }
      )
        .then(() => {
          this.$prompt(
            this.$t("common.inputPasswordTips"),
            this.$t("common.warning2"),
            {
              confirmButtonText: this.$t("common.ok"),
              cancelButtonText: this.$t("common.cancel"),
              inputType: "password",
              inputValidator: value => {
                if (value === "") {
                  return this.$t("systemSetting.passwordNullError");
                } else if (md5(value) !== this.password) {
                  return this.$t("systemSetting.passwordError");
                }
                return true;
              }
            }
          )
            .then(({ value }) => {
              setTimeout(() => {
                this.$message.success("Delete successfully");
              }, 1000);
              // this.$http({
              //   url,
              //   json: { password: md5(value) },
              //   method: "delete"
              // }).then(response => {
              //   var code =
              //     response.data &&
              //     response.data.head &&
              //     response.data.head.code;
              //   if (+code === 0) {
              //     this.$message.success(message);
              //     let newStationDeviceList = [];
              //     newStationDeviceList = this.dataList.filter(item => {
              //       return item.id !== +url.split("/")[2];
              //     });
              //     this.updateStationDeviceList(newStationDeviceList);
              //   }
              // });
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    queryDataList() {
      // let url = this.queryUrl
      // let json =
      this.tableLoading = true;
      this.$http({
        ...this.config
      })
        .then(response => {
          var code =
            response.data && response.data.head && response.data.head.code;
          var data = response.data && response.data.data;

          console.log("plan dataList", data);
          if (+code === 0 && data) {
            if (typeof data.total !== "undefined") {
              this.total = data.total;
            }
            if (data.rows && data.rows.length > 0) {
              this.dataList = data.rows.map(item => {
                item.startTime = moment(item.startTime).format(
                  "YYYY-MM-DD HH:mm"
                );
                item.endTime = moment(item.endTime).format("YYYY-MM-DD HH:mm");
                return item;
              });
            } else {
              this.dataList = [];
            }
          }

          this.tableLoading = false;
        })
        .catch(err => {
          this.tableLoading = false;
        });
    }
  },
  mounted() {
    this.queryDataList();
  }
};
</script>
<style lang="less" scoped >
@import "./index.less";
</style>