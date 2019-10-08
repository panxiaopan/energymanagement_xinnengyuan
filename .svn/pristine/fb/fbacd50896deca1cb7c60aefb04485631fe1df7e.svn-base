<template>
  <div class="hj-inspection-form-wrapper">
    <el-form ref="form" :model="formObj" :rules="formRules" label-position="top" size="small">
      <el-row>
        <el-col :span="12" class="form-left">
          <el-form-item :label="labelObj.socialUnit" prop="socialUnit">
            <el-select
              filterable
              remote
              size="small"
              v-model="formObj.socialUnit"
              :placeholder="placeholderObj.socialUnit"
              :remote-method="getSocialUnitList"
              :loading="socialUnitLoading"
            >
              <el-option
                v-for="ops in socialUnitList"
                :key="ops.id"
                :label="ops.name"
                :value="ops.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="labelObj.inspectionTitle" prop="inspectionTitle">
            <el-input
              v-model="formObj.inspectionTitle"
              :placeholder="placeholderObj.inspectionTitle"
            ></el-input>
          </el-form-item>
          <el-form-item :label="labelObj.inspectionContent" prop="inspectionContent">
            <el-input
              type="textarea"
              :rows="5"
              v-model="formObj.inspectionContent"
              :placeholder="placeholderObj.inspectionContent"
            ></el-input>
          </el-form-item>
          <el-form-item :label="labelObj.inspector" prop="inspector">
            <el-select
              filterable
              remote
              size="small"
              v-model="formObj.inspector"
              :placeholder="placeholderObj.inspector"
              :remote-method="getInspectorList"
              :loading="inspectorLoading"
            >
              <el-option
                v-for="ops in inspectorList"
                :key="ops.id"
                :label="ops.name"
                :value="ops.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="form-right">
          <el-form-item :label="labelObj.planStartTime" prop="planStartTime">
            <el-date-picker
              v-model="formObj.planStartTime"
              type="datetime"
              :editable="false"
              :clearable="false"
              :picker-options="startTimePickerOption"
              :placeholder="placeholderObj.planStartTime"
              @change="changeStartTime"
            ></el-date-picker>

            <!-- <el-time-select
              v-model="startTime"
              :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30'
              }"
              placeholder="选择时间">
            </el-time-select>-->
          </el-form-item>
          <el-form-item :label="labelObj.planEndTime" prop="planEndTime">
            <el-date-picker
              v-model="formObj.planEndTime"
              type="datetime"
              :editable="false"
              :clearable="false"
              :picker-options="endTimePickerOption"
              :placeholder="placeholderObj.planEndTime"
              @change="changeEndTime"
            ></el-date-picker>
          </el-form-item>
          <el-form-item :label="labelObj.workOrderTime" prop="workOrderTime">
            <el-select v-model="formObj.workOrderTime" :placeholder="placeholderObj.workOrderTime">
              <el-option
                v-for="item in workOrderTimeOpt"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="labelObj.inspectionPeriod" prop="inspectionPeriod">
            <el-select
              v-model="formObj.inspectionPeriod"
              :placeholder="placeholderObj.inspectionPeriod"
              @change="changeInspectionPeriod"
            >
              <el-option
                v-for="item in inspectionPeriodOpt"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            v-show="formObj.inspectionPeriod === 'everyWeek' || formObj.inspectionPeriod === 'everyMonth'"
            :label="labelObj.periodDate"
            prop="dayOfWeek"
          >
            <el-select
              v-show="formObj.inspectionPeriod === 'everyWeek'"
              v-model="formObj.dayOfWeek"
              :placeholder="placeholderObj.periodDate"
            >
              <el-option
                v-for="item in dayOfWeekOpt"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select
              v-show="formObj.inspectionPeriod === 'everyMonth'"
              v-model="formObj.dayOfMonth"
              :placeholder="placeholderObj.periodDate"
            >
              <el-option
                v-for="item in dayOfMonthOpt"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item v-if="showFormBtn">
        <el-button
          type="primary"
          @click="submitForm"
          :loading="showLoading"
        >{{$t("systemSetting.save")}}</el-button>
        <el-button @click="resetForm">{{$t("systemSetting.reset")}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import "./inspection-form.less";
export default {
  name: "InspectionForm",
  props: {
    queryUnitUrl: {
      type: String,
      default: "./socialUnits/idName"
    },
    queryUrl: {
      type: String,
      default: "/auth/users"
    },
    postUrl: {
      type: String,
      default: "./patrols/plans"
    },
    initFormData: {
      type: Object,
      default: function() {
        return null;
      }
    },
    formMethod: {
      type: String,
      default: "post"
    }
  },
  watch: {
    initFormData(newVal, oldVal) {
      console.log("newVal+++++++++", newVal);
      if (!!newVal) {
        Object.keys(newVal).forEach(key => {
          if (typeof this.formObj[key] !== "undefined") {
            this.formObj[key] = newVal[key];
          }
        });
      }
    }
  },
  data() {
    var formObj = {
      socialUnit: "",
      inspectionTitle: "",
      inspectionContent: "",
      inspectionPeriod: "",
      workOrderTime: "",
      planStartTime: "",
      planEndTime: "",
      inspector: "",
      dayOfWeek: "",
      dayOfMonth: ""
    };
    const startTimeValidator = (rule, value, callback) => {
      console.log("startTimeValidator", +value, +this.formObj.planEndTime);
      if (value === "") {
        callback(new Error("请选择计划开始时间"));
      } else if (+value <= Date.now()) {
        callback(new Error("开始时间必须大于当前时间"));
      } else if (
        this.formObj.planEndTime &&
        +value >= +this.formObj.planEndTime
      ) {
        callback(new Error("开始时间必须小于结束时间"));
      } else {
        callback();
      }
    };
    const endTimeValidator = (rule, value, callback) => {
      console.log("endTimeValidator", +value, +this.formObj.planStartTime);
      if (value === "") {
        callback(new Error("请选择计划结束时间"));
      } else if (+value <= Date.now()) {
        callback(new Error("结束时间必须大于当前时间"));
      } else if (
        this.formObj.planStartTime &&
        +value <= +this.formObj.planStartTime
      ) {
        callback(new Error("结束时间必须大于开始时间"));
      } else {
        callback();
      }
    };
    var formRules = {
      socialUnit: [
        {
          required: true,
          message: "请输入社会单位",
          trigger: "blur"
        }
      ],
      inspectionTitle: [
        {
          required: true,
          message: "请输入巡检标题",
          trigger: "blur"
        }
      ],
      inspectionContent: [
        {
          required: true,
          message: "请输入巡检内容",
          trigger: "blur"
        }
      ],
      inspector: [
        {
          required: true,
          message: "请选择巡检人",
          trigger: "change"
        }
      ],
      planStartTime: [
        {
          required: true,
          // message: "请选择计划开始时间",
          validator: startTimeValidator,
          trigger: "change"
        }
      ],
      planEndTime: [
        {
          required: true,
          // message: "请选择计划结束时间",
          validator: endTimeValidator,
          trigger: "change"
        }
      ],
      workOrderTime: [
        {
          required: true,
          message: "请选择工单生成时间",
          trigger: "change"
        }
      ],
      inspectionPeriod: [
        {
          required: true,
          message: "请选择周期类型",
          trigger: "change"
        }
      ]
    };
    var labelObj = {
      socialUnit: "社会单位",
      inspectionTitle: "巡检标题",
      inspectionContent: "巡检内容",
      inspectionPeriod: "周期类型",
      workOrderTime: "生成工单时间",
      deviceName: "设备名称",
      maintenanceDesc: "维保原因",
      addAttachment: "添加附件",
      planStartTime: "计划开始时间",
      planEndTime: "计划结束时间",
      inspector: "巡检人",
      periodDate: "周期日"
    };
    var placeholderObj = {
      socialUnit: "请输入社会单位",
      inspectionTitle: "请输入巡检标题",
      inspectionContent: "请输入巡检内容",
      inspectionPeriod: "请选择周期",
      workOrderTime: "请选择生成工单时间",
      deviceName: "请输入设备名称",
      maintenanceDesc: "请输入维保原因",
      planStartTime: "请选择计划开始时间",
      planEndTime: "请选择计划结束时间",
      inspector: "请选择巡检人",
      periodDate: "请选择周期日"
    };
    var inspectionPeriodOpt = [
      {
        value: "everyday",
        label: "每天"
      },
      {
        value: "everyWeek",
        label: "每周"
      },
      {
        value: "everyMonth",
        label: "每月"
      }
    ];
    var workOrderTimeOpt = [
      {
        value: 60 * 60,
        label: "执行前1小时"
      },
      {
        value: 24 * 60 * 60,
        label: "执行前1天"
      },
      {
        value: 7 * 24 * 60 * 60,
        label: "执行前1周"
      }
    ];
    const timeArr = [...Array(48)].map((item, index) => {
      item = moment()
        .startOf("day")
        .add(30 * index, "minutes")
        .format("HH:mm");
      return item;
    });
    console.log("timeArr+++++++", timeArr);
    var startTimePickerOption = {
      firstDayOfWeek: 1,
      disabledDate(time) {
        return time.getTime() < Date.now() - 24 * 60 * 60 * 1000;
      },
      // selectableRange: timeArr,
      format: "HH:mm"
    };
    var endTimePickerOption = {
      firstDayOfWeek: 1,
      disabledDate(time) {
        return time.getTime() < Date.now() - 24 * 60 * 60 * 1000;
      },
      // selectableRange: timeArr,
      format: "HH:mm"
    };
    var dayOfWeekOpt = [...Array(7)].map((item, index) => {
      item = {
        label: "每周" + ["日", "一", "二", "三", "四", "五", "六"][index],
        value: index + 1
      };
      return item;
    });
    var dayOfMonthOpt = [...Array(30)].map((item, index) => {
      item = {
        label: "每月" + (index + 1) + "号",
        value: index + 1
      };
      return item;
    });
    return {
      // timeArr,
      labelObj,
      placeholderObj,
      formObj,
      formRules,
      inspectionPeriodOpt,
      socialUnitLoading: false,
      socialUnitList: [],
      workOrderTimeOpt,
      inspectorLoading: false,
      inspectorList: [],
      dayOfWeekOpt,
      dayOfMonthOpt,
      showFormBtn: false,
      startTimePickerOption, //结束时间的配置根据根据开始时间动态改变
      endTimePickerOption
    };
  },
  computed: {
    // endTimePickerOption() {
    //   // let startTime = this.formObj.planStartTime || new Date();
    //   // console.log("startTime++++", startTime);
    //   return {
    //     firstDayOfWeek: 1,
    //     disabledDate(time) {
    //       return time.getTime() < +new Date();
    //     },
    //     selectableRange: this.timeArr,
    //     format: "HH:mm"
    //   };
    // }
  },
  methods: {
    getSocialUnitList(query) {
      // console.log("social unit list");
      var url = this.queryUnitUrl;
      // var url = `./socialUnits/${id}/devices/idName`;
      var json = {
        keyword: query || "",
        start: 0,
        size: 10
      };
      this.$http({
        url,
        json
      }).then(response => {
        console.log("mock response", response);
        var code =
          response.data && response.data.head && response.data.head.code;
        var data = response.data && response.data.data;
        if (code === 0 && data) {
          // console.log("social unit list", data);
          this.socialUnitList = data;
        }
      });
    },
    changeInspectionPeriod(value) {
      console.log("value+++++++", value);
      if (value === "everyWeek") {
        this.formObj.dayOfWeek = 1;
      }
      if (value === "everyMonth") {
        this.formObj.dayOfMonth = 1;
      }
    },
    changeStartTime(value) {
      console.log("start time value", value);
      this.formObj.planStartTime = value.setSeconds(0);
      // 若此前选定了计划结束时间 重新校验
      if (this.formObj.planEndTime) {
        this.$refs.form.validateField("planEndTime", error => {});
      }
    },
    changeEndTime(value) {
      console.log("end time value", value);
      this.formObj.planEndTime = value.setSeconds(0);
      // 若此前选定了计划开始时间 重新校验
      if (this.formObj.planStartTime) {
        this.$refs.form.validateField("planStartTime", error => {});
      }
    },
    submitForm() {
      // console.log("formName", formName);

      this.$refs.form.validate(valid => {
        if (valid) {
          this.submitLoading = true;
          let promise = this.submitPromise();
          promise
            .then(response => {
              let code =
                response.data && response.data.head && response.data.head.code;
              // let data = response.data && response.data.data
              if (code === 0) {
                let message =
                  this.formMethod === "post"
                    ? this.$t("systemSetting.addSuccessfully")
                    : this.$t("systemSetting.updateSuccessfully");
                this.$message.success(message);
              }
              this.submitLoading = false;
            })
            .catch(err => {
              this.submitLoading = false;
            });
        }
      });
    },
    submitPromise() {
      console.log("this.formObj+++++++", this.formObj);
      let url = this.postUrl;
      // let json = {};
      let {
        planStartTime: startTime,
        planEndTime: endTime,
        inspector: executor,
        socialUnit: socialUnitId,
        workOrderTime: secondsBeforeOrder,
        inspectionTitle: title,
        inspectionContent: description,
        inspectionPeriod: cycle
      } = this.formObj;
      startTime = moment(startTime).format("YYYY-MM-DD HH:mm:ss");
      endTime = moment(endTime).format("YYYY-MM-DD HH:mm:ss");
      let json = {
        startTime,
        endTime,
        executor,
        socialUnitId,
        secondsBeforeOrder,
        title,
        description,
        cycle
      };
      if (
        this.formObj.inspectionPeriod === "everyWeek" &&
        this.formObj.dayOfWeek
      ) {
        let dayOfWeek = this.formObj.dayOfWeek;
        json.dayOfWeek = dayOfWeek;
      }
      if (
        this.formObj.inspectionPeriod === "everyMonth" &&
        this.formObj.dayOfMonth
      ) {
        let dayOfMonth = this.formObj.dayOfMonth;
        json.dayOfMonth = dayOfMonth;
      }
      console.log("inspection json", json);

      return this.$http({
        url,
        json,
        method: this.formMethod
      });
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
    getInspectorList(query) {
      this.inspectorLoading = true;
      var url = this.queryUrl;
      var json = {
        keyword: query,
        start: 0,
        size: 10
      };
      this.$http({
        url,
        json
      })
        .then(response => {
          var data = response.data.data;
          var code = response.data.head && response.data.head.code;
          if (code === 0 && data) {
            this.inspectorLoading = false;
            this.inspectorList = data;
          }
        })
        .catch(err => {
          this.inspectorLoading = false;
        });
    }
  },
  mounted() {
    this.getSocialUnitList();
    this.getInspectorList();
    if (this.initFormData) {
      Object.keys(this.initFormData).forEach(key => {
        if (typeof this.formObj[key] !== "undefined") {
          this.formObj[key] = this.initFormData[key];
        }
      });
    }
  }
};
</script>
<style lang="less" scoped >
// @import "./index.less";
.hj-inspection-form-wrapper {
  .el-select {
    width: 100%;
  }
  .form-left {
    padding: 0 1.5vh;
    border-right: 1px solid #e2e2e2;
  }
  .form-right {
    padding: 0 1.5vh;
  }
}
</style>