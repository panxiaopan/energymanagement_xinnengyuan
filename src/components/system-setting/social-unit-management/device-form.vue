
<template>
  <div class="hj-device-form-wrapper">
    <el-form
      ref="formObj"
      v-if="formObj"
      :model="formObj"
      :rules="formObjRules"
      :label-width="labelWidth"
      size="small"
    >
      <!-- {{editdevice}} -->
      <el-form-item
        v-show="formObj[key].show  "
        v-for="(val, key) in formObj"
        :key="key"
        :label="formObj[key].label"
        :prop="formObj[key].name"
      >
        <el-input
          v-if="formObj[key].formType==='string'"
          v-model="formObj[key].value"
          :placeholder="formObj[key].placeholder"
        ></el-input>
        <el-input
          v-if="formObj[key].formType==='number'"
          :min="0"
          v-model="formObj[key].value"
          :placeholder="formObj[key].placeholder"
          type="number"
        ></el-input>
        <el-cascader
          v-if="formObj[key].formType==='cascader'"
          expand-trigger="hover"
          :options="cascaderOptions"
          v-model="formObj[key].value"
          @change="handleCascaderChange"
        ></el-cascader>
        <el-date-picker v-if="formObj[key].formType==='datePicker'" v-model="formObj[key].value"></el-date-picker>
        <el-select
          v-if="formObj[key].formType==='select' "
          filterable
          v-model="formObj[key].value"
          v-show="electric_count"
        >
          <el-option
            v-for="ops in selectOptions[key]"
            :key="ops.id"
            :label="ops.name"
            :value="ops.id"
          ></el-option>
        </el-select>
        <el-select
          v-if="formObj[key].formType==='multiSelect'"
          v-model="formObj[key].value"
          multiple
          :placeholder="formObj[key].placeholder"
        >
          <el-option
            v-for="ops in selectOptions[key]"
            :key="ops.id"
            :label="ops.name"
            :value="ops.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item v-if="!isAdd" class="hj-row-center-layout">
        <el-button
          type="primary"
          @click="submitForm('formObj')"
          :disabled="disabledSubmit"
          :loading="submitLoading"
        >{{$t("systemSetting.save")}}</el-button>
        <el-button @click="resetForm('formObj')">{{$t("systemSetting.reset")}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import getDeviceFormData from "./getDeviceFormData.js";
export default {
  name: "DeviceForm",
  props: {
    editdevice: {
      type: Boolean,
      default: true
    },
    formData: {
      type: Object,
      default: function() {
        return {};
      }
    },
    //是否是添加模式 否则为修改模式update 默认修改模式
    isAdd: {
      type: Boolean,
      default: false
    },
    queryDeviceTreeUrl: {
      type: String,
      default: "./common/deviceBrandModelTree"
    },
    postUrl: {
      type: String,
      default: "./socialUnits/{id}/devices"
    },
    updateUrl: {
      type: String,
      default: "./socialUnits/{id}/devices/{deviceId}"
    },
    queryMainCircuitCurrentUrl: {
      type: String,
      default: "./common/mainCircuitCurrents"
    }
  },
  watch: {
    formData(newVal, oldVal) {
      console.log("newVal++++, formData", newVal);

      Object.keys(newVal).forEach(key => {
        if (key === "dtuTag") {
          this.$set(this.formObj["registCode"], "value", newVal[key]);
        }
        if (typeof this.formObj[key] !== "undefined") {
          this.$set(this.formObj[key], "value", newVal[key]);
        }
      });
    },
    // isAdd(newVal, oldVal) {
    //   this.$set(this.formObj["registCode"], "show", newVal);
    // }
    editdevice(value) {
      // consle.log("变量赋值过来");
      console.log("bianliang");
      console.log(value);
      if (value == false) {
        this.formObj["mainCircuitCurrent"].show = false;
        // this.formObj["mainCircuitCurrent"].value = "1";
        this.formObj["commId"].show = false;
      } else {
        this.formObj["mainCircuitCurrent"].show = true;
        this.formObj["commId"].show = true;
      }
    }
  },
  data() {
    const lang = window.localStorage.hjLanguage || "zh";
    var {
      formObj,
      formObjRules,
      formObjKey,
      submitFormKey
    } = getDeviceFormData(lang);
    // if (!this.isAdd) {
    // formObj["registCode"].show = this.isAdd;
    // }
    return {
      formObj,
      formObjRules,
      formObjKey,
      submitFormKey,
      labelWidth: "150px",
      cascaderOptions: [],
      selectOptions: {
        mainCircuitCurrent: []
      },
      disabledSubmit: false,
      submitLoading: false,
      electric_count: true //选中智能开关的时候关闭电流
      // newFom
    };
  },
  methods: {
    handleCascaderChange(value) {
      console.log("cascader value", value);
      console.log("=====选项卡=====");
      console.log(value);
      if (value[0] !== "ELECTRICAL_FIRE_MONITORING_DETECTOR") {
        // this.electric_count = false;
        this.formObj["mainCircuitCurrent"].show = false;
        this.formObj["mainCircuitCurrent"].value = 1;
        this.formObj["commId"].show = false;
      } else {
        this.formObj["mainCircuitCurrent"].show = true;
        this.formObj["commId"].show = true;
      }
    },
    queryDeviceTreeList() {
      var url = this.queryDeviceTreeUrl;
      this.$http({
        url
      }).then(response => {
        let code =
          response.data && response.data.head && response.data.head.code;
        let data = response.data && response.data.data;
        if (code === 0 && data) {
          // console.log("device tree response data", data);
          this.cascaderOptions = data.map(item => {
            item.label = item.name;
            item.value = item.deviceClassId;
            if (item.nodeList.length) {
              item.children = item.nodeList.map(subItem => {
                subItem.label = subItem.name ;
                subItem.value = subItem.id;
                if (subItem.nodeList.length) {
                  subItem.children = subItem.nodeList.map(grandItem => {
                    grandItem.label = grandItem.name;
                    grandItem.value = grandItem.id;
                    return grandItem;
                  });
                }
                return subItem;
              });
            }
            return item;
          });

          console.log(this.cascaderOptions);
        }
      });
    },
    submitForm(formName) {
      console.log("---------");
      console.log("tianjia");

      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submitLoading = true;
          let message = this.$t("systemSetting.modifySuccessfully");
          let url = this.isAdd ? this.postUrl : this.updateUrl;
          let method = this.isAdd ? "post" : "put";
          // let url = this.updateUrl; // 默认修改设备
          let json = {};
          Object.keys(this.formObj).forEach(key => {
            if (key === "deviceTreeId") {
              let idArr = this.formObj[key].value;
              json["deviceClassId"] = idArr[0] || "";
              json["deviceBrandId"] = idArr[1] || "";
              json["deviceTypeId"] = idArr[2] || "";
              return;
            }
            if (!!this.formObj[key].show) {
              // 修改设备时，注册码字段名为 dtuTag  新增时为registCode
              if (key === "registCode" && !this.isAdd) {
                json["dtuTag"] = this.formObj[key].value;
              } else {
                json[key] = this.formObj[key].value;
              }
            }
          });
          console.log("json+++device", json);
          this.$http({
            url,
            json,
            method
          })
            .then(response => {
              let code =
                response.data && response.data.head && response.data.head.code;
              if (code === 0) {
                this.$message.success(message);
                this.$emit("update-tree");
              }
              this.submitLoading = false;
            })
            .catch(err => {
              this.submitLoading = false;
            });
        }
      });
    },
    // 自定义重置表单 resetFields用于清除表单校验提示
    resetForm(formName) {
      // let lang = window.localStorage.hjLanguage || "zh";
      // let { formObj } = getDeviceFormData(lang);
      // this.formObj = formObj;
      Object.keys(this.formData).forEach(key => {
        if (typeof this.formObj[key] !== "undefined") {
          this.$set(this.formObj[key], "value", this.formData[key]);
        }
      });
      this.$refs[formName].resetFields();
    },
    // 查询下拉项表单 keyArr--表单项的key数组:industry-行业 nature-单位性质
    querySelectOptions(key) {
      let urlObj = {
        mainCircuitCurrent: this.queryMainCircuitCurrentUrl
      };
      let url = urlObj[key];
      this.$http({
        url
      }).then(response => {
        let code =
          response.data && response.data.head && response.data.head.code;
        let data = response.data && response.data.data;
        if (code === 0 && data) {
          this.selectOptions[key] = data.map(item => {
            if (typeof item === "object") {
              item.label = item.name;
              item.value = item.id;
            } else {
              //mainCircuitCurrent--电流互感器规格
              item = {
                label: item + " A",
                value: item,
                name: item + " A",
                id: item
              };
            }
            return item;
          });
        }
      });
    }
  },
  mounted() {
    
    this.queryDeviceTreeList();
    Object.keys(this.formObj).forEach(key => {
      if (
        this.formObj[key]["formType"] === "select" ||
        this.formObj[key]["formType"] === "multiSelect"
      ) {
        this.querySelectOptions(key);
      }
    });
    if (this.editdevice === false) {
      console.log(66666666685747);
      this.formObj["mainCircuitCurrent"].show = false;
      // this.formObj["mainCircuitCurrent"].value = "1";
      // this.formObj["commId"].show = false;
    } else {
      this.formObj["mainCircuitCurrent"].show = false;
      this.formObj["mainCircuitCurrent"].value = 50;
      // this.formObj["commId"].show = true;
      
    }
  }
};
</script>