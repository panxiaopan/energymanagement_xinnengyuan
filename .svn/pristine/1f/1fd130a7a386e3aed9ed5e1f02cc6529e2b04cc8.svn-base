<template>
  <div class="hj-communication-setting-wrapper">
    <div class="hj-communication-setting__header">
      <el-button
        v-if="addAndUpdateDeviceAuth.auth"
        @click="click2AddDtuDevice('device')"
        type="primary"
      >添加设备</el-button>
    </div>
    <el-row class="hj-communication-setting__content">
      <el-col :span="5" class="hj-communication-setting__content__left">
        <el-tree
          ref="deviceList"
          :data="deviceList"
          :props="defaultProps"
          @node-click="handleNodeClick"
          :highlight-current="true"
          node-key="nodeKey"
          :default-expanded-keys="defaultExpandedKeys"
          :render-content="renderChildren"
        ></el-tree>
      </el-col>
      <el-col :span="19" class="hj-communication-setting__content__right">
        <el-tabs v-model="activeTabName" @tab-click="handleTabClick" type="border-card">
          <el-tab-pane :label="labelTextObj.firstTabLabel" name="basic">
            <device-form
              class="hj-communication-setting__content__form"
              v-if="deviceList.length>0"
              :form-data="deviceFormData"
              :update-url="updateDeviceUrl"
              @update-tree="updateTreeList"
              :editdevice="editdevice"
            ></device-form>
            <div v-else class="hj-communication-setting__emptyData">{{emptyDataLabel}}</div>
          </el-tab-pane>
          <el-tab-pane
            :label="labelTextObj.secondTabLabel"
            name="params"
            v-if="showParamsSetting&&paramsSetttingAuth.auth"
          >
            <div class="hj-device-params-setting-panel" v-loading="showParamsLoading">
              <div class="panel__header">
                <div class="panel__header__left">
                  <el-button type="primary" round size="small" @click="click2RefreshParams">
                    <i class="el-icon-refresh"></i>
                    {{labelTextObj.refresh}}
                  </el-button>&nbsp;
                  <em class="panel__header__left__tips">{{labelTextObj.firstTimeSettingTips}}</em>
                </div>
                <div class="panel__header__right">
                  <span>{{labelTextObj.updateTime}}:&nbsp;</span>
                  <span>{{paramsUpdateTime}}</span>
                </div>
              </div>
              <el-table
                :data="paramsList"
                stripe
                border
                style="width: 100%"
                v-loading="showLoading"
              >
                <el-table-column prop="name" :label="labelTextObj.name" min-width="100"></el-table-column>
                <el-table-column prop="alarmValue" :label="labelTextObj.alarmValue" min-width="100">
                  <template slot-scope="scope">
                    <span>{{computedAlarmValue(scope)}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="alarmDelay" :label="labelTextObj.alarmDelay" min-width="100"></el-table-column>
                <el-table-column
                  prop="alarmToutui"
                  :label="labelTextObj.alarmToutui"
                  min-width="100"
                >
                  <template slot-scope="scope">
                    <span>{{computedTouTui(scope, 'alarm')}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="earlyWarningValue"
                  :label="labelTextObj.earlyWarningValue"
                  min-width="100"
                ></el-table-column>
                <el-table-column
                  prop="earlyWarningDelay"
                  :label="labelTextObj.earlyWarningDelay"
                  min-width="100"
                ></el-table-column>
                <el-table-column
                  prop="earlyWarningToutui"
                  :label="labelTextObj.earlyWarningToutui"
                  min-width="100"
                >
                  <template slot-scope="scope">
                    <span>{{computedTouTui(scope, 'earlyWarning')}}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="labelTextObj.operation" min-width="100">
                  <template slot-scope="scope">
                    <el-button size="small" type="primary" circle @click="click2Modify(scope)">
                      <i class="el-icon-edit"></i>
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>

              <div class="panel__basic" v-loading="showBasicLoading">
                <fieldset>
                  <legend>{{labelTextObj.basicSetting}}</legend>
                  <el-form :inline="true" :model="basicSettingForm" size="small">
                    <el-form-item
                      v-for="(val, key) in basicSettingForm"
                      :key="key"
                      :label="val.label"
                    >
                      <el-select
                        v-if="val.type==='enum'"
                        v-model="val.value"
                        :placeholder="val.placeholder"
                        :disabled="disabledBasicSetting"
                        @change="changeBasicItem"
                      >
                        <el-option
                          v-for="item in val.options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item class="panel__item--fr">
                      <div v-if="!disabledBasicSetting">
                        <el-button
                          type="primary"
                          size="small"
                          round
                          @click="click2SaveBasicSetting"
                          :loading="showBasicLoading"
                        >{{labelTextObj.save}}</el-button>
                        <el-button
                          size="small"
                          round
                          @click="disabledBasicSetting=true"
                        >{{labelTextObj.cancel}}</el-button>
                      </div>
                      <div v-else>
                        <el-button
                          type="primary"
                          size="small"
                          round
                          @click="disabledBasicSetting=false"
                        >
                          <i class="el-icon-edit"></i>
                          {{labelTextObj.click2Modify}}
                        </el-button>
                      </div>
                    </el-form-item>
                  </el-form>
                </fieldset>
              </div>
              <div class="panel__advanced" v-loading="showCommLoading">
                <fieldset>
                  <legend>{{labelTextObj.commSetting}}</legend>
                  <el-form :inline="true" :model="commSettingForm" size="small">
                    <el-form-item
                      v-for="(val, key) in commSettingForm"
                      :key="key"
                      :label="val.label"
                    >
                      <el-input
                        v-if="val.type==='text'"
                        :disabled="disabledCommSetting"
                        v-model="val.value"
                        :placeholder="val.placeholder"
                      ></el-input>
                      <el-input
                        v-else
                        type="number"
                        :min="1"
                        :max="65535"
                        :disabled="true"
                        v-model="val.value"
                        :placeholder="val.placeholder"
                      ></el-input>
                    </el-form-item>

                    <el-form-item class="panel__item--fr">
                      <div v-if="!disabledCommSetting">
                        <el-button
                          type="primary"
                          size="small"
                          round
                          @click="click2SaveCommSetting"
                          :loading="showCommLoading"
                        >{{labelTextObj.save}}</el-button>
                        <el-button
                          size="small"
                          round
                          @click="disabledCommSetting=true"
                        >{{labelTextObj.cancel}}</el-button>
                      </div>
                      <div v-else>
                        <el-button
                          type="primary"
                          size="small"
                          round
                          @click="disabledCommSetting=false"
                        >
                          <i class="el-icon-edit"></i>
                          {{labelTextObj.click2Modify}}
                        </el-button>
                      </div>
                    </el-form-item>
                  </el-form>
                </fieldset>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <el-dialog
      :title="labelTextObj.addDevice"
      :visible.sync="showDeviceFormDg"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      custom-class="hj-communication-setting-device-dialog"
    >
      <device-form
        :is-add="true"
        ref="deviceForm"
        :post-url="postDeviceUrl"
        :device-type="deviceType"
      ></device-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          size="small"
          type="primary"
          @click="submitForm('deviceForm')"
          :loading="submitLoading"
        >{{$t("systemSetting.save")}}</el-button>
        <!-- <el-button @click="resetForm('deviceForm')" size="small">{{$t("systemSetting.reset")}}</el-button> -->
        <el-button @click="cancelSubmit('deviceForm')" size="small">{{$t("systemSetting.cancel")}}</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :title="computedParamsTitle"
      :visible.sync="showParamsFormDg"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
    >
      <el-row class="device-params-form">
        <el-col :span="10">
          <el-form ref="alarmForm" :model="alarmForm" size="small" :rules="alarmFormRules">
            <el-form-item v-for="(val,key) in alarmForm" :key="key" :label="val.label" :prop="key">
              <el-select
                @change="changeToutui"
                v-if="val.type==='enum'"
                v-model="val.value"
                :placeholder="val.placeholder"
              >
                <el-option
                  v-for="item in val.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-input
                v-else
                type="number"
                :min="val.min"
                :max="val.max"
                v-model="val.value"
                :placeholder="val.placeholder"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="10">
          <el-form ref="warningForm" :model="warningForm" size="small" :rules="warningFormRules">
            <el-form-item
              v-for="(val,key) in warningForm"
              :key="key"
              :label="val.label"
              :prop="key"
            >
              <el-select
                @change="changeToutui"
                v-if="val.type==='enum'"
                v-model="val.value"
                :placeholder="val.placeholder"
              >
                <el-option
                  v-for="item in val.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-input
                v-else
                type="number"
                :min="val.min"
                :max="val.max"
                v-model="val.value"
                :placeholder="val.placeholder"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="click2Cancel" size="small">{{labelTextObj.cancel}}</el-button>
        <el-button type="primary" @click="click2UpdateParams" size="small">{{labelTextObj.ok}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import DeviceForm from "./device-form";
import getDeviceFormData from "./getDeviceFormData.js";
import md5 from "md5";
export default {
  name: "CommunicationSetting",
  components: {
    DeviceForm
  },
  props: {
    unitId: {
      type: [Number, String],
      default: NaN
    }
    // postDeviceUrl: {
    //   type: String,
    //   default: 'socialUnits/{id}/devices'
    // }
  },
  data() {
    var labelTextObj = {
      addDevice: this.$t("systemSetting.addDevice"),
      firstTabLabel: this.$t("systemSetting.basicSetting"),
      secondTabLabel: this.$t("systemSetting.paramsSetting"),
      ok: this.$t("systemSetting.ok"),
      cancel: this.$t("systemSetting.cancel"),
      //参数列表
      refresh: "刷新",
      updateTime: "更新时间",
      name: "参数名",
      alarmValue: "报警值",
      alarmDelay: "报警延时(s)",
      alarmToutui: "报警投退",
      earlyWarningValue: "预警比",
      earlyWarningDelay: "预警延时(s)",
      earlyWarningToutui: "预警投退",
      operation: "操作",
      modifyParams: "修改参数",
      basicSetting: "基本设置",
      commSetting: "通信设置",
      // serverAddr: "服务器地址",
      // serverPort: "服务器端口",

      lock: "锁定",
      unlock: "只读",
      save: "保存",
      click2Modify: "点击修改",
      firstTimeSettingTips:
        "注：第一次设置参数时，需点击刷新按钮，初始化各项参数值"
    };
    var formObj = {};
    var formObjRules = {};
    const placeholderObj = {
      ratedVoltage: "请选择电压额定值",
      specification: "请选择电流互感器规格",
      wiringMode: "请选择接线方式",
      serverAddr: "请输入服务器地址",
      serverPort: "请输入服务器端口",

      alarmToutui: "请选择报警投退",
      earlyWarningToutui: "请选择预警投退",
      alarmValue: "请输入报警值",
      alarmDelay: "请输入报警延时",
      earlyWarningValue: "请输入预警值",
      earlyWarningDelay: "请输入预警延时"
    };
    var basicSettingForm = {
      ratedVoltage: {
        label: "电压额定值",
        value: "",
        type: "enum",
        placeholder: "请选择电压额定值",
        options: []
      },
      specification: {
        label: "电流互感器规格",
        value: "",
        type: "enum",
        placeholder: "请选择电流互感器规格",
        options: []
      },
      wiringMode: {
        label: "接线方式",
        value: "",
        type: "enum",
        placeholder: "请选择接线方式",
        options: []
      }
    };

    var commSettingForm = {
      serverAddr: {
        value: "",
        label: "服务器地址",
        type: "text",
        placeholder: "请输入服务器地址"
      },
      serverPort: {
        value: "",
        label: "服务器端口",
        type: "number",
        placeholder: "请输入服务器端口"
      }
    };
    var alarmForm = {
      alarmValue: {
        value: "",
        label: "报警值",
        type: "number",
        placeholder: "请输入报警值"
      },
      alarmDelay: {
        value: "",
        label: "报警延时(s)",
        type: "number",
        placeholder: "请输入报警延时"
      },
      alarmToutui: {
        value: "",
        label: "报警投退",
        type: "enum",
        placeholder: "请输入报警投退",
        options: []
      }
    };
    // var alarmFormRules = {
    //   alarmValue: [{
    //     validator: alarmValueValidator,
    //     trigger: 'blur'
    //   }],
    //   alarmDelay: [{
    //     validator: alarmDelayValidator,
    //     trigger: 'blur'
    //   }],
    //   alarmTouTui: [{
    //     validator: alarmTouTuiValidator,
    //     trigger: 'blur'
    //   }]
    // }
    var warningForm = {
      earlyWarningValue: {
        value: "",
        label: "预警比",
        type: "number",
        placeholder: "请输入预警比"
      },
      earlyWarningDelay: {
        value: "",
        label: "预警延时(s)",
        type: "number",
        placeholder: "请输入预警延时"
      },
      earlyWarningToutui: {
        value: "",
        label: "预警投退",
        type: "enum",
        placeholder: "请输入预警投退",
        options: []
      }
    };
    // var warningFormRules = {
    //   earlyWarningValue: [{
    //     validator: warningValueValidator,
    //     trigger: 'blur'
    //   }],
    //   earlyWarningDelay: [{
    //     validator: warningDelayValidator,
    //     trigger: 'blur'
    //   }],
    //   earlyWarningToutui: [{
    //     validator: warningTouTuiValidator,
    //     trigger: 'blur'
    //   }]
    // }
    var warningKeyNameMap = new Map([
      ["value", "报警值"],
      ["delay", "报警延时"],
      ["toutui", "报警投退"]
    ]);
    var prewarningKeyNameMap = new Map([
      ["value", "预警比"],
      ["delay", "预警延时"],
      ["toutui", "预警投退"]
    ]);
    return {
      editdevice: true, //编辑的时候
      deviceType: "", //接收设备类型
      formObj,
      labelTextObj,
      placeholderObj,
      deviceList: [],
      defaultProps: {
        children: "subNodes",
        label: "name"
      },
      basicSettingForm,
      commSettingForm,
      disabledCommSetting: true,
      disabledBasicSetting: true,
      alarmForm,
      warningForm,
      deviceId: "",
      defaultExpandedKeys: [1],
      deviceFormData: {},
      emptyDataLabel: this.$t("common.emptyData"),

      showDeviceFormDg: false,
      showParamsFormDg: false,
      submitLoading: false,
      activeTabName: "basic",
      paramsList: [
        // {
        //   name: "IR剩余电流",
        //   alarmValue: "20mA",
        //   alarmDelay: "5s",
        //   alarmToutui: "报警",
        //   earlyWarningValue: "18mA",
        //   earlyWarningDelay: "5s",
        //   earlyWarningToutui: "报警出口DO1"
        // }
      ],
      showLoading: false,
      paramsUpdateTime: "无",
      // selectedParamsName: "",
      selectedParamsItem: null,
      showBasicLoading: false,
      showCommLoading: false,
      paramsIdOptsMap: null,
      showParamsLoading: false,
      warningKeyNameMap,
      prewarningKeyNameMap,
      initData: null,
      showParamsSetting: false
    };
  },

  computed: {
    paramsSetttingAuth() {
      return this.$store.state.hjSystemAuthObj.paramsSetttingAuth;
    },
    computedParamsTitle() {
      let paramsName =
        (this.selectedParamsItem && this.selectedParamsItem.name) || "";
      return `${this.labelTextObj.modifyParams}-${paramsName}`;
    },
    addDtuDeviceTitle() {
      return this.addFormType === "dtu"
        ? this.$t("systemSetting.addDtu")
        : this.$t("systemSetting.addDevice");
    },
    password() {
      return this.$store.state.login.userInfo.password;
    },
    addAndUpdateDeviceAuth() {
      return this.$store.state.hjSystemAuthObj.addAndUpdateDeviceAuth;
    },
    deleteDeviceAuth() {
      return this.$store.state.hjSystemAuthObj.deleteDeviceAuth;
    },
    queryUrl() {
      return `./socialUnits/${this.unitId}/devices/tree/config`;
    },
    postDeviceUrl() {
      return `./socialUnits/${this.unitId}/devices`;
    },
    updateDeviceUrl() {
      return `./socialUnits/${this.unitId}/devices/${this.deviceId}`;
    },
    queryParamsUrl() {
      return `./socialUnits/${this.unitId}/devices/${this.deviceId}/paramSettings`;
    },
    queryParamsCfgUrl() {
      return `./socialUnits/${this.unitId}/devices/${this.deviceId}/controlConfigFile`;
    },
    alarmFormRules() {
      let rules = {};

      Object.keys(this.alarmForm).forEach(key => {
        let validator = (rule, item, callback) => {
          if (item.value === "") {
            callback();
          }
          if (
            typeof item.max !== "undefined" &&
            typeof item.min !== "undefined"
          ) {
            if (Math.round(+item.value * 100) < item.min * 100) {
              callback(new Error("输入数值过小"));
            } else if (Math.round(+item.value * 100) > item.max * 100) {
              callback(new Error("输入数值过大"));
            } else {
              callback();
            }
          } else {
            callback();
          }
        };
        rules[key] = [
          {
            validator,
            trigger: "blur"
          }
        ];
      });
      console.log("alarm rules+++++++++++++++", rules);
      return rules;
    },
    warningFormRules() {
      let rules = {};
      Object.keys(this.warningForm).forEach(key => {
        let validator = (rule, item, callback) => {
          if (item.value === "") {
            callback();
          }
          if (
            typeof item.max !== "undefined" &&
            typeof item.min !== "undefined"
          ) {
            console.log("warning Item++++", item);
            if (Math.round(+item.value * 100) < +item.min * 100) {
              callback(new Error("输入数值过小"));
            } else if (Math.round(+item.value * 100) > +item.max * 100) {
              callback(new Error("输入数值过大"));
            } else {
              callback();
            }
          } else {
            callback();
          }
        };
        rules[key] = [
          {
            validator,
            trigger: "blur"
          }
        ];
      });
      console.log("warning rules+++++++++++++++", rules);
      return rules;
    }
  },
  methods: {
    handleTabClick(tab) {
      // console.log("click tab", this.activeTabName);
      // this.queryParamsConfig(); //查询设备参数配置
    },
    click2RefreshParams() {
      console.log("click 2 update");
      let url = this.queryParamsUrl;
      this.showParamsLoading = true;
      this.$http({
        url,
        timeout: 30 * 1000,
        method: "put"
      })
        .then(response => {
          // 服务器读取硬件数据到缓存表后，再次请求所有参数的初始值
          console.log("refresh response", response);
          this.showParamsLoading = false;
          let code = response.data.head && response.data.head.code;
          if (code === 0) {
            this.paramsUpdateTime = moment().format("YYYY-MM-DD HH:mm:ss");
            this.queryParamsValue();
          }
        })
        .catch(err => {
          console.error("timeout+++++++", err);
          let message = "请求超时，请重试或联系系统管理员";
          this.$message.error(message);
          this.showParamsLoading = false;
        });
    },
    click2Modify(scope) {
      console.log("click 2 modify", scope);
      this.showParamsFormDg = true;
      // this.selectedParamsName = scope.row.name || "";
      this.selectedParamsItem = scope.row;
      let { warning, prewarning } = scope.row;
      this.alarmForm = {};
      this.warningForm = {};
      Object.keys(warning).forEach(key => {
        let label = this.warningKeyNameMap.get(key);
        // 过压保护 欠压保护的label为报警比
        if (
          key === "value" &&
          (scope.row.ident === "overvoltageprotect" ||
            scope.row.ident === "undervoltageprotect")
        ) {
          label = "报警比";
        }
        let unit = warning[key].unit || "";
        let type = warning[key].type || "";
        let valueKey =
          "alarm" + key.toLocaleUpperCase().slice(0, 1) + key.slice(1);
        // 投退key有两个大写字母 直接赋值
        // if (key === "toutui") {
        //   valueKey = "alarmTouTui";
        // }
        let value = scope.row[valueKey];
        let placeholder = (type === "enum" ? "请选择" : "请输入") + label;
        let { min, max } = warning[key];
        this.alarmForm[valueKey] = {
          value,
          label: unit ? `${label}(${unit})` : label,
          type,
          placeholder
        };
        if (typeof min !== "undefined" && typeof max !== "undefined") {
          placeholder = `${placeholder}(${min}~${max})`;
          Object.assign(this.alarmForm[valueKey], { placeholder, min, max });
        }

        if (type === "enum") {
          let options = warning[key].values || [];
          Object.assign(this.alarmForm[valueKey], { options });
        }
      });
      console.log("this.alarmForm+++++++++", this.alarmForm);
      // 部分参数没有预警设置
      if (prewarning) {
        Object.keys(prewarning).forEach(key => {
          let label = this.prewarningKeyNameMap.get(key);
          let unit = prewarning[key].unit || "";
          let type = prewarning[key].type;
          let valueKey =
            "earlyWarning" + key.toLocaleUpperCase().slice(0, 1) + key.slice(1);
          // 投退key有两个大写字母 直接赋值
          // if (key === "toutui") {
          //   valueKey = "earlyWarningTouTui";
          // }
          let value = scope.row[valueKey];
          let placeholder = (type === "enum" ? "请选择" : "请输入") + label;
          let { min, max } = prewarning[key];
          this.warningForm[valueKey] = {
            value,
            label: unit ? `${label}(${unit})` : label,
            type,
            placeholder
          };
          if (typeof min !== "undefined" && typeof max !== "undefined") {
            placeholder = `${placeholder}(${min}~${max})`;
            Object.assign(this.warningForm[valueKey], {
              placeholder,
              min,
              max
            });
          }

          if (type === "enum") {
            let options = prewarning[key].values || [];
            Object.assign(this.warningForm[valueKey], { options });
          }
        });
      }
      console.log("this.warningForm+++++++++", this.warningForm);
    },
    changeBasicItem(value) {
      console.log("value basic item++++", value);
      console.log("this.basicSettingForm", this.basicSettingForm);
      // 嵌套的select组件的change事件无法响应数据变化
      this.basicSettingForm = { ...this.basicSettingForm };
    },
    changeToutui(value) {
      console.log("value toutui+++++++++++", value);

      this.alarmForm = { ...this.alarmForm };
      this.warningForm = { ...this.warningForm };
    },
    handleNodeClick(node) {
      console.log("点击当前设备=========");
      console.log(node.data);
      let newvalue = JSON.parse(node.data);
      console.log(newvalue.deviceClassId);
      if (newvalue.deviceClassId !== "ELECTRICAL_FIRE_MONITORING_DETECTOR") {
        this.editdevice = false;
      } else {
        this.editdevice = true;
      }
      var hasChange = false;

      this.currentNode = node;
      this.getFormDataByNode(node);

      // if (this.activeTabName === "params") {
      if (this.paramsSetttingAuth.auth) {
        this.queryParamsConfig();
      }

      // }
    },
    click2UpdateParams() {
      console.log("click 2 update params");

      let url = this.queryParamsUrl;
      let { ident } = this.selectedParamsItem;
      url = `${url}/${ident}`;
      let json = {};
      Object.keys(this.alarmForm).forEach(key => {
        // let dataKey = key.toLocaleUpperCase().slice(0, 1) + key.slice(1);
        // if (key === "toutui") {
        //   dataKey = "TouTui";
        // }
        // json["alarm" + dataKey] = this.alarmForm[key].value;
        json[key] = this.alarmForm[key].value;
      });
      Object.keys(this.warningForm).forEach(key => {
        // let dataKey = key.toLocaleUpperCase().slice(0, 1) + key.slice(1);
        // if (key === "toutui") {
        //   dataKey = "TouTui";
        // }
        // json["earlyWarning" + dataKey] = this.warningForm[key].value;
        json[key] = this.warningForm[key].value;
      });

      console.log(
        "params list json++++++++++++",
        json,
        this.warningForm,
        this.alarmForm
      );
      let hasValue = false;
      hasValue = Object.keys(json).some(key => {
        return json[key] !== "";
      });
      if (!hasValue) {
        let noDataMsg = "设置项不能都为空";
        this.$message.error(noDataMsg);
        return;
      }
      this.$refs["alarmForm"].validate(valid => {
        if (valid) {
          this.$refs["warningForm"].validate(valid => {
            if (valid) {
              this.showParamsFormDg = false;
              this.showLoading = true;
              this.$http({
                url,
                json,
                method: "put"
              }).then(response => {
                this.showLoading = false;
                // 手动更新列表数据
                Object.keys(json).forEach(key => {
                  this.selectedParamsItem[key] = json[key];
                });
              });
            }
          });
        }
      });
    },
    click2Cancel() {
      this.showParamsFormDg = false;
      if (this.$refs["alarmForm"]) {
        this.$refs["alarmForm"].resetFields();
      }
      if (this.$refs["warningForm"]) {
        this.$refs["warningForm"].resetFields();
      }
    },
    click2SaveBasicSetting() {
      console.log("click 2 save basic setting");
      this.showBasicLoading = true;
      // setTimeout(() => {
      //   this.showBasicLoading = false;
      //   this.disabledBasicSetting = true;
      // }, 2000);
      // let url = this.queryParamsUrl;
      let promises = this.initData
        .filter(item => {
          // let currentVal =
          //   (this.basicSettingForm[item.ident] &&
          //     this.basicSettingForm[item.ident].value) ||
          //   "";
          return (
            (item.identType || item.paramType) === "basicSetting"
            // item.data != currentVal
          );
        })
        .map(item => {
          let url = `${this.queryParamsUrl}/${item.ident}`;
          // let json = { ...item };
          // delete json.deviceId;
          // delete json.paramType || json.identType;
          // delete json.ident;
          let currentVal = this.basicSettingForm[item.ident].value;
          let json = { data: currentVal };
          return this.$http({
            url,
            json,
            method: "put"
          });
        });
      console.log(
        "promises+++++",
        promises,
        this.initData,
        this.basicSettingForm
      );
      Promise.all(promises)
        .then(response => {
          console.log("Promise all response", response);
          this.showBasicLoading = false;
          this.disabledBasicSetting = true;
        })
        .catch(err => {
          this.showBasicLoading = false;
          console.error("Promise all error", err);
        });
    },
    click2SaveCommSetting() {
      console.log("click 2 save comm. setting");
      this.showCommLoading = true;
      // setTimeout(() => {
      //   this.disabledCommSetting = true;
      //   this.showCommLoading = false;
      // }, 2000);
      // let url = this.queryParamsUrl;
      let promises = this.initData
        .filter(item => {
          let currentVal =
            (this.commSettingForm[item.ident] &&
              this.commSettingForm[item.ident].value) ||
            "";
          return (
            (item.identType || item.paramType) === "commSetting"
            // &&
            // item.data != currentVal
          );
        })
        .map(item => {
          let url = `${this.queryParamsUrl}/${item.ident}`;
          // let json = { ...item };
          // delete json.deviceId;
          // delete json.paramType || json.identType;
          // delete json.ident;
          let currentVal = this.commSettingForm[item.ident].value;
          let json = { data: currentVal };
          return this.$http({
            url,
            json,
            method: "put"
          });
        });
      console.log(
        "promises+++++",
        promises,
        this.initData,
        this.commSettingForm
      );
      Promise.all(promises)
        .then(response => {
          console.log("Promise all response", response);
          this.showCommLoading = false;
          this.disabledCommSetting = true;
        })
        .catch(err => {
          this.showCommLoading = false;
          console.error("Promise all error", err);
        });
    },
    getFormDataByNode(node) {
      console.log("node data++++++++", node);
      let { name: deviceName, id: deviceId, data } = node;
      this.deviceId = deviceId;
      try {
        data = JSON.parse(data);
      } catch (err) {
        console.error("JSON parse device node data error");
      }
      console.log("JSON parse data++++++", data);
      let {
        dtuTag,
        deviceClassId,
        deviceBandId: deviceBrandId,
        deviceTypeId,
        location,
        commId,
        mainCircuitCurrent
      } = data;
      deviceClassId =
        (deviceClassId && deviceClassId.toLocaleUpperCase()) || "";
      // this.deviceType = deviceClassId;
      let deviceTreeId = [deviceClassId, deviceBrandId, deviceTypeId];
      this.deviceFormData = {
        dtuTag,
        deviceName,
        location,
        commId,
        mainCircuitCurrent,
        deviceTreeId
      };

      // 查询当前设备是否支持参数设置功能 并初始化参数值
      if (this.paramsSetttingAuth.auth) {
        this.queryParamsConfig();
      }
    },
    click2AddDtuDevice(formType) {
      //添加设备
      // this.addFormType = formType;
      // this.showAddDtuDevice = true;
      this.showDeviceFormDg = true;
    },

    handleRemove(node, store, data) {
      let deviceId = node.data.id;
      let url = `./socialUnits/${this.unitId}/devices/${deviceId}`;
      let message = this.$t("systemSetting.removeDeviceSuccessfully");
      this.$confirm(
        this.$t("common.unrecoverableDeviceTips"),
        this.$t("common.warning2"),
        {
          confirmButtonText: this.$t("systemSetting.ok"),
          cancelButtonText: this.$t("systemSetting.cancel"),
          type: "warning"
        }
      )
        .then(() => {
          this.$prompt(
            this.$t("common.inputPasswordTips"),
            this.$t("systemSetting.password"),
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
              this.$http({
                url,
                json: { password: md5(value) },
                method: "delete"
              }).then(response => {
                var code =
                  response.data &&
                  response.data.head &&
                  response.data.head.code;
                if (+code === 0) {
                  this.$message.success(message);
                  this.queryDataList();
                  // let newDtuDeviceList = this.deviceList;
                  // if (typeof deviceId !== "undefined") {
                  //   newDtuDeviceList.forEach(item => {
                  //     if (
                  //       typeof item.subNodes !== "undefined" &&
                  //       item.subNodes.length > 0
                  //     ) {
                  //       item.subNodes = item.subNodes.filter(subNode => {
                  //         return subNode.id !== deviceId;
                  //       });
                  //     }
                  //   });
                  // } else {
                  //   // newDtuDeviceList = newDtuDeviceList.filter(item => {
                  //   //   return item.id !== dtuId;
                  //   // });
                  // }
                  // this.updateTreeList([...newDtuDeviceList]);
                }
              });
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    renderChildren(h, { node, data, store }) {
      console.log("node", node, data);
      var nodeType = data.nodeType;
      if (this.deleteDeviceAuth.auth) {
        return (
          <div class="hj-custom-tree-node">
            <span>{node.label}</span>
            <el-button
              class="renderChildren"
              size="mini"
              circle
              on-click={e => {
                e.stopPropagation();
                this.handleRemove(node, store, data);
              }}
            >
              <i class="el-icon-delete" />
            </el-button>
          </div>
        );
      }
      return (
        <div class="hj-custom-tree-node">
          <span>{node.label}</span>
        </div>
      );

      // default:
      //   return (
      //     <div class="hj-custom-tree-node">
      //       <span>{node.label}</span>
      //     </div>
      //   );
      // }
    },
    queryDataList() {
      var url = this.queryUrl;
      this.$http({
        url
      }).then(response => {
        console.log("数据--------设备--");
        console.log(response);
        let onetitle = JSON.parse(response.data.data.rows[0].data);
        console.log(onetitle.deviceClassId);
        if (onetitle.deviceClassId !== "ELECTRICAL_FIRE_MONITORING_DETECTOR") {
          this.editdevice = false;
        } else {
          this.editdevice = true;
        }
        let code =
          response.data && response.data.head && response.data.head.code;
        let data = response.data && response.data.data;
        if (code === 0 && data) {
          // console.log("device list response", data);
          let nodeKey = 1;
          this.deviceList = data.rows.map(item => {
            item.nodeKey = nodeKey;
            nodeKey++;
            if (item.subNodes.length > 0) {
              item.subNodes = item.subNodes.map(subItem => {
                subItem.nodeKey = nodeKey;
                nodeKey++;
                return subItem;
              });
            }
            return item;
          });
          // 树形组件render后下一个执行周期才能获取到node的数据
          this.$nextTick(() => {
            let currentNode =
              this.$refs.deviceList.getNode(1) &&
              this.$refs.deviceList.getNode(1).data;
            if (!!currentNode) {
              this.$refs.deviceList.setCurrentNode(currentNode);
              this.currentNode = currentNode;
              this.getFormDataByNode(currentNode);
            }
          });
        }
      });
    },
    submitForm(formName) {
      let deviceFormIns = this.$refs[formName];
      let formObj = deviceFormIns.formObj;

      deviceFormIns.$refs["formObj"].validate(valid => {
        if (valid) {
          this.submitLoading = true;
          // let url = this.isAdd ? this.postDeviceUrl : this.updateUrl;
          // let formObj = deviceFormIns.formObj;
          let message = this.$t("systemSetting.addSuccessfully");
          let url = this.postDeviceUrl; // 添加设备
          let json = {};
          Object.keys(formObj).forEach(key => {
            if (key === "deviceTreeId") {
              let idArr = formObj[key].value;
              json["deviceClassId"] = idArr[0] || "";
              json["deviceBrandId"] = idArr[1] || "";
              json["deviceTypeId"] = idArr[2] || "";
              return;
            }
            if (!!formObj[key].show) {
              json[key] = formObj[key].value;
            }
          });
          this.$http({
            url,
            json,
            method: "post"
          })
            .then(response => {
              let code =
                response.data && response.data.head && response.data.head.code;
              // let data = response.data && response.data.data;
              if (code === 0) {
                this.showDeviceFormDg = false;
                this.$message.success(message);
                this.queryDataList(); //刷新设备配置列表
              }
              this.submitLoading = false;
            })
            .catch(err => {
              this.submitLoading = false;
            });
        }
      });
    },
    updateTreeList() {
      this.queryDataList();
    },
    resetForm(formName) {
      let deviceFormIns = this.$refs[formName];
      let lang = window.localStorage.hjLanguage || "zh";
      let { formObj } = getDeviceFormData(lang);
      formObj["registCode"].show = true; //设置注册码可见
      deviceFormIns.formObj = formObj;
      deviceFormIns.$refs["formObj"].resetFields();
    },
    cancelSubmit(formName) {
      let deviceFormIns = this.$refs[formName];
      let lang = window.localStorage.hjLanguage || "zh";
      let { formObj } = getDeviceFormData(lang);
      formObj["registCode"].show = true; //设置注册码可见
      deviceFormIns.formObj = formObj;
      deviceFormIns.$refs["formObj"].resetFields();
      this.showDeviceFormDg = false;
    },
    computedAlarmValue(scope) {
      let value = scope.row.alarmValue;
      let unit =
        (scope.row.warning &&
          scope.row.warning.value &&
          scope.row.warning.value.unit) ||
        "";
      if (value !== "" && unit) {
        value = `${value} ${unit}`;
      }
      return value;
    },
    computedTouTui(scope, name) {
      console.log("scope+++", scope);
      // return scope.row.name;
      let value = scope.row[scope.column.property];
      let result = "";
      if (scope.row[name + "Opts"]) {
        result = scope.row[name + "Opts"].filter(item => {
          return +item.value === +value;
        });
      }

      return (result && result[0] && result[0].label) || "";
    },
    queryParamsConfig() {
      this.showParamsLoading = true;
      let url = this.queryParamsCfgUrl;
      this.$http({
        url
      }).then(response => {
        let code = response.data.head && response.data.head.code;
        let data = response.data.data;
        if (code === 0 && data && data.length > 0) {
          console.log("params config json+++++", data);

          let parseData, settingCfg;
          try {
            parseData = JSON.parse(data);
          } catch (error) {
            console.error("JSON parse error", error);
          }
          console.log("parseData", parseData);
          if (parseData) {
            this.showParamsSetting = true;
            settingCfg =
              parseData.controlAndSettings &&
              parseData.controlAndSettings.settings;
            let { basicSetting, commSetting, fireSetting } = settingCfg;

            // --参数列表 构建参数-下拉项的map 便于后续渲染设置面板
            let map = new Map();
            let initParamsList = []; //初始参数列表--没有初始值
            fireSetting.forEach(item => {
              let key = item.ident;
              // let unit =
              //   (item.warning &&
              //     item.warning.value &&
              //     item.warning.value.unit) ||
              //   "";
              let alarmOpts =
                (item.warning &&
                  item.warning.toutui &&
                  item.warning.toutui.values) ||
                [];
              alarmOpts = alarmOpts.map(item => {
                item.label = item.desc[window.localStorage.hjLanguage || "zh"];
                return item;
              });
              let earlyWarningOpts =
                (item.prewarning &&
                  item.prewarning.toutui &&
                  item.prewarning.toutui.values) ||
                [];
              earlyWarningOpts = earlyWarningOpts.map(item => {
                item.label = item.desc[window.localStorage.hjLanguage || "zh"];
                return item;
              });
              let value = {
                ...item,
                alarmOpts,
                earlyWarningOpts
              };
              map.set(key, value);
              initParamsList.push({
                alarmValue: "",
                alarmDelay: "",
                alarmToutui: "",
                earlyWarningValue: "",
                earlyWarningDelay: "",
                earlyWarningToutui: "",
                ...value
              });
            });
            this.paramsIdOptsMap = map;
            this.paramsList = initParamsList;

            // --基本设置
            this.basicSettingForm = {};
            basicSetting.forEach(item => {
              this.basicSettingForm[item.ident] = {
                label: item.unit ? `${item.name}(${item.unit})` : item.name,
                value: "",
                type: item.type,
                placeholder:
                  (item.type === "enum" ? "请选择" : "请输入") + item.name
              };
              if (item.type === "enum") {
                let options = item.values.map(opt => {
                  opt.label = opt.desc[window.localStorage.hjLanguage || "zh"];
                  return opt;
                });
                // this.$set(this.basicSettingForm[item.ident], "options", options);
                Object.assign(this.basicSettingForm[item.ident], {
                  options
                });
              }
            });
            console.log("this.basicSettingForm++++++", this.basicSettingForm);
            // --通信设置
            this.commSettingForm = {};
            commSetting.forEach(item => {
              let placeholder =
                (item.type === "enum" ? "请选择" : "请输入") + item.name;
              if (item.ident === "serverport") {
                placeholder = `${placeholder}(${item.value.min}~${item.value.max})`;
              }
              this.commSettingForm[item.ident] = {
                label: item.unit ? `${item.name}(${item.unit})` : item.name,
                value: "",
                type: item.type,
                placeholder
              };
              if (item.type === "enum") {
                let options = item.values.map(opt => {
                  opt.label = opt.desc[window.localStorage.hjLanguage || "zh"];
                  return opt;
                });
                Object.assign(this.commSettingForm[item.ident], {
                  options
                });
              }
            });
          }
          this.queryParamsValue(); //初始化各项参数值
        } else {
          this.showParamsSetting = false;
          this.activeTabName = "basic";
        }
      });
    },
    queryParamsValue() {
      let url = this.queryParamsUrl;
      this.$http({
        url
      }).then(response => {
        let code = response.data.head && response.data.head.code;
        let data = response.data.data;
        this.showParamsLoading = false;
        if (code === 0 && data.length > 0) {
          console.log("params data+++++", data);
          this.initData = data;
          let paramsList = data
            .filter(item => {
              return (item.identType || item.paramType) === "fireSetting";
            })
            .map(item => {
              let key = item.ident;
              let value = this.paramsIdOptsMap.get(key);
              item = {
                ...value,
                ...item
              };
              return item;
            });
          console.log("paramsList+++init value", paramsList, this.paramsList);
          this.paramsList = this.paramsList.map(item => {
            let key = item.ident;
            paramsList.forEach(data => {
              if (key === data.ident) {
                //
                // let value = {};
                Object.assign(item, data);
                // item = { ...value };
                // return data;
              }
              // return data;
            });
            return item;
          });
          // 基本设置赋值
          data
            .filter(item => {
              return (item.identType || item.paramType) === "basicSetting";
            })
            .forEach(item => {
              if (this.basicSettingForm[item.ident]) {
                this.basicSettingForm[item.ident].value = item.data;
              }
            });
          // 通信设置赋值
          data
            .filter(item => {
              return (item.identType || item.paramType) === "commSetting";
            })
            .forEach(item => {
              if (this.commSettingForm[item.ident]) {
                this.commSettingForm[item.ident].value = item.data;
              }
            });
        }
      });
    }
  },
  mounted() {
    // this.queryParamsConfig();
  }
};
</script>