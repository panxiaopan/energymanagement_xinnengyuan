<template>
  <div class="hj-task-details-wrapper" v-loading="pageLoading">
    <el-row v-if="hasFinished" class="hj-task-details__head">
      <el-col :span="18" class="hj-task-details__head__left">
        <span>{{labelTextObj.workOrderNumber}}:</span>
        <span>{{basicInfo.workOrderNumber}}</span>&nbsp;&nbsp;
        <span>{{labelTextObj.workOrderExecutor}}:</span>
        <span>{{basicInfo.workOrderExecutor}}</span>&nbsp;&nbsp;
        <span>{{labelTextObj.contactDetails}}:</span>
        <span>{{basicInfo.executorContact}}</span>&nbsp;&nbsp;
      </el-col>
      <el-col :span="6" class="hj-task-details__head__right">
        <span>{{labelTextObj.currentStatus}}:</span>
        <span>{{basicInfo.currentStatus}}</span>&nbsp;&nbsp;
      </el-col>
    </el-row>
    <el-row :class="[hasFinished ? 'hj-task-details__body' : '']">
      <div v-if="hasFinished" class="hj-task-details__body__basicInfo">
        <el-row class="basic-head">
          <el-col :span="12" class="basic-head__left">
            <span>{{labelTextObj.basicInfo}}</span>
          </el-col>
          <el-col :span="12" class="basic-head__right">
            <span>{{labelTextObj.originator}}:</span>
            <span>{{basicInfo.originator}}</span>&nbsp;&nbsp;
            <span>{{labelTextObj.contactDetails}}:</span>
            <span>{{basicInfo.originatorContact}}</span>
          </el-col>
        </el-row>
        <el-row class="basic-body">
          <el-col :span="12">
            <div>
              <span>{{labelTextObj.socialUnit}}:</span>
              <span>{{basicInfo.socialUnit}}</span>
            </div>
            <div>
              <span>{{labelTextObj.address}}:</span>
              <span>{{basicInfo.address}}</span>
            </div>
            <div>
              <span>{{labelTextObj.hazardDesc}}:</span>
              <span>{{basicInfo.hazardDesc}}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <span>{{labelTextObj.deviceName}}:</span>
              <span>{{basicInfo.deviceName}}</span>
            </div>
            <div>
              <span>{{labelTextObj.devicePos}}:</span>
              <span>{{basicInfo.devicePos}}</span>
            </div>
            <div>
              <span>{{labelTextObj.hazardLevel}}:</span>
              <span>{{basicInfo.hazardLevel}}</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div :class="[hasFinished ? 'hj-task-details__body__details' : '']">
        <div v-if="hasFinished" class="details-head">
          <span>{{labelTextObj.workOrderFlow}}</span>
        </div>
        <div class="hj-task-details-step">
          <el-steps :space="200" :active="currentStep" align-center>
            <el-step :title="stepTextObj.assigned"></el-step>
            <el-step :title="stepTextObj.received"></el-step>
            <el-step :title="stepTextObj.resolved"></el-step>
            <el-step :title="stepTextObj.closed"></el-step>
          </el-steps>
        </div>
        <!-- <div v-if="!hasFinished" class="hj-task-details-desc">
          <div class="hj-task-details-desc__item">
            <span class="hj-task-details-desc__title">{{descTextObj.device}}:&nbsp;</span>
            <span class="hj-task-details-desc__desc">{{deviceDesc}}</span><br>
      
            <span class="hj-task-details-desc__title">{{descTextObj.title}}:&nbsp;</span>
            <span class="hj-task-details-desc__desc">{{ titleDesc }}</span><br>
      
            <span class="hj-task-details-desc__title">{{descTextObj.desc}}:&nbsp;</span>
            <span class="hj-task-details-desc__desc">{{ reasonDesc }}</span>
          </div>
        </div>-->
        <div v-show="enableOperation && authOperate" class="hj-task-details-operate">
          <el-button
            type="primary"
            :loading="showNextStepLoading"
            size="small"
            @click.native="nextStep"
          >{{nextStepText}}</el-button>&nbsp;&nbsp;
          <el-button
            v-if="currentStep == 2"
            type="primary"
            size="small"
            @click.native="addNewComment"
          >{{commentText}}</el-button>&nbsp;&nbsp;
          <el-button v-if="currentStep == 3" size="small" @click.native="rejectStep">{{rejectText}}</el-button>
          <el-dropdown trigger="click" @command="handleCommand">
            <el-button type="primary" size="small">
              {{labelTextObj.more}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="addHazard">{{labelTextObj.addHazard}}</el-dropdown-item>
              <el-dropdown-item command="addMaintenance">{{labelTextObj.addMaintenance}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div
          class="hj-task-details-history"
          :class="[showDetails ? 'hj-task-details-history--showDetails' : '']"
        >
          <!-- <el-collapse-transition> -->
          <timeline>
            <!-- 单个步骤项 -->
            <timeline-item
              v-for="(item, itemIndex) in stepOptions"
              v-if="!!stepOptions.length"
              :key="item.step"
              :hasChild="item.comments && !!item.comments.length"
            >
              <div slot="time">
                <div>{{ item.startTime | filterTime }}</div>
              </div>
              <div slot="content">
                <span>{{ item.actionerName + ' ' + item.bizStateShow }}</span>&nbsp;&nbsp;
                <br />
                <div v-if="item.comments && item.comments[0]&&item.bizStateShow !=processing">
                  <div>
                    <span>{{ item.comments[0].remark }}</span>&nbsp;&nbsp;&nbsp;
                  </div>
                  <div v-if="item.comments[0].attachments && item.comments[0].attachments.length">
                    <img
                      :class="['ximgClass'+itemIndex]"
                      v-for="(img, imgIndex) in item.comments[0].attachments"
                      :key="'img'+imgIndex"
                      v-if="img.url"
                      :src="computedUrl(img.url)"
                      height="50"
                      width="50"
                      :alt="$t('workOrderManagement.attachment')"
                      @click="clickImage(img.url)"
                    />
                  </div>
                </div>
              </div>
              <!-- 评论 批注列表 -->
              <timeline-item-list
                v-if="item.bizStateShow==processing &&item.comments&&item.comments.length"
                v-for="(subItem,subItemIndex) in item.comments"
                :key="subItem.taskId"
                :isFirst="itemIndex === 0 && subItemIndex === 0"
              >
                <div slot="content">
                  <div>
                    <span>{{ subItem.remark }}</span>&nbsp;&nbsp;&nbsp;
                  </div>
                  <div v-if="subItem.attachments.length" style="text-align:left">
                    <img
                      :class="['ximgClass'+itemIndex+subItemIndex]"
                      v-for="(img, imgIndex) in subItem.attachments"
                      :key="'img'+imgIndex"
                      v-if="img.url"
                      :src="computedUrl(img.url)"
                      height="50"
                      width="50"
                      :alt="$t('workOrderManagement.attachment')"
                      @click="clickImage(img.url)"
                    />
                  </div>
                </div>
                <div slot="time">
                  <div>{{ subItem.time | filterTime }}</div>
                </div>
              </timeline-item-list>
            </timeline-item>
          </timeline>
          <!-- </el-collapse-transition> -->
          <div @click="showDetails=!showDetails" class="hj-task-details-history__viewDetails">
            <span>{{showDetails ? toggleText.foldUp : toggleText.show}}</span>
            <i :class="[showDetails ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"></i>
          </div>
        </div>
      </div>
    </el-row>

    <el-dialog :show-close="false" append-to-body :visible.sync="showImgDialog">
      <img :src="imgSrc" :height="imgHeight" :width="imgWidth" alt="failedloading" />
    </el-dialog>
    <el-dialog
      ref="commentDialog"
      :title="$t('workOrderManagement.addProcessingAdvice')"
      :show-close="false"
      :close-on-click-modal="false"
      append-to-body
      :visible.sync="showCommentDialog"
    >
      <el-form :model="workOrderOptions" ref="workOrderForm" size="small" label-width="100px">
        <el-form-item :label="opinionLabel" prop="opinion">
          <el-input
            type="textarea"
            :rows="2"
            :placeholder="opinionPlaceholder"
            v-model="workOrderOptions.opinion"
          ></el-input>
        </el-form-item>
        <el-form-item :label="attachmentsLabel" prop="attachments">
          <el-upload
            ref="uploadImage"
            action
            :auto-upload="false"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-change="handleImageUpload"
          >
            <el-button size="small" type="primary">{{click2UploadText}}</el-button>
            <div slot="tip" class="el-upload__tip">{{uploadTips}}</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="cancelAddComment">{{cancel}}</el-button>
        <el-button type="primary" :loading="showCommitLoading" @click="submitNewComment">{{ok}}</el-button>
      </span>
    </el-dialog>

    <el-dialog
      ref="addWorkOrderDialog"
      :title="labelTextObj.addHazard"
      :show-close="false"
      :close-on-click-modal="false"
      append-to-body
      :visible.sync="showHazardDialog"
    >
      <add-work-order></add-work-order>
    </el-dialog>

    <el-dialog
      ref="addMaintenanceDialog"
      :title="labelTextObj.addMaintenance"
      :show-close="false"
      :close-on-click-modal="false"
      append-to-body
      :visible.sync="showMaintenanceDialog"
    >
      <add-maintenance></add-maintenance>
    </el-dialog>
  </div>
</template>

<script>
// import TaskDetails from "../../task-management/task-details";
import AddWorkOrder from "@/components/hazard-management/add-work-order";
import AddMaintenance from "@/components/hazard-management/add-maintenance";
// import "./index.less";
import Timeline from "@/components/common/timeline/index.vue";
import TimelineItem from "@/components/common/timeline/timeline-item.vue";
import TimelineItemList from "@/components/common/timeline/timeline-item-list.vue";
import GetCompressedImageData from "@/mixins/getCompressedImageData.js";

export default {
  name: "workOrderDetail",
  mixins: [GetCompressedImageData],
  components: {
    Timeline,
    TimelineItem,
    TimelineItemList,
    AddWorkOrder,
    AddMaintenance
    // TaskDetails
  },
  props: {
    queryUrl: {
      type: String,
      default: ""
    },
    receiveUrl: {
      type: String,
      default: ""
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
    },
    flowId: {
      type: [String, Number],
      default: "--"
    },
    authOperate: {
      type: Boolean,
      default: true
    },
    hasFinished: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    queryUrl(newId, oldId) {
      this.initOrderState();
    }
  },
  data() {
    var labelTextObj = {
      workOrderNumber: "工单编号",
      workOrderExecutor: "处理人",
      contactDetails: "联系方式",
      currentStatus: "当前状态",
      originator: "发起人",
      basicInfo: "基本信息",
      socialUnit: "社会单位",
      address: "地址",
      hazardDesc: "隐患描述",
      deviceName: "设备名称",
      devicePos: "设备位置",
      hazardLevel: "隐患等级",
      workOrderFlow: "工单流程",
      more: "更多",
      addHazard: "添加隐患工单",
      addMaintenance: "添加维保工单"
    };
    var basicInfo = {
      workOrderNumber: "123456",
      workOrderExecutor: "张三",
      executorContact: "13012345678",
      currentStatus: "已完成",

      originator: "李四",
      originatorContact: "13312345678",
      socialUnit: "康和盛大厦",
      address: "深圳市南山区西丽创盛路1号新能源产业园406",
      hazardDesc: "温度超限",
      deviceName: "1#电气火灾探测器",
      devicePos: "4#华杰电气技术有限公司",
      hazardLevel: "报警"
    };
    return {
      labelTextObj,
      basicInfo,
      processing: this.$t("processing"),
      descTextObj: {
        device: this.$t("workOrderManagement.device"),
        title: this.$t("workOrderManagement.title"),
        desc: this.$t("workOrderManagement.description")
      },
      summaryInfo: {
        // title: "故障修复",
        // eventDesc: "逆变器故障",
        // flowStateCode: 2,
        // nodeName: "1#逆变器",
        // stationName: "康和盛储能大厦",
        // reason: "逆变器无法通信持续一周, 需运维人员现场核实检修"
      },
      enableOperation: true,
      stepOptions: [
        //   {
        //     show: true,
        //     id: 2,
        //     bizStateShow: "处理中",
        //     actionerName: "张工",
        //     startTime: "2018-12-02 10:20:20",
        //     endTime: "2018-12-02 10:30:00",
        //     comments: [],
        //     isApproved: true,
        //     isCurrentState: true,
        //     attachments: ""
        //   },
        //   {
        //     show: false,
        //     id: 1,
        //     bizStateShow: "已接收",
        //     actionerName: "马先超",
        //     startTime: "2017-12-05 09:22:22",
        //     endTime: "2017-12-05 09:22:22",
        //     comments: [
        //       {
        //         remark: "设备老化，已无法正常运行，需更换设备",
        //         time: "2017-12-02 12::02:22",
        //         attachments: [
        //           {
        //             url: require("@/assets/images/demo1.jpg")
        //           }
        //         ]
        //       }
        //     ],
        //     isApproved: true,
        //     isCurrentState: false,
        //     attachments: ""
        //   },
        //   {
        //     show: false,
        //     id: 1,
        //     bizStateShow: "已发起",
        //     actionerName: "超级管理员",
        //     startTime: "2017-12-02 10:20:20",
        //     endTime: "2017-12-02 10:30:00",
        //     comments: [],
        //     isApproved: true,
        //     isCurrentState: true,
        //     attachments: ""
        //   }
      ],
      workOrderOptions: {
        opinion: "",
        attachments: ""
      },
      imagesFileList: [],
      showCommentDialog: false,
      commentType: "", // 添加批注的类型
      backSrc: require("@/assets/images/hj-back.png"),
      showNextStepLoading: false,
      showCommitLoading: false,
      stepTextObj: {
        assigned: this.$t("workOrderManagement.assigned"),
        received: this.$t("workOrderManagement.received"),
        resolved: this.$t("workOrderManagement.resolved"),
        closed: this.$t("workOrderManagement.closed")
      },
      showImgDialog: false,
      imgSrc: "",
      imgWidth: "auto",
      imgHeight: "auto",
      commentText: this.$t("workOrderManagement.comment"),
      rejectText: this.$t("workOrderManagement.reject"),
      opinionPlaceholder: this.$t("workOrderManagement.inputResolvedAdvice"),
      opinionLabel: this.$t("workOrderManagement.advice"),
      attachmentsLabel: this.$t("workOrderManagement.uploadImage"),
      click2UploadText: this.$t("workOrderManagement.click2Upload"),
      uploadTips: this.$t("workOrderManagement.imageFormatLimit"),
      cancel: this.$t("workOrderManagement.cancel"),
      ok: this.$t("workOrderManagement.ok"),
      showDetails: false,
      toggleText: {
        show: this.$t("workOrderManagement.viewDetails"),
        foldUp: this.$t("workOrderManagement.foldUp")
      },
      pageLoading: false,
      showHazardDialog: false,
      showMaintenanceDialog: false
    };
  },
  filters: {
    filterTime(value) {
      if (!value) {
        return "";
      }
      return moment(value).format("MM-DD HH:mm");
    }
  },
  computed: {
    currentStep() {
      return this.summaryInfo.flowStateCode - 0;
    },
    // deviceDesc() {
    //   return `${this.summaryInfo.nodeName || "--"}(${this.summaryInfo
    //     .stationName || "--"})`;
    // },
    // titleDesc() {
    //   return this.summaryInfo.title || "--";
    // },
    // reasonDesc() {
    //   return this.summaryInfo.reason || "--";
    // },
    nextStepText() {
      let state = this.summaryInfo.flowStateCode - 0;
      if (state === 1) {
        return this.$t("workOrderManagement.receive");
      } else if (state === 3) {
        return this.$t("workOrderManagement.close");
      } else {
        return this.$t("workOrderManagement.finish");
      }
    }
    // workOrderOperateAuth(){
    //   return this.$store.state.hjSystemAuthObj.workOrderOperateAuth
    // }
  },
  methods: {
    computedUrl(url) {
      var preUrl =
        window.location.protocol +
        "//" +
        window.location.host +
        "/" +
        window.location.pathname.split("/")[1];
      if (url) {
        if (process.env.NODE_ENV === "production") {
          url = preUrl + url;
        } else {
          url = "." + url;
        }
      }
      return url;
    },
    clickImage(url) {
      var newImage = new window.Image();
      newImage.src = this.computedUrl(url);
      newImage.onload = () => {
        if (newImage.height > window.innerHeight * 0.6) {
          this.imgHeight = window.innerHeight * 0.6;
        }
        if (newImage.width > window.innerWidth * 0.4) {
          this.imgWidth = window.innerWidth * 0.4;
        }
      };
      // newImage = null
      this.imgSrc = this.computedUrl(url);
      this.showImgDialog = true;
    },
    nextStep() {
      // 接收工单任务
      if (this.currentStep === 1) {
        this.showNextStepLoading = true;
        this.$http({
          url: this.receiveUrl,
          method: "post"
        }).then(response => {
          var code =
            response.data && response.data.head && response.data.head.code;
          if (+code === 0) {
            this.$message.success(
              this.$t("workOrderManagement.receiveSuccess")
            );
            this.showNextStepLoading = false;
            this.initOrderState();
            this.$nextTick(() => {
              this.$emit("update-task-state");
            });
          } else {
            this.showNextStepLoading = false;
          }
        });
        return;
      } else if (this.currentStep === 2) {
        this.commentType = "close";
      } else if (this.currentStep === 3) {
        this.commentType = "approve";
      }
      this.showCommentDialog = true;
    },
    addNewComment() {
      this.showCommentDialog = true;
      this.commentType = "comment";
    },
    rejectStep() {
      this.showCommentDialog = true;
      this.commentType = "reject";
    },

    initOrderState() {
      this.pageLoading = true;
      var url = this.queryUrl;
      var json = { processInstanceId: this.flowId };
      this.$http({
        url,
        json,
        method: "get"
      })
        .then(response => {
          // console.log("word order detail response", response);
          var code =
            response.data && response.data.head && response.data.head.code;
          var data = response.data && response.data.data;
          if (+code === 0) {
            var data = response.data.data;
            this.enableOperation =
              typeof data.canOperate === "undefined" ? false : data.canOperate;
            data.taskInfo.forEach(item => {
              item.actionerName =
                (item.actioners[0] && item.actioners[0].name) || "--";
            });
            var stepOptions = data.taskInfo.reverse();
            console.log("stepOptions", stepOptions);
            this.stepOptions = stepOptions;
            console.log("this.stepOptions", this.stepOptions);
            this.summaryInfo = data.workOrderVO;
            // console.log("this.summaryInfo", this.summaryInfo);
          }
          this.pageLoading = false;
        })
        .catch(err => {
          this.pageLoading = false;
        });
    },
    cancelAddComment() {
      this.workOrderOptions.opinion = "";
      this.$refs.uploadImage.clearFiles();
      this.imagesFileList.length = 0;
      this.showCommentDialog = false;
    },
    submitNewComment() {
      this.showCommitLoading = true;
      var json = new FormData(),
        url = "",
        message = "";
      if (!!this.imagesFileList.length) {
        this.imagesFileList.forEach(file => {
          json.append("attachments[]", file);
        });
      }
      json.set("comment", this.workOrderOptions.opinion);
      if (this.commentType === "comment") {
        url = this.addUrl;
        message = this.$t("workOrderManagement.addCommentSuccess");
      } else if (this.commentType === "close") {
        url = this.closeUrl;
        message = this.$t("workOrderManagement.submitSuccess");
      } else {
        url = this.approveUrl;
        let state = this.commentType === "reject" ? 0 : 1;
        json.set("approveState", state); // 0 驳回 1 批准
        message =
          this.commentType === "reject"
            ? this.$t("workOrderManagement.rejectedSuccess")
            : this.$t("workOrderManagement.approvedSuccess");
      }

      this.$http({
        url,
        json,
        method: "post",
        contentType: "formData"
        // message
      }).then(response => {
        var code =
          response.data && response.data.head && response.data.head.code;
        if (+code === 0) {
          // if (status === "success") {
          this.$message.success(message);
          console.log("add new comment response", response);
          this.workOrderOptions.opinion = "";
          this.imagesFileList.length = 0;
          this.$refs.uploadImage.clearFiles();
          this.showCommentDialog = false;
          this.showCommitLoading = false;
          this.$nextTick(() => {
            this.initOrderState(); //刷新工单详情数据
            this.$nextTick(() => {
              this.$emit("update-task-state");
            });
          });
        } else {
          this.showCommitLoading = false;
        }
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleImageUpload(file, fileList) {
      // console.log("upload image file, fileList", file, fileList);
      if (["jpeg", "png", "jpg"].indexOf(file.raw.type.split("/")[1]) < 0) {
        this.$message.error(this.$t("imageFormatLimit"));
      }
      // 压缩处理后的图片数据
      // result是一个对象 compressedFile是压缩后的file compressedUrl是转换后的dataUrl
      this.getCompressedImageData(file.raw, result => {
        console.log("compressed result", result);
        try {
          this.imagesFileList.push(result.compressedFile);
        } catch (e) {
          console.error(e);
        }
        // console.log("this.imagesFileList", this.imagesFileList);
      });
    },
    click2ViewDetails() {
      this.showDetails = !this.showDetails;
    },
    handleCommand(command) {
      console.log("command", command);
    }
  },
  mounted() {
    this.initOrderState();
  }
};
</script>
<style lang="less" scoped >
.hj-task-details-wrapper {
  height: 100%;
  .hj-task-detials__top {
    display: flex;
    justify-content: center;
    padding: 1vh 1vw;
  }
  .hj-task-details-desc {
    // text-align: center;
    display: flex;
    // flex-direction: column;
    justify-content: center;
    // align-items: center;
    padding: 1vh 0;
    line-height: 1.8;
    // font-size:
  }
  .hj-task-details-desc__desc {
    // font-size: 1.5vh;
    font-weight: bold;
    color: #31b944;
  }
  .hj-task-details-operate {
    padding: 1vh 5vw;
    display: flex;
    // justify-content: space-around;
    justify-content: center;
  }
  .hj-task-details-history {
    position: relative;
    display: flex;
    justify-content: center;
    padding-top: 5vh;
    max-height: 10vh;
    overflow: hidden;
  }
  .hj-task-details-history--showDetails {
    max-height: inherit;
    overflow: auto;
  }

  .hj-task-details-history__viewDetails {
    position: absolute;
    z-index: 99;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 0,
      #fff 65%,
      #fff 100%
    );
    // box-shadow: 3px 3px 10px #5a5959;
    bottom: 0;
    height: 3vh;
    width: 100%;
    display: flex;
    // text-align: center;
    justify-content: center;
    align-items: flex-end;
    cursor: pointer;
    font-size: 1.2vh;
    color: gray;
  }
}

.hj-task-details__head {
  display: flex;
  align-items: center;
  padding: 0.5vh 0.5vw;
  margin: 1vh 0;
  background: #ffffff;
  height: 8vh;

  .head__left {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-right: 1px solid #979797;
    height: 100%;
    padding-right: 0.5vw;
    .head__left__item {
      width: 30%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
  .head__right {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
}

.hj-task-details__body {
  background: #ffffff;
  min-height: 55vh;
}

.hj-task-details__body__basicInfo {
  padding: 1vh;
  .basic-head {
    display: flex;
    align-items: center;
    padding: 1vh;
    margin-bottom: 1vh;
    border-bottom: 1px solid #646464;
  }
  .basic-head__left {
    font-size: 1.8vh;
    font-weight: bold;
  }
  .basic-head__right {
    // display: flex;
    text-align: right;
  }

  .basic-body {
    line-height: 2;
    display: flex;
    align-items: center;
  }

  .basic-body__content {
    padding: 0 0.5vw;
  }
  .basic-body__content__item {
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
.hj-task-details__body__relatedInfo {
  padding: 1vh;
  .related-head {
    font-size: 1.8vh;
    font-weight: bold;
    padding: 1vh;
    margin-bottom: 1vh;
    // height: 6vh;
    border-bottom: 1px solid #646464;
  }
  .related-body {
    line-height: 2;
    padding: 0 0.5vw;
    // display: flex;
    // align-items: center;
  }
  .related-body__item {
    // width: 100%;
    // text-overflow: ellipsis;
    // white-space: nowrap;
    // overflow: hidden;
  }
  .related-body__item--linked {
    display: flex;
    // align
  }
  .related-body__item__value__sub,
  .related-body__item__value--actived {
    text-decoration: underline;
    cursor: pointer;
  }
}
.hj-task-details__body__details {
  position: relative;
  padding: 1vh;
  .details-head {
    font-size: 1.8vh;
    font-weight: bold;
    padding: 1vh;
    margin-bottom: 1vh;
    // height: 6vh;
    border-bottom: 1px solid #646464;
  }
}
.hj-task-details-step {
  padding-top: 1vh;
  .el-steps {
    display: flex;
    justify-content: center;
  }
  .el-step__head.is-success {
    color: #1161c0;
    border-color: #1161c0;
  }
  .el-step__title.is-success {
    color: #003570;
  }
  // .el-step__head.is-finish {
  //   color: #1161c0;
  //   border-color: #1161c0;
  // }
  // .el-step__title.is-finish {
  //   color: #003570;
  // }
}

.hj-message-box-wrapper {
  background: #e2e2e2;
}
</style>