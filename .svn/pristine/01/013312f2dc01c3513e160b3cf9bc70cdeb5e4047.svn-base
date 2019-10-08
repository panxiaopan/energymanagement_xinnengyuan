<template>
  <div class="hj-report-form-wrapper">
    <el-form ref="form" :model="formObj" :rules="formRules" label-width="120px" size="small">
      <el-form-item :label="labelObj.socialUnit" prop="socialUnit">
        <el-input v-model="formObj.socialUnit" :placeholder="placeholderObj.socialUnit"></el-input>
      </el-form-item>
      <el-form-item :label="labelObj.deviceName" prop="deviceName">
        <el-input v-model="formObj.deviceName" :placeholder="placeholderObj.deviceName"></el-input>
      </el-form-item>
      <el-form-item :label="labelObj.maintenanceDesc" prop="maintenanceDesc">
        <el-input type="textarea" :rows="2" v-model="formObj.maintenanceDesc" :placeholder="placeholderObj.maintenanceDesc"></el-input>
      </el-form-item>
      
      <el-form-item :label="labelObj.addAttachment" prop="attachment">
        <el-upload 
        ref="uploadImage" 
        action="" 
        :auto-upload="false" 
        :on-remove="handleRemove" 
        :on-change="handleImageUpload"> 
          <el-button circle><i class="el-icon-plus"></i></el-button>
          <div slot="tip" class="el-upload__tip">{{uploadAttachmentTips}}</div>
        </el-upload>
      </el-form-item>
      
      <el-form-item :label="labelObj.executor" prop="executor">
        <el-select 
              filterable
              remote
              size="small"
              v-model="formObj.executor" 
              :placeholder="placeholderObj.executor"
              :remote-method="getExecutorList"
              :loading="executorLoading">
                <el-option v-for="ops in executorList" :key="ops.id" :label="ops.name" :value="ops.id">
                </el-option>
              </el-select>
      </el-form-item>
      <el-form-item v-if="showFormBtn">
        <el-button type="primary" @click="submitForm" :loading="showLoading">{{$t("systemSetting.save")}}</el-button>
        <el-button @click="resetForm">{{$t("systemSetting.reset")}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
export default {
  name: "AddMaintenance",
  props: {
    showFormBtn: {
      type: Boolean,
      default: false
    }
  },
  data() {
    var formObj = {
      socialUnit: "",
      deviceName: "",
      maintenanceDesc: "",
      executor: "",
      attachment: ""
    };
    var formRules = {
      socialUnit: [
        {
          required: true,
          message: "请输入社会单位",
          trigger: "blur"
        }
      ],
      deviceName: [
        {
          required: true,
          message: "请输入设备名称",
          trigger: "blur"
        }
      ],
      maintenanceDesc: [
        {
          required: true,
          message: "请输入维保原因",
          trigger: "blur"
        }
      ]
    };
    var labelObj = {
      socialUnit: "社会单位",
      deviceName: "设备名称",
      maintenanceDesc: "维保原因",
      executor: "执行人",
      addAttachment: "添加附件"
    };
    var placeholderObj = {
      socialUnit: "请输入社会单位",
      deviceName: "请输入设备名称",
      maintenanceDesc: "请输入维保原因",
      executor: "请选择执行人"
    };
    return {
      labelObj,
      placeholderObj,
      formObj,
      formRules,
      uploadAttachmentTips: "仅支持图片上传",
      fileList: [],
      executorLoading: false,
      executorList: []
    };
  },
  methods: {
    changeDateTime(value) {
      console.log("change date time", value);
    },
    submitForm() {
      // this.$refs.form.resetFields();
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
    handleRemove() {
      console.log(file, fileList);
    },
    handleImageUpload(file, fileList) {
      console.log("file, fileList", file, fileList);
    },
    getExecutorList() {}
  },
  mounted() {}
};
</script>