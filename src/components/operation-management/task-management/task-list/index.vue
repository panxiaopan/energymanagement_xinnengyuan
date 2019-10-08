<template>
  <div
    class="hj-task-list-management-wrapper"
    :style="{backgroundColor: bgColor, padding: commonPadding}"
  >
    <div class="hj-task-list-management__panel">
      <div class="panel__default">
        <el-row class="panel__item">
          <el-col :span="2" class="panel__item__left">
            <span :title="filterText.search">{{filterText.search}}</span>
          </el-col>
          <el-col :span="6" class="panel__item__right">
            <el-input
              v-model="keyword"
              :placeholder="placeholderObj.searchKeyword"
              size="small"
              @keyup.enter.stop.native="handleEnterSearch"
            >
              <i slot="suffix" class="el-input__icon el-icon-search"></i>
            </el-input>&nbsp;
            <el-button type="primary" size="small" @click="click2Search">{{filterText.search}}</el-button>
          </el-col>
          <div class="panel__item__right__more" @click="click2ShowMoreFilter">
            <span>{{filterText.filter}}</span>&nbsp;
            <i :class="[showMoreFilter ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"></i>
          </div>
        </el-row>
      </div>

      <el-collapse-transition>
        <div class="panel__more" v-show="showMoreFilter">
          <el-row class="panel__item">
            <el-col :span="2" class="panel__item__left">
              <span :title="filterText.workOrderType">{{filterText.workOrderType}}</span>
            </el-col>
            <el-col :span="10" class="panel__item__right work-order-type-btn">
              <el-button
                v-for="(item,index) in workOrderTypeList"
                :key="item.value"
                :type="item.type"
                @click="click2ChangeType(item,index)"
                size="small"
              >{{item.name}}</el-button>
            </el-col>
          </el-row>
          <el-row class="panel__item">
            <el-col :span="2" class="panel__item__left">
              <span :title="filterText.workOrderStatus">{{filterText.workOrderStatus}}</span>
            </el-col>
            <el-col :span="10" class="panel__item__right work-order-type-btn">
              <el-button
                v-for="(item,index) in workOrderStatusList"
                :key="item.value"
                :type="item.type"
                @click="click2ChangeStatus(item,index)"
                size="small"
              >{{item.name}}</el-button>
            </el-col>
          </el-row>
          <el-row class="panel__item">
            <el-col :span="2" class="panel__item__left">
              <span :title="filterText.eventDate">{{filterText.eventDate}}</span>
            </el-col>
            <el-col :span="20" class="panel__item__right">
              <el-button :disabled="dateType==='range'" size="small" circle @click="previous">
                <i class="el-icon-arrow-left"></i>
              </el-button>&nbsp;
              <div>
                <el-date-picker
                  v-show="dateType === 'date'"
                  v-model="eventDateValue"
                  size="small"
                  :editable="false"
                  :clearable="false"
                  type="date"
                  :picker-options="eventDatePickerOption"
                  format="yyyy-MM-dd"
                  @change="changeEventDate"
                ></el-date-picker>
                <el-date-picker
                  v-show="dateType === 'week'"
                  v-model="eventWeekValue"
                  size="small"
                  :editable="false"
                  :clearable="false"
                  type="week"
                  :picker-options="eventDatePickerOption"
                  format="yyyy-MM-dd"
                  @change="changeEventDate"
                ></el-date-picker>
                <el-date-picker
                  v-show="dateType === 'month'"
                  v-model="eventMonthValue"
                  size="small"
                  :editable="false"
                  :clearable="false"
                  type="month"
                  :picker-options="eventDatePickerOption"
                  format="yyyy-MM"
                  @change="changeEventDate"
                ></el-date-picker>
                <el-date-picker
                  v-show="dateType === 'range'"
                  v-model="eventRangeValue"
                  size="small"
                  :editable="false"
                  :clearable="false"
                  type="daterange"
                  :picker-options="eventDatePickerOption"
                  @change="changeEventDate"
                ></el-date-picker>
              </div>&nbsp;
              <el-button :disabled="dateType==='range'" size="small" circle @click="next">
                <i class="el-icon-arrow-right"></i>
              </el-button>&nbsp;&nbsp;
              <div class="panel__item__radioBtn">
                <el-radio-group v-model="dateType" @change="changeDateType" size="small">
                  <el-radio-button
                    v-for="item in dateTypeOptions"
                    :key="item.value"
                    :label="item.value"
                  >{{item.label}}</el-radio-button>
                </el-radio-group>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-collapse-transition>
    </div>
    <div class="hj-task-list-management__tableList">
      <el-table
        v-loading="loading"
        :data="dataList"
        stripe
        border
        style="width: 100%"
        :max-height="maxTableHeight"
      >
        <el-table-column prop="number" :label="tableText.number" min-width="100" align="center"></el-table-column>
        <el-table-column
          prop="assignedTime"
          :label="tableText.assignedTime"
          min-width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          v-if="isShowFinishedTime"
          prop="finishedTime"
          :label="tableText.finishedTime"
          min-width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          v-if="!isRelatedWorkOrder"
          prop="socialUnit"
          label="能源总站"
          min-width="110"
          align="center"
        ></el-table-column>
        <el-table-column label="能源子站" :show-overflow-tooltip="true" prop="subStation"></el-table-column>

        <el-table-column
          v-if="!isRelatedWorkOrder"
          prop="deviceName"
          :label="tableText.deviceName"
          min-width="110"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="workOrderType"
          :label="tableText.workOrderType"
          min-width="100"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{scope.row.workOrderType&&scope.row.workOrderType.desc}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="workOrderDesc"
          :label="tableText.workOrderDesc"
          min-width="110"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          v-if="isShowWorkOrderStatus"
          prop="workOrderStatus"
          :label="tableText.workOrderStatus"
          min-width="110"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{scope.row.workOrderStatus&&scope.row.workOrderStatus.desc}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="operation"
          :label="tableText.operation"
          min-width="120"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              @click="click2ViewDetails(scope)"
              size="small"
              circle
              :title="tableText.viewDetails"
            >
              <i class="el-icon-view"></i>
            </el-button>
            <!-- <el-button @click="click2ViewDetails(scope)" size="small">{{tableText.query}}</el-button> -->
            <!-- <el-button @click="click2Dispose(scope)" size="small">{{tableText.dispose}}</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="hj-task-list-management__pagination">
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

    <el-dialog
      :visible.sync="showDialog"
      :close-on-click-modal="false"
      custom-class="hj-custom-dialog-wrapper--taskDetails"
      @close="closeTaskDetailsDialog"
      center
    >
      <div slot="title">
        <div v-if="!isNestedTask">
          <span>{{labelTextObj.workOrderDetails}}</span>
        </div>
        <div v-else class="hj-custom-dialog-wrapper__title">
          <div class="hj-custom-dialog-wrapper__title__btn">
            <span @click="click2Return">
              <i class="el-icon-back"></i>
              {{labelTextObj.back2Origin}}
            </span>
          </div>
          <div class="hj-custom-dialog-wrapper__title__center">
            <span>{{labelTextObj.workOrderDetails}}</span>
          </div>
        </div>
      </div>
      <task-details
        ref="taskDetails"
        :work-order-type="workOrderTypeStr"
        :query-url="queryFlowDetailsUrl"
        :order-id="orderId"
        :auth-operate="authOperate"
        @update-status="updateWorkOrderStatus"
        @click-order="click2ShowWorkOrder"
      ></task-details>
    </el-dialog>
  </div>
</template>

<script>
import TaskDetails from "../task-details";
export default {
  name: "TaskManagement",
  components: {
    TaskDetails
  },
  props: {
    listType: {
      type: String,
      default: "todoTask"
    },
    queryUrl: {
      type: String,
      default: "./workOrders"
    },
    bgColor: {
      type: String,
      default: "#ffffff"
    },
    commonPadding: {
      type: String,
      default: "0"
    }
  },
  data() {
    var eventDatePickerOption = {
      firstDayOfWeek: 1,
      disabledDate(time) {
        return time.getTime() > Date.now();
      }
    };
    var dateTypeOptions = [
      {
        label: this.$t("common.day"),
        value: "date"
      },
      {
        label: this.$t("common.week"),
        value: "week"
      },
      {
        label: this.$t("common.month"),
        value: "month"
      },
      {
        label: this.$t("common.custom"),
        value: "range"
      }
    ];
    var filterText = {
      workOrderType: this.$t("workOrderManagement.workOrderType"),
      eventDate: this.$t("workOrderManagement.eventDate"),
      socialUnit: this.$t("workOrderManagement.socialUnit"),
      devicePos: this.$t("workOrderManagement.devicePos"),
      filter: this.$t("workOrderManagement.filter"),
      search: this.$t("workOrderManagement.search"),
      workOrderStatus: this.$t("workOrderManagement.workOrderStatus")
    };
    var placeholderObj = {
      searchKeyword: this.$t("hazardManagement.searchKeyword")
    };
    var tableText = {
      number: "工单编号",
      assignedTime: "发起时间",
      finishedTime: "完成时间",
      socialUnit: "社会单位",
      deviceName: "设备名称",
      workOrderType: "工单类型",
      workOrderDesc: "描述",
      workOrderStatus: "状态",
      operation: "操作",
      query: "查询",
      dispose: "处理",
      viewDetails: "查看工单详情"
    };
    var labelTextObj = {
      back2Origin: this.$t("workOrderManagement.back2OrginWorkOrder"),
      workOrderDetails: this.$t("common.workOrderDetails")
    };
    var workOrderTypeList = [
      {
        name: this.$t("hazardManagement.risk"),
        value: "risk",
        type: ""
      },
      {
        name: this.$t("hazardManagement.maintenance"),
        value: "maintenance",
        type: ""
      },
      {
        name: this.$t("hazardManagement.patrol"),
        value: "patrol",
        type: ""
      }
    ];
    var workOrderStatusList = [
      {
        name: this.$t("workOrderManagement.toBeReceived"),
        value: "toBeReceived",
        type: ""
      },
      {
        name: this.$t("workOrderManagement.processing"),
        value: "processing",
        type: ""
      },
      {
        name: this.$t("workOrderManagement.completed"),
        value: "completed",
        type: ""
      },
      {
        name: this.$t("workOrderManagement.closed"),
        value: "closed",
        type: ""
      }
    ];
    var orderFieldMap = new Map([
      ["assignedTime", "start_time"]
      // ["eventTime", "event_time"],
      // ["eventType", "event_type"],
      // ["eventClass", "event_class"],
      // ["desc", "description"],
      // ["state", "isconfirmed"],
      // ["stationName", "powersta_name"],
      // ["address", "powsta_addr"],
      // ["staff", "confirm_username"]
    ]);
    return {
      showMoreFilter: false,
      eventDatePickerOption,
      dateTypeOptions,
      dateType: "range",
      keyword: "",
      filterText,
      tableText,
      placeholderObj,
      workOrderTypeList,
      workOrderStatusList,
      workOrderType: ["risk", "patrol", "maintenance"],
      workOrderStatus: ["toBeReceived", "processing", "completed", "closed"],
      eventDateValue: "",
      eventWeekValue: "",
      eventMonthValue: "",
      eventRangeValue: "",
      paginationOptions: {
        currentPage: 1,
        pageSize: 10
      },
      labelTextObj,
      dataList: [],
      total: 0,
      orderFieldMap,
      loading: false,
      showDialog: false,
      workOrderTypeStr: "",
      flowId: "",
      orderId: "",
      // authOperate: "",
      hasFinished: false,
      isUpdated: false,
      isNestedTask: false,
      nestedTaskIds: [],
      maxTableHeight: window.innerHeight * (1 - 0.315)
    };
  },
  watch: {
    queryUrl(newVal, oldVal) {
      this.queryDataList();
    }
  },
  computed: {
    authOperate() {
      if (this.listType === "handledTask" || this.listType === "assignedTask") {
        return false;
      }
      return true;
    },
    // 待我处理不显示完成时间
    isShowFinishedTime() {
      return this.listType !== "todoTask";
    },
    isRelatedWorkOrder() {
      return this.listType === "relatedWorkOrder";
    },
    isShowWorkOrderStatus() {
      // return (
      //   this.listType === "assignedTask" ||
      //   this.listType === "workOrder" ||
      //   this.listType === "relatedWorkOrder"
      // );
      return true;
    },
    workOrderOperateAuth() {
      return this.$store.state.hjSystemAuthObj.workOrderOperateAuth;
    },
    config() {
      var url = this.queryUrl;
      var type = this.workOrderType.join(",");
      var state = this.workOrderStatus.join(",");
      var keyword = this.keyword;
      var start =
        (this.paginationOptions.currentPage - 1) *
        this.paginationOptions.pageSize;
      var size = this.paginationOptions.pageSize;
      var orderType = "desc";
      var orderCol = "start_time";
      var startTime = "";
      var endTime = moment()
        .endOf("day")
        .format("YYYY-MM-DD HH:mm:ss");
      switch (this.dateType) {
        case "date":
          startTime = moment(this.eventDateValue)
            .startOf("day")
            .format("YYYY-MM-DD HH:mm:ss");
          endTime = moment(this.eventDateValue)
            .endOf("day")
            .format("YYYY-MM-DD HH:mm:ss");
          break;
        case "week":
          startTime = moment(this.eventWeekValue)
            .startOf("day")
            .format("YYYY-MM-DD HH:mm:ss");
          endTime = moment(this.eventWeekValue)
            .day(7)
            .endOf("day")
            .format("YYYY-MM-DD HH:mm:ss");
          break;
        case "month":
          startTime = moment(this.eventMonthValue)
            .startOf("month")
            .format("YYYY-MM-DD HH:mm:ss");
          endTime = moment(this.eventMonthValue)
            .endOf("month")
            .format("YYYY-MM-DD HH:mm:ss");
          break;
        case "range":
          if (this.eventRangeValue !== "") {
            startTime = moment(this.eventRangeValue[0])
              .startOf("day")
              .format("YYYY-MM-DD HH:mm:ss");
            endTime = moment(this.eventRangeValue[1])
              .endOf("day")
              .format("YYYY-MM-DD HH:mm:ss");
          }
          break;
        default:
          break;
      }

      var json = {
        type,
        state,
        keyword,
        start,
        size,
        orderType,
        orderCol,
        startTime,
        endTime
      };
      return { url, json };
    },
    queryFlowDetailsUrl() {
      return `./workOrders/${this.orderId}/flowDetail`;
    }
  },
  methods: {
    click2Search() {
      this.queryDataList();
    },
    click2ShowMoreFilter() {
      if (this.showMoreFilter) {
        this.showMoreFilter = false;
      } else {
        this.showMoreFilter = true;
      }
    },
    click2Return() {
      console.log("click back to origin");
      let total = this.nestedTaskIds.length;
      let prevIds = [];
      if (total === 1) {
        // prevIdNames = this.nestedTaskIds.splice(0);
        this.isNestedTask = false;
        // this.orderId = prevIdNames[0]["id"];
        // return;
      }
      prevIds = this.nestedTaskIds.splice(total - 1, 1);
      this.orderId = prevIds.join();
      console.log("this.orderId ", this.orderId);
    },
    sortChange({ prop, order }) {
      this.paginationOptions.currentPage = 1; // 回到第一页
      console.log("prop order", prop, order);
      var orderCol = "";
      var orderType = "";
      if (typeof prop !== "undefined" && typeof order !== "undefined") {
        orderCol = this.orderFieldMap.get(prop);
        orderType = order === "ascending" ? "asc" : "desc";
      }
      if (!!orderCol) {
        Object.assign(this.config.json, {
          orderCol,
          orderType
        });
        this.$nextTick(() => {
          this.queryDataList();
        });
      }
    },
    handleCheckedChange(value) {
      console.log("check status", value);
    },
    handleEnterSearch() {
      this.click2Search();
    },
    changeDateType() {
      var type = this.dateType;
      switch (type) {
        case "date":
          this.eventDateValue = moment().format("YYYY-MM-DD");
          break;
        case "week":
          // console.log("week eventWeekValue", this.eventWeekValue);
          this.eventWeekValue = new Date(moment().day(1));
          break;
        case "month":
          this.eventMonthValue = new Date();
          break;
        case "range":
          this.eventRangeValue = "";
          break;
      }
      this.paginationOptions.currentPage = 1; // 回到第一页

      this.$nextTick(() => {
        this.queryDataList();
      });
    },
    previous() {
      this.addEventDate("subtract");
    },
    next() {
      this.addEventDate("add");
    },
    addEventDate(addType = "add") {
      var type = this.dateType;
      switch (type) {
        case "date":
          this.eventDateValue = moment(this.eventDateValue).add(
            addType === "add" ? 1 : -1,
            "days"
          );
          break;
        case "week":
          this.eventWeekValue = new Date(
            moment(this.eventWeekValue).add(addType === "add" ? 7 : -7, "days")
          );
          break;
        case "month":
          this.eventMonthValue = new Date(
            moment(this.eventMonthValue).add(
              addType === "add" ? 1 : -1,
              "months"
            )
          );
          break;
      }
      this.paginationOptions.currentPage = 1; // 回到第一页

      this.$nextTick(() => {
        this.queryDataList();
      });
    },
    changeEventDate(value) {
      console.log("value", value, "config", this.config);
      this.paginationOptions.currentPage = 1; // 回到第一页

      this.$nextTick(() => {
        this.queryDataList();
      });
    },
    click2ChangeType(item, index) {
      let type = item.type;
      let value = item.value;
      if (type === "primary") {
        // 至少保留一个选中
        // if (this.workOrderType.length === 1) {
        //   return;
        // }
        this.workOrderTypeList[index].type = "";
        // this.workOrderType.splice(index, 1);
      } else {
        this.workOrderTypeList[index].type = "primary";
        // this.workOrderType.splice(index, 0, value);
      }
      this.workOrderType = this.workOrderTypeList
        .filter(item => {
          return item.type === "primary";
        })
        .map(item => {
          item = item.value;
          return item;
        });
      this.$nextTick(() => {
        this.queryDataList();
      });
    },
    click2ChangeStatus(item, index) {
      let type = item.type;
      let value = item.value;
      if (type === "primary") {
        // 至少保留一个选中
        // if (this.workOrderStatus.length === 1) {
        //   return;
        // }
        this.workOrderStatusList[index].type = "";
        // this.workOrderStatus.splice(index, 1);
      } else {
        this.workOrderStatusList[index].type = "primary";
        // this.workOrderStatus.splice(index, 0, value);
      }
      this.workOrderStatus = this.workOrderStatusList
        .filter(item => {
          return item.type === "primary";
        })
        .map(item => {
          item = item.value;
          return item;
        });
      this.$nextTick(() => {
        this.queryDataList();
      });
    },
    changePageSize(pageSize) {
      this.paginationOptions.currentPage = 1;
      this.paginationOptions.pageSize = pageSize;
      // Object.assign(this.config.json, { start: 0, size: pageSize });
      this.$nextTick(() => {
        this.queryDataList();
      });
    },
    changeCurrentPage(currentPage) {
      this.$nextTick(() => {
        this.queryDataList();
      });
    },
    click2ViewDetails(scope) {
      if (this.$refs.taskDetails) {
        this.$refs.taskDetails.showDetails = false;
      }
      this.workOrderTypeStr =
        scope.row.workOrderType && scope.row.workOrderType.value;
      this.hasFinished =
        scope.row.workOrderVO && scope.row.workOrderVO.finished;
      // var hasFinished = true;
      this.orderId = scope.row.workOrderVO && scope.row.workOrderVO.id;
      // this.queryFlowDetailsUrl = `./workOrders/${this.orderId}/flowDetail`;
      this.flowId =
        scope.row.workOrderVO && scope.row.workOrderVO.processInstanceId;
      var taskId = scope.row.task && scope.row.task.id;

      this.showDialog = true;
    },
    updateWorkOrderStatus(isUpdate) {
      this.isUpdated = true;
    },
    click2ShowWorkOrder(params) {
      console.log("related workOrder", params);
      if (!this.isNestedTask) {
        this.isNestedTask = true;
      }
      this.nestedTaskIds.push(this.orderId);
      this.orderId = params.id; //更新工单id
    },
    // 关闭工单详情前，刷新当前工单列表数据--主要更新工单处理状态
    closeTaskDetailsDialog() {
      // if (this.listType === "handledTask" || this.listType === "assignedTask") {
      //   return;
      // }
      if (this.isUpdated) {
        this.queryDataList();
      }
      return;
    },
    queryDataList() {
      this.loading = true;
      this.$http({
        ...this.config
      })
        .then(response => {
          console.log("work order list response", response);
          var code =
            response.data && response.data.head && response.data.head.code;
          var data = response.data && response.data.data;
          if (+code === 0 && data) {
            if (typeof data.total !== "undefined") {
              this.total = data.total;
            }
            let dataList = [];
            if (data.rows && data.rows.length > 0) {
              data.rows.forEach(item => {
                let workOrderVO = item.workOrderVO;
                let {
                  number,
                  startTime: assignedTime,
                  type: workOrderType,
                  description: workOrderDesc,
                  state: workOrderStatus
                } = workOrderVO;

                let finishedTime = workOrderVO.finished
                  ? workOrderVO.endTime
                  : workOrderVO.updateTime;
                let socialUnit = workOrderVO.parentStation.name;
                let deviceName = workOrderVO.device.name;
                let subStation = workOrderVO.subStation.type.desc;
                dataList.push({
                  number,
                  assignedTime,
                  workOrderType,
                  workOrderDesc,
                  workOrderStatus,
                  finishedTime,
                  socialUnit,
                  deviceName,
                  subStation,
                  ...item
                });
              });
            }
            this.dataList = dataList;
            console.log("dataList", this.dataList);
          }
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    }
  }
};
</script>
<style lang="less" scoped >
.hj-task-list-management__panel {
  line-height: 1.8;
  .panel__default {
    border-bottom: 1px solid #e2e2e2;
  }
  .panel__default,
  .panel__more {
    padding: 1vh 0;
    line-height: 3.61vh;
  }
  .panel__item {
    display: flex;
    align-items: center;
    padding: 0.5vh 0;
  }
  .panel__item__left {
    width: 3.9vw;
    margin-right: 1.67vw;
    font-size: 1.48vh;
    font-weight: bold;
    text-align: justify;
    overflow: hidden;
    vertical-align: middle;
    height: 3.61vh;
  }
  .panel__item__left ::after {
    content: " ";
    display: inline-block;
    width: 100%;
    height: 0;
  }
  .panel__item__right {
    display: flex;
    align-items: center;
  }
  .work-order-type-btn .el-button {
    width: 5.1vw;
  }
  .panel__item__right__more {
    padding-left: 1vw;
    color: #20a0ff;
    cursor: pointer;
  }
}

.hj-task-list-management__tableList {
  padding-top: 1vh;
}

.hj-task-list-management__pagination {
  display: flex;
  justify-content: flex-end;
  padding-top: 1vh;
}
</style>