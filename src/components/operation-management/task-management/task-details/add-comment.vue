<template>
  <div class="hj-add-comment-wrapper">
    <el-form
      :model="workOrderOptions"
      ref="form"
      size="small"
      label-width="100px"
      @submit.native.prevent
    >
      <el-form-item :label="labelObj.opinion" prop="opinion">
        <el-input
          type="textarea"
          :rows="2"
          :placeholder="placeholderObj.opinion"
          v-model="workOrderOptions.opinion"
        ></el-input>
      </el-form-item>
      <el-form-item :label="labelObj.attachments" prop="attachments">
        <el-upload
          ref="uploadImage"
          action
          :auto-upload="false"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-change="handleImageUpload"
        >
          <el-button size="small" type="primary">{{labelObj.click2UploadText}}</el-button>
          <div slot="tip" class="el-upload__tip">{{labelObj.uploadTips}}</div>
        </el-upload>
      </el-form-item>
      <el-form-item v-if="showFormBtn">
        <el-button @click="resetForm">{{labelObj.cancel}}</el-button>
        <el-button type="primary" :loading="showLoading" @click="submitNewComment">{{labelObj.ok}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import GetCompressedImageData from "@/mixins/getCompressedImageData.js";
export default {
  name: "AddComment",
  mixins: [GetCompressedImageData],
  props: {
    showFormBtn: {
      type: Boolean,
      default: false
    },
    commentType: {
      type: String,
      default: "comment"
    },
    addUrl: {
      type: String,
      default: ""
    },
    approveUrl: {
      type: String,
      default: ""
    },
    closeUrl: {
      type: String,
      default: ""
    }
  },
  data() {
    var labelObj = {
      opinion: this.$t("workOrderManagement.advice"),
      attachments: this.$t("workOrderManagement.uploadImage"),
      cancel: this.$t("workOrderManagement.cancel"),
      ok: this.$t("workOrderManagement.ok"),
      click2UploadText: this.$t("workOrderManagement.click2Upload"),
      uploadTips: this.$t("workOrderManagement.imageFormatLimit"),
      imageFormatTips: this.$t("workOrderManagement.imageFormatLimit"),
      addCommentSuccess: this.$t("workOrderManagement.addCommentSuccess"),
      submitSuccess: this.$t("workOrderManagement.submitSuccess"),
      rejectedSuccess: this.$t("workOrderManagement.rejectedSuccess"),
      approvedSuccess: this.$t("workOrderManagement.approvedSuccess")
    };
    var placeholderObj = {
      opinion: this.$t("workOrderManagement.inputResolvedAdvice")
    };
    return {
      labelObj,
      placeholderObj,
      showLoading: false,
      workOrderOptions: {
        opinion: "",
        attachments: ""
      },
      imagesFileList: []
    };
  },
  watch: {
    commentType(old) {
      // console.log("传过来的值");
      // console.log(this.commentType);
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleImageUpload(file, fileList) {
      if (["jpeg", "png", "jpg"].indexOf(file.raw.type.split("/")[1]) < 0) {
        this.$message.error(this.labelObj.imageFormatTips);
      }
      this.imagesFileList = fileList;
      // 压缩处理后的图片数据
      // result是一个对象 compressedFile是压缩后的file compressedUrl是转换后的dataUrl
      // this.getCompressedImageData(file.raw, result => {
      //   console.log("compressed result", result);
      //   try {
      //     this.imagesFileList.push(result.compressedFile);
      //   } catch (e) {
      //     console.error(e);
      //   }
      //   // console.log("this.imagesFileList", this.imagesFileList);
      // });
    },
    resetForm() {
      // this.workOrderOptions.opinion = "";
      this.$refs.form.resetFields();
      this.$refs.uploadImage.clearFiles();
      this.imagesFileList.length = 0;
    },
    submitNewComment() {
      this.submitPromise()
        .then(response => {
          this.showLoading = false;
          var code =
            response.data && response.data.head && response.data.head.code;
          if (+code === 0) {
            var message = "";
            if (this.commentType === "comment") {
              // console.log("批注");
              message = this.labelObj.addCommentSuccess;
            } else if (this.commentType === "close") {
              // console.log("关闭");
              message = this.labelObj.submitSuccess;
            } else {
              message =
                this.commentType === "reject"
                  ? this.labelObj.rejectedSuccess
                  : this.labelObj.approvedSuccess;
            }
            this.$message.success(message);
          }
        })
        .catch(err => {
          this.showLoading = false;
        });
    },
    submitPromise() {
      this.showLoading = true;
      var json = {};
      var url = "";
      if (!!this.imagesFileList.length) {
        this.imagesFileList.forEach(file => {
          // json.append("attachments", file.raw);
          json.attachments = file.raw;
        });

        console.log(this.imagesFileList);
      }
      console.log("workOrderOptions", this.workOrderOptions);
      //  json.append("comment", this.workOrderOptions.opinion);
      json.comment = this.workOrderOptions.opinion;
      console.log("=======上传前的参数=====");
      console.log(this.workOrderOptions.opinion);
      console.log(json);

      if (this.commentType === "comment") {
        console.log("批注");
        url = this.addUrl;
      } else if (this.commentType === "close") {
        console.log("关闭");
        url = this.closeUrl;
      } else {
        url = this.approveUrl;
        let state = this.commentType === "reject" ? 0 : 1;
        // json.set("approveState", state); // 0 驳回 1 批准
        json.approveState = state;

        console.log("批准00000000000");
      }
      console.log("--参数啊啊啊啊啊啊啊啊啊 -");
      // console.log(json.get("attachments"));
      // console.log(json.get("comment"));
      // console.log(json.get("approveState"));
      console.log(json);
      return this.$http({
        url,
        json,
        method: "post",
        contentType: "multipart/form-data"
      });
    }
  },
  mounted() {}
};
</script>
