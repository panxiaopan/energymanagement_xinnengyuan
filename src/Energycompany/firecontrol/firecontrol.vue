<template>
  <el-row style="height: calc(100% - 10px );  ">
    <el-col :span="24" class="top_enry">
      <el-tabs v-model="activecurrent" @tab-click="handleClick" size="big" class="toptab">
        <el-tab-pane label="主页" name="first"></el-tab-pane>
        <el-tab-pane label="设备" name="second"></el-tab-pane>
        <el-tab-pane label="报警" name="third"></el-tab-pane>
        <el-tab-pane label="工单" name="fourth"></el-tab-pane>
      </el-tabs>
    </el-col>

    <el-row class="Devicemain" v-if="activecurrent=='first'">
      <el-col :span="24">
        <el-col :span="8" class="rechargebox rechargeboxleft">
          <div class="mainbox">
            <div style="padding:20px">
              <div class="boxName">运行信息</div>
              <div class="typeradiousgood" v-if="status.value===10"></div>
              <div class="typeradiousgeneral" v-if="status.value===20"></div>
              <div class="typeradiousbad" v-if="status.value===30"></div>
              <span class="typedesc">{{status.desc}}</span>
            </div>
            <ve-bar
              :data="operationchartData"
              height="100%"
              :label="labelvebar"
              :settings="operationsetting"
              :extend="operaextend"
              :legend-visible="false"
              :grid="operation_grid"
            ></ve-bar>
          </div>
        </el-col>
        <el-col :span="8" class="rechargebox rechargeboxleft">
          <div class="mainbox">
            <div style="padding:20px">
              <div class="boxName">设备状态统计</div>
              <div style="padding:20px;position:relative">
                <div class="storedDevicetotal">
                  <div class="DeviceNumber">{{totalDevice}}</div>
                  <div class="Devicepcs">设备总数(个)</div>
                </div>
                <div style="height:400px">
                  <ve-histogram
                    :data="devicechartData"
                    :settings="devicechartSettings"
                    :extend="devicechartExtend"
                    :yAxis="deviceyAxisOption"
                    :legend="devicelegend_top"
                    height="100%"
                    :grid="devicegrid"
                    :colors="deviceColor"
                  ></ve-histogram>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="8" class="rechargebox rechargeboxleft">
          <div class="mainbox">
            <div style="padding:20px">
              <div class="boxName">未处理隐患列表</div>
              <div style="display:inline-block;float:right;margin-right:10px">
                <el-button type="text" @click="evenmore">更多</el-button>
                <i class="el-icon-arrow-right"></i>
              </div>
              <div class="danger_h_j">
                <div v-for="(item,index) in Hidden_trouble" :key="index">
                  <div class="danger_concent">
                    <span style="width:160px;padding-left:10px">{{item.time}}</span>
                    <span style="width:130px">{{item.device.name}}</span>
                    <!-- <span style="width:100px">{{item.device.address}}</span> -->
                    <span style="width:140px">{{item.detail}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-col>
      <el-col :span="24" style="height:315px">
        <el-col :span="8" class="riskranheight" style="padding:20px 20px 0px 0px">
          <div class="mainbox">
            <div style="padding:20px 20px 0px 20px">
              <div class="boxName">风险排行统计</div>
            </div>
            <ve-histogram
              :data="riskchartData"
              height="315px"
              :extend="riskchartExtend"
              :colors="riskColor"
              :yAxis="riskyAxisOption"
              :legend-visible="false"
              :grid="risk_grid"
              :tooltip="risktooltip"
              :settings="riskchartSettings"
            ></ve-histogram>
          </div>
        </el-col>
        <el-col :span="16" class="riskranheight rechargebox" style="padding:20px 20px 0px 0px; ">
          <div class="mainbox">
            <div style="padding:20px 20px 0px 20px">
              <div class="boxName">近30天隐患趋势图</div>
            </div>
            <div style="float:right;position:relative;z-index:1000;margin-right:50px">
              <el-select
                v-model="Hazard_type"
                @change="changeHazardType"
                placeholder="请选择"
                size="mini"
              >
                <el-option
                  v-for="(item,index) in Hazardoptions"
                  :key="index"
                  :label="item.deviceType"
                  :value="item"
                ></el-option>
              </el-select>
            </div>
            <div>
              <ve-line
                :data="HazardchartData"
                height="315px"
                :settings="Hazardsetting"
                :xAxis="xAxisOption"
                :grid="Hazard_grid"
                :legend="Hazard_legend"
                :yAxis="Hazard_yAxis"
                :colors="HazardColor"
              ></ve-line>
            </div>
          </div>
        </el-col>
      </el-col>

      <el-col :span="24" style="margin-top:90px">
        <el-col :span="8" style="height:300px;padding:0px 20px 0px 0px ">
          <div class="mainbox">
            <div class="padding20">
              <span class="boxName">温度探测器状态排名</span>

              <div style="float:right;margin-right:20px">
                <el-link type="primary" @click="temperadialogTableVisible=true">
                  更多
                  <i class="el-icon-arrow-right"></i>
                </el-link>
              </div>
            </div>

            <div>
              <el-dialog title="温湿度探测器排名" :visible.sync="temperadialogTableVisible">
                <div style=" margin-bottom:20px;">
                  <el-input
                    style="width:300px"
                    placeholder="请输入查询内容"
                    v-model="keyword"
                    @keyup.native.enter="gettemlist()"
                  >
                    <el-button slot="append" icon="el-icon-search" @click="findeone"></el-button>
                  </el-input>
                </div>

                <el-table :data="temperagridData" border>
                  <el-table-column type="index" label="序号" width="50"></el-table-column>
                  <el-table-column label="名称"  :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                      <el-link type="primary" @click="deviceDital(scope.row)">
                        <span>{{scope.row.device.name}}</span>
                      </el-link>
                    </template>
                  </el-table-column>
                  <el-table-column label="位置">
                    <template slot-scope="scope">{{scope.row.device.location}}</template>
                  </el-table-column>
                  <el-table-column label="数值">
                    <template slot-scope="scope">
                      {{scope.row.valueUnit.value}}
                      {{scope.row.valueUnit.unit}}
                    </template>
                  </el-table-column>
                  <el-table-column label="状态">
                    <template slot-scope="scope">{{scope.row.status.desc}}</template>
                  </el-table-column>
                  <el-table-column label="更新时间" width="180">
                    <template slot-scope="scope">{{scope.row.status.updateTime}}</template>
                  </el-table-column>
                </el-table>
                <el-col :span="24" style="margin-top:20px">
                  <page-compent :pageSize="size" :pagetotal="temtatol" @fanye="pageIndexChange"></page-compent>
                </el-col>

                <span slot="footer" class="dialog-footer">
                  <el-button size="small" @click="temperadialogTableVisible=false">关 闭</el-button>
                </span>
              </el-dialog>

              <div style="padding:0px 20px;margin-top:10px">
                <el-table :data="tempertableData" style="width: 100%" size="mini" border>
                  <el-table-column type="index" label="排序" width="100"></el-table-column>
                  <el-table-column prop="name" label="名称" width="180">
                    <template slot-scope="scope">
                      <el-link
                        type="primary"
                        @click="deviceDital(scope.row)"
                      >{{scope.row.device.name}}</el-link>
                    </template>
                  </el-table-column>
                  <el-table-column prop="address" label="数值">
                    <template slot-scope="scope">
                      {{scope.row.valueUnit.value }}
                      {{scope.row.valueUnit.unit}}
                    </template>
                  </el-table-column>
                  <el-table-column prop="address" label="状态">
                    <template slot-scope="scope">{{scope.row.status.desc}}</template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="16" style="height:300px;padding:0px 20px 0px 0px">
          <div class="mainbox">
            <div class="padding20">
              <span class="boxName">环境监测</span>
            </div>
            <div style="padding:20px ;">
              <div class="mentPoint" v-for="(item,index) in humitureData " :key="index">
                <div class="mainbox">
                  <div class="mentpoint_title">
                    <el-link @click="deviceDital(item)" type="primary">{{item.device.name}}</el-link>
                  </div>
                  <div class="templuter">
                    <span>{{item.temperature.measureName}}</span>
                    <span>
                      {{item.temperature.valueUnit.value}}
                      {{item.temperature.valueUnit.unit}}
                    </span>
                  </div>
                  <div class="templuter">
                    <span>{{item.humidity.measureName}}</span>
                    <span>
                      {{item.humidity.valueUnit.value}}
                      {{item.humidity.valueUnit.unit}}
                    </span>
                  </div>
                  <div class="templuter">
                    <span>{{item.smokeDetector.measureName}}</span>
                    <span>{{item.smokeDetector.status.desc}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-col>
    </el-row>
    <el-row
      v-if="activecurrent=='second'"
      class="Devicemain"
      style="margin-top:20px;height:calc(100% - 20px ) "
    >
      <device-page :device-nametitle="deviceName"></device-page>
    </el-row>
    <el-row
      v-if="activecurrent=='third'"
      class="Devicemain"
      style="margin-top:20px; height:calc(100% - 20px ) "
    >
      <alarm-list></alarm-list>
    </el-row>
    <el-row
      v-if="activecurrent=='fourth'"
      class="Devicemain"
      style="margin-top:20px; height:calc(100% - 20px ) "
    >
      <el-col :span="24" class="mainboxfour">
        <task-list
          list-type="workOrder"
          ref="workOrder"
          style="margin: 20px 40px"
          :subid="this.$route.params.subid"
        ></task-list>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import { getsubstation, temperatureDetectors } from "@/api/api";
import pageCompent from "@/components/pagination"; //分页
import devicePage from "@/components/syllogeDevice/equipment"; //设备
import alarmList from "@/components/syllogeAlarm/alarmlist"; //报警列表
import TaskList from "@/components/task-list"; //工单
import {
  timeFormastart,
  timeFormanow,
  timeFormatdata,
  timeFormatmonth,
  timeFormatyear
} from "@/assets/js/common";
export default {
  components: {
    pageCompent,
    TaskList,
    devicePage,
    alarmList
  },
  data() {
    return {
      activecurrent: "first",
      status: {},
      operationchartSettings: {
        metrics: ["运维工单"]
      },
      operationchartData: {
        columns: ["desc", "count"],
        rows: []
      },
      labelvebar: {
        normal: {
          position: "right",
          show: true
        }
      },
      operationsetting: {
        labelMap: {
          count: "数量"
        },
        itemStyle: {
          color: function(item) {
            var colorlist = ["#F3494D", "#DDC176", "#00CC92"];
            return colorlist[item.dataIndex];
            0;
          }
        }
      },
      operaextend: {
        series: {
          label: { show: true, position: "right" },
          barWidth: 25
        }
      },
      operation_grid: {
        left: 40,
        bottom: 90,
        top: 30,
        right: 60
      },
      totalDevice: 0, //设备总数
      devicechartData: {
        //能源汇总
        columns: ["类型", "正常", "离线", "报警", "故障"],
        rows: []
      },
      devicechartSettings: {
        stack: { 类型: ["正常", "离线", "报警", "故障"] },
        textStyle: {
          color: "#fff"
        },
        itemStyle: {
          //color: ["#c23531", "#2f4554", "#61a0a8", "#ca8622"]
        }
      },
      deviceColor: ["#00CC92", "#adadad", "red", "#FF9D6B"],
      devicechartExtend: {
        barWidth: "30px",
        top: "-20px",
        barCategoryGap: "10%",
        barGap: "10%",
        xAxis: {
          axisLine: {
            show: true,
            lineStyle: { color: "#b1b1b1" } //x轴坐标的显示颜色
          }
        }
      },
      deviceyAxisOption: {
        axisLine: {
          show: true,
          lineStyle: { color: "#b1b1b1" } //y轴坐标的显示颜色
        },
        name: "数量/台",
        // splitLine: {
        //   show: false
        // }
        minInterval: 1
      },
      devicelegend_top: {
        top: 25,
        right: 10
        // textStyle: {
        //   color: "#fff"
        // }
      },
      devicegrid: {
        right: 20,
        left: 20,
        bottom: 90,
        // top: -20
        top: 80
      },
      deviceamount: [], //各个设备的总数
      Hidden_trouble: [], //隐患列表
      riskchartData: {
        columns: ["deceName", "aount"],
        rows: []
      },
      riskchartSettings: {
        // metrics: ["数量",],
      },
      risktooltip: {
        trigger: "axis",
        formatter: params => {
          let _this = this;
          let i = params[0].dataIndex;
          var res = `${this.riskchartData.rows[i].sounName}<br/>位置:${this.riskchartData.rows[i].adress}<br/>名称:${this.riskchartData.rows[i].deceName}`;
          return res;
        }
      },
      risk_grid: {
        left: 40,
        bottom: 20,
        top: 40,
        right: 40
      },
      riskXaxis: {
        type: "category",
        axisLine: {
          show: true,
          lineStyle: { color: "#b1b1b1" } //y轴坐标的显示颜色
        }
      },

      riskchartExtend: {
        series: {
          label: { show: true, position: "top" }
        },
        barWidth: "25px",
        xAxis: {
          axisLine: {
            show: true,
            lineStyle: { color: "#b1b1b1" } //y轴坐标的显示颜色
          }
        }
      },
      riskColor: ["#7E56FF"],
      riskyAxisOption: {
        type: "value",
        axisLine: {
          show: true,
          lineStyle: { color: "#b1b1b1" } //y轴坐标的显示颜色
        },
        name: "数量/台",
        splitLine: {
          show: false
        },
        minInterval: 1
      },
      scatterchartData: {
        columns: ["time", "count"],
        rows: []
      }, //当日趋势散点图
      scattersetting: {
        labelMap: {
          time: "时间",
          count: "数量",
          detail: "隐患"
        }
      },
      scatter_grid: {
        left: 60,
        bottom: 80,
        top: 80,
        right: 40
      },
      scacolor: ["#F04464"],
      scayAxis: {
        axisLine: {
          show: true,
          lineStyle: { color: "#b1b1b1" } //y轴坐标的显示颜色
        },
        name: "数量/台",
        splitLine: {
          show: false
        },
        minInterval: 1
      },
      scaxAxisOption: {
        type: "category",
        axisLine: {
          show: true,
          lineStyle: { color: "#b1b1b1" }
        },
        axisLabel: {
          formatter: function(value) {
            var str_before = value.substring(10);
            // var str_after = value.split(" ")[1];
            return str_before;
          }
        }
      },
      scalegend: {
        top: 20
      },
      Hazard_type: "", //隐患类型
      Hazardoptions: [], //隐患类型数组
      HazardchartData: {
        //隐患
        columns: ["time", "riskDevcieCount", "riskCount", "handledCount"],
        rows: []
      },
      Hazardsetting: {
        offsetY: 20,
        labelMap: {
          riskCount: "隐患数量",
          handledCount: "已处理数量",
          riskDevcieCount: "隐患设备数"
        }
      },
      Hazard_grid: {
        // top: 150,
        bottom: 50,
        right: 50,
        left: 50
      },
      xAxisOption: {
        //修改截取的时间
        type: "category",
        axisLabel: {
          formatter: function(value) {
            var str_before = value.substring(5, 10);
            // var str_after = value.split(" ")[1];
            return str_before;
          }
        }
      },
      Hazard_legend: {
        top: -1
      },
      Hazard_yAxis: {
        axisLine: {
          show: true,
          lineStyle: { color: "#b1b1b1" } //y轴坐标的显示颜色
        },
        name: "数量/台",
        splitLine: {
          show: false
        },
        minInterval: 1
      },
      HazardColor: ["#FB5A6E", "#6076FF", "#11CF98"],
      calcktype: false,
      temperagridData: [],
      start: 0,
      size: 10,
      temtatol: 0,
      deviceName: "", //传递点击设备的名称
      humitureData: [], //温湿度
      temperadialogTableVisible: false,
      tempertableData: [], //温度探测排名
      keyword: ""
    };
  },
  watch: {
    activecurrent() {
      if (this.activecurrent !== "second") {
        //只要切换的时候,,还是从原来的列表
        this.deviceName = "";
      }
    }
  },
  methods: {
    handleClick() {},
    getsubSummary() {
      getsubstation(this.$route.params.id, this.$route.params.subid).then(
        res => {
          console.log("总---汇");
          console.log(res);
          if (res.data.head.code == 0) {
            this.tempertableData = res.data.data.temperaturePoints;
            this.humitureData = res.data.data.deviceEnvironmentData;
            this.status = res.data.data.status;
            this.operationchartData.rows =
              res.data.data.workOrderStatusStatistic; //  工单统计
            let data = res.data.data.deviceStatusWithCountAndTypes;
            this.devicechartData.rows = [];
            this.deviceamount = [];
            for (let i in data) {
              let temp = {};
              let devitotal = {};
              let devicenum = 0;
              for (let n of data[i].deviceStatusWithCounts) {
                temp[n["desc"]] = n.count;
                temp["类型"] = data[i].type;
                devicenum += n.count;
                devitotal["type"] = data[i].type;
                devitotal["total"] = devicenum;
              }

              this.devicechartData.rows.push(temp);
              this.deviceamount.push(devitotal);
            }
            for (let k = 0; k < this.deviceamount.length; k++) {
              this.totalDevice += this.deviceamount[k].total; //总数,
            }
            this.Hidden_trouble = res.data.data.realtimeAlarm.alarms.slice(
              0,
              6
            ); //未处理隐患列表
            this.riskchartData.rows = [];
            res.data.data.deviceWithAlarmCountTops.forEach((item, index) => {
              this.riskchartData.rows.push({
                deceName: item.device.name,
                adress: item.device.address,
                aount: item.alarmCount,
                sounName: item.station.name
              });
            });
            this.scatterchartData.rows = res.data.data.todayAlarmSummary.alarms; //今日隐患排行
            this.Hazardoptions = res.data.data.alarmTrend; //隐患类型

            if (this.calcktype === false) {
              console.log("diyixi");
              this.HazardchartData.rows = this.Hazardoptions[0].trends;
              this.Hazard_type = this.Hazardoptions[0].deviceType; //默认第一个
            }
          }
        }
      );
    },
    changeHazardType(value) {
      //选择不同隐患类型的设备的时候
      console.log("-=====");
      console.log(value);
      console.log(this.Hazardoptions);
      this.calcktype = true;
      for (let i in this.Hazardoptions) {
        if (this.Hazardoptions[i].deviceType === value.deviceType) {
          this.HazardchartData.rows = this.Hazardoptions[i].trends;
          this.Hazard_type = this.Hazardoptions[i].deviceType;
        }
      }

      this.getsubSummary();
      console.log(this.HazardchartData.rows.length);
    },
    evenmore() {
      console.log("路由----");
      console.log(this.$route);
      this.activecurrent = "third";
    },
    pageIndexChange(index) {
      let page = (index - 1) * this.size;
      this.start = page;
      this.gettemlist();
    },
    gettemlist() {
      var params = {
        keyword: this.keyword,
        start: this.start,
        size: this.size
      };
      temperatureDetectors(this.$route.params.subid, params).then(res => {
        console.log("表格");
        console.log(res);
        if (res.data.head.code == 0) {
          this.temperagridData = res.data.data.rows;
          if (this.start == 0) {
            this.temtatol = res.data.data.total;
          }
        }
      });
    },
    deviceDital(row) {
      console.log("--设备--");
      console.log(row);
      this.deviceName = row.device.name;
      this.activecurrent = "second";
    },
    findeone() {
      this.gettemlist();
    }
  },
  mounted() {
    this.gettemlist();
    this.getsubSummary();
  }
};
</script>

<style lang="scss" scoped>
.rechargebox {
  height: 400px;
  //padding: 20px;
}
.rechargeboxleft {
  padding: 20px 20px 0px 0px;
}

.danger_h_j {
  /* margin-top:10px; */
  height: 65%;
  min-height: 50px;
  overflow-y: auto;
  /* border: 1px solid red; */
  width: 100%;
}
.danger_concent {
  /* width: 100%; */
  height: 30px;
  line-height: 30px;
  background: #f2f5fb;
  font-family: "微软雅黑";
  color: #313131;
  margin: 10px;
  display: table;
}
.danger_concent > span {
  display: table-cell;
}
.riskranheight {
  height: 380px;
  //padding: 20px;
}
.templuter {
  height: 40px;
  line-height: 40px;
  padding-left: 15px;
}
.mentpoint_title {
  height: 37px;
  border-bottom: 1px solid #e5e5e5;
  line-height: 37px;
  padding-left: 15px;
}
.mentPoint {
  display: inline-block;
  width: 162px;
  height: 168px;
  font-family: Microsoft YaHei;
  color: rgba(99, 111, 138, 1);
  margin-right: 60px;
}
</style>
<style>
.top_enry .el-tabs__nav-scroll {
  padding-left: 30px;
}
</style>