<template>
  <el-col :span="24" class="mainbox">
    <div class="titalalrm">
      <div style="padding-left:40px">
        <span>今日报警数量</span>
        <span class="totalmessage">{{todaymessage.todayCount}}</span>
      </div>
      <div>
        <span>待处理报警数量</span>
        <span class="totalmessage">{{todaymessage.pendingCount}}</span>
      </div>
      <div>
        <span>历史报警数量</span>
        <span class="totalmessage">{{todaymessage.totalCount}}</span>
      </div>
    </div>
    <div class="linealrem"></div>
    <el-col :span="8">
      <div style="height:50px;line-height:50px;padding:0px 40px">
        <span class="alrmeName">报警状态</span>
        <div style="display:inline-block">
          <el-checkbox-group v-model="checkboxGroup2" @change="alremseach">
            <el-checkbox-button label="pending" size="mini" class="checkbutton">待处理</el-checkbox-button>
            <el-checkbox-button label="processing" size="mini" class="checkbutton">处理中</el-checkbox-button>
            <el-checkbox-button label="completed" size="mini" class="checkbutton">已消除</el-checkbox-button>
          </el-checkbox-group>
        </div>
      </div>
    </el-col>
    <el-col :span="16">
      <div style="height:50px;line-height:50px;">
        <span class="alrmeName">报警等级</span>
        <el-radio-group v-model="alrmgrate" @change="alremseach">
          <el-radio label>所有</el-radio>
          <el-radio label="info">信息</el-radio>
          <el-radio label="earlyWarning">预警</el-radio>
          <el-radio label="alarm">报警</el-radio>
        </el-radio-group>
      </div>
    </el-col>

    <el-col :span="8">
      <div style="height:50px;line-height:50px;padding-left: 40px">
        <span class="alrmeName">日期</span>
        <el-date-picker
          v-model="alremtime"
          type="datetimerange"
          :picker-options="devicepickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="changealrem"
        ></el-date-picker>
      </div>
    </el-col>
    <el-col :span="16">
      <div style="height:50px;line-height:50px;">
        <span class="alrmeName">搜索</span>
        <div style="display:inline-block">
          <el-input
            placeholder="请输入内容"
            v-model="alrmskeyword"
            class="input-with-select"
            style="width:400px"
          >
            <el-button slot="append" icon="el-icon-search" @click="alremseach"></el-button>
          </el-input>
        </div>
        <div style="display:inline-block;float:right;margin-right:40px">
          <el-button type="primary" size="small" @click="labour_report">人工上报</el-button>
        </div>
      </div>
    </el-col>
    <el-col :span="24" style="padding:0px 40px">
      <el-table :data="alremtableData" border style="width: 100%;margin-top:20px;">
        <el-table-column prop="eventTime" label="日期" width="180"></el-table-column>
        <el-table-column label="地址" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{scope.row.subStation.address}}</span>
          </template>
        </el-table-column>
        <el-table-column label="设备名称">
          <template slot-scope="scope">
            <span>{{scope.row.device.name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="设备位置" width="120">
          <template slot-scope="scope">
            <span>{{scope.row.device.address}}</span>
          </template>
        </el-table-column>
        <el-table-column label="报警等级" width="120">
          <template slot-scope="scope">
            <span>{{scope.row.alarmGrade.desc}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="alarmDesc" label="报警描述"></el-table-column>
        <el-table-column label="报警状态" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.alarmState.desc}}</span>
          </template>
        </el-table-column>
        <el-table-column label="报警来源" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.fromManualReport">人工上报</span>
            <span v-else>系统上报</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <el-button size="mini" @click="sendOrders(scope.row)">派单</el-button>
            <el-button size="mini" @click="orderDetails(scope.row)">详情</el-button>
            <el-button size="mini" @click="managealrem(scope.row)">处理</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-col :span="24" style="margin-top:20px">
        <page-compent
          :pageSize="alremsize"
          :pagetotal="alrempaggtatol"
          @fanye="alrempageIndexChange"
        ></page-compent>
      </el-col>

      <el-col :span="24">
        <el-dialog title="人工上报" :visible.sync="Artificial_report" width="30%">
          <el-form
            label-position="right"
            label-width="120px"
            :model="report_form"
            ref="report_form"
            :rules="reportrules"
          >
            <el-form-item label="设备名称" prop="deviceId">
              <!-- <el-input v-model="report_form.region"></el-input> -->
              <el-select
                filterable
                remote
                v-model="report_form.deviceId"
                placeholder="请选择"
                :remote-method="getdeviceidlist"
                style="width:100%"
              >
                <el-option
                  v-for="item in decive_amountData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="隐患描述" prop="description">
              <el-input type="textarea" v-model="report_form.description"></el-input>
            </el-form-item>
            <el-form-item label="隐患发现时间">
              <el-date-picker
                v-model="report_form.foundTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期时间"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="添加附件" prop="attachment">
              <el-upload
                ref="reportuploadImage"
                :action="artical_report"
                :auto-upload="false"
                :on-remove="handleRemove"
                :data="report_form"
                :before-upload="report_before"
                :on-success="report_success"
                name="attachments"
                :on-change="beforeRemovecode"
                :limit="1"
                :on-exceed="limtex"
              >
                <el-button circle>
                  <i class="el-icon-plus"></i>
                </el-button>
                <div slot="tip" class="el-upload__tip">仅支持图片上传</div>
              </el-upload>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="resetForm('report_form')">取 消</el-button>
            <el-button type="primary" size="small" @click="labourreport">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog title="派单" :visible.sync="sendOrderdialogVisible" width="30%">
          <el-form
            label-position="right"
            label-width="120px"
            :model="orderform"
            ref="orderform"
            :rules="orderrules"
          >
            <el-form-item label="标题" prop="title">
              <el-input v-model="orderform.title"></el-input>
            </el-form-item>
            <el-form-item label="工单类型" style="height:40px">
              <el-radio v-model="workOrderType" label="risk" border>消缺</el-radio>
              <el-radio v-model="workOrderType" label="maintenance" border>维保</el-radio>
            </el-form-item>
            <el-form-item label="描述" prop="description">
              <el-input type="textarea" v-model="orderform.description"></el-input>
            </el-form-item>
            <el-form-item label="添加图片">
              <el-upload
                ref="orderuploadImage"
                :auto-upload="false"
                :data="orderform"
                name="attachments"
                :file-list="orderattachments"
                :before-upload="order_beforeupload"
                :on-success="ordersuccess"
                :action="sendOrder"
                :on-change="beforeRemovecode"
                :limit="1"
                :on-exceed="limtex"
              >
                <el-button circle>
                  <i class="el-icon-plus"></i>
                </el-button>
              </el-upload>

              <!-- <el-input v-model="orderform.type"></el-input> -->
            </el-form-item>
            <el-form-item label="执行人" prop="maintainers">
              <el-select
                multiple
                filterable
                remote
                size="small"
                v-model="orderform.maintainers"
                :remote-method="getExecutorList"
                style="width:100%"
              >
                <el-option
                  v-for="ops in executorList"
                  :key="ops.id"
                  :label="ops.name"
                  :value="ops.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="cancelorder">取 消</el-button>
            <el-button type="primary" size="small" @click="orderSend">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog
          class="showHazard"
          title="详情"
          :visible.sync="showHazardDetailsDialog"
          :close-on-click-modal="false"
          custom-class="hj-custom-dialog-wrapper--taskDetails"
          :data-type="dataType"
        >
          <hazard-details
            ref="hazardDetails"
            :query-url="queryHazardDetailsUrl"
            :event-time="hazardEventTime"
          ></hazard-details>
        </el-dialog>
        <el-dialog title="处理" :visible.sync="disposedialogVisible" width="30%">
          <el-form :model="disposeform" :rules="disposerules" ref="disposeruleForm">
            <el-form-item prop="handlingOpinion">
              <el-input
                type="textarea"
                v-model="disposeform.handlingOpinion"
                class="handlingSuggestion"
                placeholder="填写处理意见"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-tag
                v-for="item in disposeitems"
                :key="item.label"
                effect="plain"
                :type="item.type"
                style="margin-right: 10px;"
                class="lookover"
                @click="Distabclick(item)"
              >{{ item.label }}</el-tag>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancelDis" size="small">取 消</el-button>
            <el-button type="primary" size="small" @click="onselfSolve">确 定</el-button>
          </span>
        </el-dialog>
      </el-col>
    </el-col>
  </el-col>
</template>

<script>
import qs from "qs";
import pageCompent from "@/components/pagination"; //分页
import HazardDetails from "@/components/alarmHazard/alarmDetail";
import { baseUrl } from "../../../static/baseurl";
import {
  getalarmStatistics,
  getdevicesidName,
  alarmsreportArtificially,
  getsubNodesalarms,
  addworkOrders,
  riskshandlingOpinions,
  getauthmaintainers
} from "@/api/api";
export default {
  name: "alarmList",
  components: {
    HazardDetails,
    pageCompent
  },
  props: {
    dataType: {
      type: String,
      default: "total"
    }
  },
  data() {
    return {
      //报警列表
      checkboxGroup2: ["pending"],
      fileListregong: [],
      baseUrl,
      orderattachments: [],
      artical_report: baseUrl + "/alarms/reportArtificially",
      sendOrder: baseUrl + "/workOrders",
      todaymessage: {}, //报警头部的信息
      alrmstate: "", //隐患类型
      alrmgrate: "", //隐患等级
      alremtime: [], //时间搜索
      alrmskeyword: "", //关键词
      alremtableData: [], //报警列表数据
      alremstart: 0, //起始记录数
      alremsize: 8, //每页记录数
      alrempaggtatol: null, //总条数
      Artificial_report: false, //人工上报的弹框
      report_form: {
        foundTime: "",
        deviceId: "",
        description: "",
        attachments: []
      },
      reportfileList: [],
      fileList: [],
      decive_amountData: [], //设备下拉个数
      reportrules: {
        deviceId: [{ required: true, message: "选择设备", trigger: "blur" }],
        description: [
          { required: true, message: "填写隐患描述", trigger: "blur" }
        ]
      },
      sendOrderdialogVisible: false, //派单
      orderform: {
        title: "",
        maintainers: [],
        description: "",
        sourceId: "",
        sourceTime: ""
      },
      workOrderType: "risk",
      executorList: [],
      orderrules: {
        title: [
          {
            required: true,
            message: "标题不能为空",
            trigger: "blur"
          }
        ],
        maintainers: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个",
            trigger: "change"
          }
        ],
        description: [
          { required: true, message: "填写派单描述", trigger: "blur" }
        ]
      },
      showHazardDetailsDialog: false,
      queryHazardDetailsUrl: "",
      hazardEventTime: "",
      disposedialogVisible: false,
      disposeform: {
        handlingOpinion: "",
        id: "",
        time: ""
      },
      disposeitems: [
        { label: "隐患已处理", type: "info" },
        { label: "隐患已消除", type: "" },
        { label: "误报隐患,无异常", type: "success" }
      ],
      disposerules: {
        handlingOpinion: [
          { required: true, message: "处理意见不能为空", trigger: "blur" }
        ]
      },
      devicepickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ],
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    };
  },
  methods: {
    getStatistics() {
      getalarmStatistics(this.$route.params.id, this.$route.params.subid).then(
        res => {
          console.log("报警个数");
          console.log(res);
          if (res.data.head.code == 0) {
            this.todaymessage = res.data.data;
          }
        }
      );
    },
    getalremlist() {
      //报警列表
      var parms = {
        start: this.alremstart,
        size: this.alremsize,
        keyword: this.alrmskeyword,
        startTime: this.alremtime[0],
        endTime: this.alremtime[1],
        grade: this.alrmgrate,
        state: this.checkboxGroup2.join(",")
      };

      getsubNodesalarms(
        this.$route.params.id,
        this.$route.params.subid,
        parms
      ).then(res => {
        console.log("报警列表");
        console.log(res);
        if (res.data.head.code == 0) {
          this.alremtableData = res.data.data.rows;
          if (this.alremstart == 0) {
            this.alrempaggtatol = res.data.data.total;
          }
        }
      });
    },
    limtex(files, fileList) {
      // console.log(fileList);
      // console.log(files);
      if (files.length == 1) {
        this.$message("上传一张即可");
      }
    },

    alremseach() {
      //查找
      this.getalremlist();
    },
    getdeviceidlist(query) {
      var parms = {
        keyword: query
      };
      //下拉子站的列表
      getdevicesidName(this.$route.params.subid, parms).then(res => {
        console.log("---设备列表-----");
        console.log(res);
        if (res.data.head.code == 0) {
          this.decive_amountData = res.data.data;
        }
      });
    },
    labour_report() {
      // this.$refs.report_form.resetFields();
      this.Artificial_report = true;
      //人工上报的弹框
      // this.resetForm();
      // this.$refs.form.resetFields();
    },
    resetForm() {
      this.Artificial_report = false;
      this.$refs.report_form.resetFields();
      this.fileList = [];
    },
    sendOrders(index) {
      console.log(index);
      this.orderform.title = index.alarmDesc;
      //派单
      this.orderform.workOrderType = this.workOrderType;
      this.orderform.sourceTime = index.eventTime;
      this.orderform.sourceId = index.id;
      this.sendOrderdialogVisible = true;
    },
    cancelorder() {
      //取消工单
      this.$refs.orderform.resetFields();
      this.sendOrderdialogVisible = false;
    },
    order_beforeupload() {
      console.log("派单上传前");
      //上传前
      this.orderform.attachments = this.orderattachments;
    },
    ordersuccess(response, file, fileList) {
      console.log("派单上传");
      console.log(response);
      if (response.head.code == 0) {
        // this.$message({
        //   type: "success",
        //   message: "派单成功"
        // });
        this.$refs.orderform.resetFields();
        this.sendOrderdialogVisible = false;
      }
    },
    orderSend() {
      //发送工单
      // this.orderform.attachments = this.orderattachments;
      // var parms = this.orderform;
      console.log(parms);
      var parms = this.orderform;

      console.log(parms);

      if (this.fileListregong == 0) {
        this.$refs["orderform"].validate(valid => {
          if (valid) {
            addworkOrders(parms).then(res => {
              console.log("派单");
              console.log(res);
              if (res.data.head.code == 0) {
                this.$message({
                  type: "success",
                  message: "派单成功"
                });
                this.$refs.orderform.resetFields();
                this.sendOrderdialogVisible = false;
                this.fileListregong = [];
              }
            });
          }
        });
      } else {
        this.$refs["orderform"].validate(valid => {
          if (valid) {
            this.$refs.orderuploadImage.submit();
          }
        });
        this.$refs.orderform.resetFields();
        this.sendOrderdialogVisible = false;
        this.fileListregong = [];
      }
    },

    beforeRemovecode(file, filelist) {
      console.log(filelist);
      this.fileListregong = filelist;
    },

    orderDetails(index) {
      //派单详情
      console.log("派单");
      console.log(index);
      this.queryHazardDetailsUrl = index.id;
      this.hazardEventTime = index.eventTime;
      this.showHazardDetailsDialog = true;
    },
    managealrem(index) {
      console.log(index);
      this.disposedialogVisible = true;
      this.disposeform.id = index.id;
      this.disposeform.time = index.eventTime;
    },
    Distabclick(item) {
      console.log(item);
      this.disposeform.handlingOpinion = item.label;
    },
    onselfSolve() {
      this.$refs["disposeruleForm"].validate(valid => {
        riskshandlingOpinions(this.disposeform.id, this.disposeform).then(
          res => {
            console.log("==");
            console.log(res);
            if (res.data.head.code == 0) {
              this.$message({
                type: "success",
                message: "处理成功"
              });

              this.disposedialogVisible = false;
              this.$refs.disposeruleForm.resetFields();
              this.getalremlist();
            }
          }
        );
      });
    },
    cancelDis() {
      this.$refs.disposeruleForm.resetFields();
      this.disposedialogVisible = false;
    },
    report_before() {
      //this.report_form.attachments = this.reportfileList;
    },
    report_success(response, file, fileList) {
      //人工上报上传成功
      console.log("人工上报");
      console.log(response);
      if (response.head.code == 0) {
        this.$message({
          type: "success",
          message: "上报成功"
        });

        // this.$refs.report_form.resetFields();
        // this.Artificial_report = false;
      } else {
        this.$message.error(response.head.msg);
      }
    },

    labourreport() {
      //点击上传人工报告
      this.report_form.subStationId = this.$route.params.subid;
      var parms = this.report_form;

      if (this.fileListregong == 0) {
        this.$refs["report_form"].validate(valid => {
          if (valid) {
            this.$refs.reportuploadImage.submit();

            reportalrem(parms).then(res => {
              console.log("人工上报");
              console.log(res);
              if (res.data.head.code == 0) {
                this.$message({
                  type: "success",
                  message: "上报成功"
                });
                this.$refs.report_form.resetFields();
                this.Artificial_report = false;
                this.fileListregong = [];
              }
            });
          }
        });
      } else {
        //有图片的时候,
        this.$refs["report_form"].validate(valid => {
          if (valid) {
            this.$refs.reportuploadImage.submit();
            this.$refs.report_form.resetFields();
            this.Artificial_report = false;
            this.fileListregong = [];
          }
        });
      }
    },
    getExecutorList(query) {
      var parms = {
        keyword: query,
        type: "maintainer"
      };
      getauthmaintainers(parms).then(res => {
        console.log("dwdwdw");
        console.log(res);
        if (res.data.head.code == 0) {
          this.executorList = res.data.data;
        }
      });
    },

    alrempageIndexChange(index) {
      let page = (index - 1) * this.alremsize;
      this.alremstart = page;
      this.getalremlist();
    },
    changealrem() {
      this.getalremlist();
    },

    handleRemove() {
      console.log(file, fileList);
    },
    handleImageUpload(file, fileList) {
      //  console.log("file, fileList", file, fileList);
    }
  },
  mounted() {
    this.getStatistics();
    this.getalremlist(); //报敬列表
    this.getExecutorList();
    this.getdeviceidlist();
  }
};
</script>

<style lang="scss" scoped>
.titalalrm {
  width: 70%;
  display: flex;
  justify-content: space-between;
  height: 50px;
  line-height: 50px;
}
.linealrem {
  margin: 0px 40px;
  height: 20px;
  border-top: 1px solid #b6bbc6;
}
.alrmeName {
  color: #181343;
  font-family: "微软雅黑";
  font-size: 16px;
  font-weight: 400;
  margin-right: 20px;
}
.totalmessage {
  margin: 0px 10px;
  font-size: 30px;
  vertical-align: middle;
  color: #e73838;
  font-family: "微软雅黑";
}
</style>
<style >
.el-dialog__header {
  background: #0b61aa;
  color: #fff;
  font-size: 18px;
  text-align: center;
}
.el-dialog__title {
  line-height: 24px;
  font-size: 18px;
  color: #fff;
}
.checkbutton .el-checkbox-button__inner {
  padding: 9px 16px;
  border: 1px solid #dcdfe6;
  margin-right: 15px;
}
</style>