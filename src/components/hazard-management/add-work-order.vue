<template>
  <div class="hj-report-form-wrapper">
    <el-form ref="form" :model="formObj" :rules="formRules" label-width="120px" size="small">
      <el-form-item :label="labelObj.hazardTitle" prop="hazardTitle">
        <el-input v-model="formObj.hazardTitle" :placeholder="placeholderObj.hazardTitle"></el-input>
      </el-form-item>
      <el-form-item :label="labelObj.hazardDesc" prop="hazardDesc">
        <el-input
          type="textarea"
          :rows="2"
          v-model="formObj.hazardDesc"
          :placeholder="placeholderObj.hazardDesc"
        ></el-input>
      </el-form-item>

      <el-form-item :label="labelObj.addAttachment">
        <el-upload
          ref="uploadImage"
          action
          :auto-upload="false"
          :on-remove="handleRemove"
          :on-change="handleImageUpload"
        >
          <el-button circle>
            <i class="el-icon-plus"></i>
          </el-button>
        </el-upload>
      </el-form-item>
      <el-form-item :label="labelObj.executor" prop="executor">
        <el-select
          multiple
          filterable
          remote
          size="small"
          v-model="formObj.executor"
          :placeholder="placeholderObj.executor"
          :remote-method="getExecutorList"
          :loading="executorLoading"
        >
          <el-option v-for="ops in executorList" :key="ops.id" :label="ops.name" :value="ops.id"></el-option>
        </el-select>
      </el-form-item>

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
import GetCompressedImageData from "@/mixins/getCompressedImageData.js";
export default {
  name: "AddMaintenance",
  props: {
    workOrderType: {
      type: String,
      default: "risk"
    },
    isFromHazard: {
      type: Boolean,
      default: true
    },
    showFormBtn: {
      type: Boolean,
      default: false
    },
    queryUrl: {
      type: String,
      default: "/auth/users"
    },
    postUrl: {
      type: String,
      default: "/workOrders"
    },
    eventData: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  watch: {
    eventData(newVal, oldVal) {
      // this.formObj = { ...newVal };
      Object.assign(this.formObj, newVal);
      console.log("this.formObj", this.formObj);
      // 生成标题
    }
  },
  mixins: [GetCompressedImageData],
  data() {
    var formRules = {
      hazardTitle: [
        {
          required: true,
          message: this.$t("workOrderManagement.inputWorkOrderTitle"),
          trigger: "blur"
        }
      ],

      executor: [
        {
          required: true,
          message: this.$t("workOrderManagement.selectReceiver"),
          trigger: "blur"
        }
      ]
    };
    var labelObj = {
      hazardTitle: this.$t("workOrderManagement.title"),
      hazardDesc: this.$t("workOrderManagement.description"),
      executor: this.$t("workOrderManagement.executor"),
      addAttachment: this.$t("workOrderManagement.addAttachment")
    };
    var placeholderObj = {
      hazardTitle: this.$t("workOrderManagement.inputWorkOrderTitle"),
      hazardDesc: this.$t("workOrderManagement.inputWorkOrderDescpt"),
      executor: this.$t("workOrderManagement.selectExecutor")
    };
    return {
      labelObj,
      placeholderObj,
      formObj: {
        hazardTitle: "",
        hazardDesc: "",
        executor: "",
        sourceTime: "",
        sourceId: ""
      },
      formRules,
      // uploadAttachmentTips: this.$t("workOrderManagement.imageFormatLimit"),
      fileList: [],

      executorLoading: false,
      executorList: []
    };
  },
  methods: {
    getExecutorList(query) {
      // console.log("aaaaaaaaa++++++++");
      this.executorLoading = true;
      var url = this.queryUrl;
      var json = {
        keyword: query,
        start: 0,
        size: 10,
        type: "maintainer"
      };
      this.$http({
        url,
        json
      })
        .then(response => {
          var data = response.data.data;
          var code = response.data.head && response.data.head.code;
          if (code === 0 && data) {
            this.executorLoading = false;
            this.executorList = data;
          }
        })
        .catch(err => {
          this.executorLoading = false;
        });
    },
    changeDateTime(value) {
      console.log("change date time", value);
    },
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.showLoading = true;
          this.submitPromise()
            .then(response => {
              this.showLoading = false;
              var code =
                response.data && response.data.head && response.data.head.code;
              var message = this.$t("workOrderManagement.addSuccessfully");
              if (code === 0) {
                this.$message.success(message);
              }
            })
            .catch(err => {
              this.showLoading = false;
            });
        }
      });
    },
    submitPromise() {
      let url = this.postUrl;
      // let url = "http://localhost:8081/test";
      let formData = new FormData();
      let workOrderType = this.workOrderType;
      let sourceId = this.formObj.sourceId;
      let sourceTime = this.formObj.sourceTime;
      let json = {
        title: this.formObj.hazardTitle,
        attachments: this.fileList,
        maintainers: this.formObj.executor
      };
      // 从隐患管理中发起的工单、维保
      if (this.isFromHazard) {
        if (workOrderType === "risk") {
          Object.assign(json, { workOrderType, sourceId, sourceTime });
        } else if (workOrderType === "maintenance") {
          Object.assign(json, { eventTime: sourceTime });
        }
      } else {
        //工单流程中发起的工单 维保
        Object.assign(json, { workOrderType });
      }
      if (!!this.formObj.hazardDesc.trim()) {
        json.description = this.formObj.hazardDesc.trim();
      }
      Object.keys(json).forEach(key => {
        if (key === "maintainers") {
          json[key].forEach(item => {
            formData.append(key, item);
          });
        } else if (key === "attachments") {
          if (this.fileList.length > 0) {
            json[key].forEach(item => {
              // formData.append("blob", item.url, key);
              // console.log("upload file++++++", item.raw);
              formData.append(key, item.raw);
            });
          }
        } else {
          formData.set(key, json[key]);
        }
      });
      return this.$http({
        url,
        json: formData,
        method: "post",
        contentType: "formData"
      });
    },
    resetForm() {
      this.$refs.form.resetFields();
      this.$refs.uploadImage.clearFiles();
      this.fileList = [];
    },

    handleRemove(file, fileList) {
      console.log(file, fileList, this.fileList);
      // this.getCompressedImageData(file.raw, this.updateImageList);
    },
    handleImageUpload(file, fileList) {
      console.log("file, fileList", file, fileList);
      if (["jpeg", "png", "jpg"].indexOf(file.raw.type.split("/")[1]) < 0) {
        this.$message.error(this.$t("workOrderManagement.imgFormatError"));
      }
      // this.getCompressedImageData(file.raw, this.updateImageList);
      this.fileList = fileList;
    },
    // 压缩处理后的图片数据
    // result是一个对象 compressedFile是压缩后的file compressedUrl是转换后的dataUrl
    updateImageList(result) {
      console.log("compressed result dataURL", result);
      try {
        this.fileList.push(result.compressedFile);
      } catch (e) {
        // statements
        console.log(e);
      }
    }
  },
  mounted() {
    var queryString = "";
    this.getExecutorList(queryString);
    // 初始化工单 自动标题 sourceId sourceTime
    Object.assign(this.formObj, this.eventData);
  }
};
</script>