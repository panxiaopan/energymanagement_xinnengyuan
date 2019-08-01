<template>
  <el-row style="height:100%">
    <el-col :span="24" class="top_enry">
      <el-tabs v-model="activecurrent" @tab-click="handleClick" size="big">
        <el-tab-pane label="主页" name="first"></el-tab-pane>
        <el-tab-pane label="设备" name="second"></el-tab-pane>
        <el-tab-pane label="报警" name="third"></el-tab-pane>
        <el-tab-pane label="工单" name="fourth"></el-tab-pane>
      </el-tabs>
    </el-col>
    <el-row v-if="activecurrent=='first'">
      <el-col :span="24" class="mainpict">
        <el-row :gutter="20" class="SandHCollagen">
          <el-col :span="16" class="SandHCollagen">
            <div class="grid-content conctent">
              <div style="padding:20px">
                <div class="boxName">电站信息</div>
                <div class="typeradiousgood" v-if="status.value===10"></div>
                <div class="typeradiousgeneral" v-if="status.value===20"></div>
                <div class="typeradiousbad" v-if="status.value===30"></div>
                <span class="typedesc">{{status.desc}}</span>
              </div>
              <div class="phomessage">
                <div class="photovolcapacity" v-for="(item,index) in capacitydata" :key="index">
                  <div class="photovolbox">
                    <div class="photvolboxleft">
                      <img :src="eneryimg[index]" alt class="boximg" />
                    </div>
                    <div class="photvolboxright">
                      <div class="units">{{item.name+'('+item.unit+')'}}</div>
                      <div class="unitsvalue">{{item.value}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="dataimformation">
                <div v-for="(item,index) in todaydata" :key="index">
                  <div class="datamessage">
                    <div class="dataleft">
                      <img :src="todayimg[index]" alt class="boximg" />
                    </div>
                    <div class="photvolboxright">
                      <div class="unitsvalue">{{item.value}}</div>
                      <div class="units">{{item.name+'('+item.unit+')'}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="8" class="SandHCollagen">
            <div class="grid-content conctent">
              <div style="padding:20px;position:relative">
                <div class="boxName">设备状态统计</div>
                <div class="Devicetotal">
                  <div class="DeviceNumber">{{totalDevice}}</div>
                  <div class="Devicepcs">设备总数(个)</div>
                </div>
                <div style="height:320px">
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
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="24" class="mainfoot">
        <div class="mainbox">
          <div class="boxName tendency">发电趋势图</div>
          <div class="timeselect">
            <div class="timetab">
              <span class="timebox">
                <el-radio-group v-model="datatime" size="medium" @change="changetypadata">
                  <el-radio-button label="日"></el-radio-button>
                  <el-radio-button label="月"></el-radio-button>
                  <el-radio-button label="年"></el-radio-button>
                  <el-radio-button label="总"></el-radio-button>
                </el-radio-group>
              </span>
              <span class="timebox">
                <el-date-picker
                  v-model="timevalue"
                  :type="typedate"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                  @change="changetime"
                  :picker-options="pickerOptions"
                  :clearable="false"
                  :disabled="datatime=='总'"
                ></el-date-picker>
              </span>
            </div>
          </div>
          <div style="height:240px;">
            <ve-line
              v-if="datatime=='日'"
              :data="datachartData"
              height="100%"
              :xAxis="tonngxAxis"
              :yAxis="datayAxis"
              :colors="datacolor"
              :settings="datachartseting"
              :legend-visible="false"
              :grid="datagrid"
            ></ve-line>
            <ve-histogram
              v-else
              :legend-visible="false"
              :data="yearchartData"
              height="100%"
              :grid="datagrid"
              :colors="yearcolors"
              :extend="yearextend"
              :settings="yearsettings"
              :yAxis="yearyAxis"
            ></ve-histogram>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row v-if="activecurrent=='second'" class="Devicemain">
      <el-col :span="24" style="height:100%;" class="mainbox">
        <el-col :span="8" class="deviceleftlist">
          <div class="devicelist">
            <div style="padding:20px">
              <el-input placeholder="请输入设备名称" v-model="deviceName" class="input-with-select">
                <el-button slot="append" icon="el-icon-search" @click="seachDevice"></el-button>
              </el-input>
              <div class="equipmentType">设备类型</div>
              <el-select
                v-model="deviceType"
                placeholder="请选择设备类型"
                style="width:100%"
                @change="changedevicetype"
              >
                <el-option
                  v-for="item in deviceoptions"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>

              <div style="min-height:400px;">
                <div class="deviceselect" v-for="(item ,index) in device_list" :key="index">
                  <el-radio-group
                    v-model="currentradio"
                    @change="changeradio"
                    style="width:100%;height:100%"
                  >
                    <el-radio :label="index">
                      <p style="padding: 0 10px">
                        <span class="currentdeviceName">{{item.name}}</span>
                        <span style="float:right">
                          <span class="devicetype devicebreakdown" v-if="item.status.value==40"></span>
                          <span class="devicetype devicealrem" v-if="item.status.value==30"></span>
                          <span class="devicetype deviceoffline" v-if="item.status.value==20"></span>
                          <span class="devicetype devicenormal" v-if="item.status.value==10"></span>
                          {{item.status.desc}}
                        </span>
                      </p>
                      <span style="margin-left:10px">
                        <i class="el-icon-location"></i>
                      </span>
                      <span>{{item.address}}</span>
                    </el-radio>
                  </el-radio-group>
                </div>
              </div>
              <el-col :span="24" style="margin-top:20px">
                <page-compent :pageSize="size" :pagetotal="paggtatol" @fanye="pageIndexChange"></page-compent>
              </el-col>
            </div>
          </div>
        </el-col>
        <el-col :span="16" style="height:100%;padding:20px 0px;overflow:hidden">
          <div style="height:100%">
            <div class="equipmentType">设备信息</div>
            <p class="device_detail">
              <!-- {{device_list[currentradio].name}} -->
              <span>设备状态:{{device_list[currentradio].status.desc}}</span>
              <span class="devicesty">设备更新时间:{{device_list[currentradio].status.updateTime}}</span>
            </p>
            <p class="device_detail">
              <span>设备品牌:{{device_list[currentradio].brandName}}</span>
              <span class="devicesty">设备型号:{{device_list[currentradio].modelName}}</span>
            </p>
            <div>
              <el-table :data="devicetableDatamesage" height="550" border style="width: 100%">
                <el-table-column prop="measureName" label="测点名称"></el-table-column>
                <el-table-column prop="value" label="数值"></el-table-column>
                <el-table-column prop="unit" label="单位"></el-table-column>
                <el-table-column prop="address" label="查看历史">
                  <template slot-scope="scope">
                    <i
                      class="fa fa-eye lookover"
                      aria-hidden="true"
                      @click="checkinformation(scope.row)"
                    ></i>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
        <el-dialog :title="pointname" :visible.sync="DevicedialogVisible" width="40%">
          <div style="float:right">
            <el-date-picker
              v-model="valuedevicetime"
              type="daterange"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              :picker-options="devicepickerOptions"
              @change="changedevice_time"
            ></el-date-picker>
          </div>
          <div style="margin-top:20px">
            <ve-line
              :data="singlechartData"
              :legend-visible="false"
              :xAxis="singaxisLabel"
              :settings="singsettings"
              :yAxis="singsyAxis"
            ></ve-line>
          </div>

          <span slot="footer" class="dialog-footer">
            <el-button @click="DevicedialogVisible = false" size="mini">关 闭</el-button>
          </span>
        </el-dialog>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import pageCompent from "@/components/pagination"; //分页
import {
  getphotovoltaic,
  getsolardata,
  getsolaryearmonth,
  getdevice,
  getdeviceTypes,
  getdevicesrealtime,
  getdeviceIddataId
} from "@/api/api";
import {
  timeFormastart,
  timeFormanow,
  timeFormatdata,
  timeFormatmonth,
  timeFormatyear
} from "@/assets/js/common";
export default {
  components: {
    pageCompent
  },
  data() {
    return {
      currentradio: 0, //默认选中第一个
      start: 0, //起始记录数，默认为0
      size: 5, //每页记录数，默认为10
      paggtatol: null, //总条数/
      deviceType: "",
      deviceName: "", //设备名称
      deviceoptions: [], //设备类型选择
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      device_list: [], //设备列表
      devicetableDatamesage: [], //设备信息类表
      activecurrent: "first",
      capacitydata: [], //遍历装机容量
      status: {}, //光伏的状态
      DevicedialogVisible: false, //设备弹框
      valuedevicetime: [timeFormastart(new Date()), timeFormanow(new Date())], //设备时间
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
      },

      eneryimg: [
        "../../../static/imgs/install.png",
        "../../../static/imgs/power.png",
        "../../../static/imgs/generatingenergy.png",
        "../../../static/imgs/recharge.png"
      ],
      todaydata: [],
      todayimg: [
        "../../../static/imgs/red.png",
        "../../../static/imgs/blue.png",
        "../../../static/imgs/green.png"
      ],
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
        name: "数量/台"
        // splitLine: {
        //   show: false
        // }
      },
      devicelegend_top: {
        top: 25,
        right: 10
        // textStyle: {
        //   color: "#fff"
        // }
      },
      devicegrid: {
        right: 50,
        left: 50,
        bottom: 20,
        // top: -20
        top: 120
      },
      deviceamount: [], //各个设备的总数
      totalDevice: 0, //设备总数
      datatime: "日",
      timevalue: timeFormatdata(new Date()),
      typedate: "date",
      datachartData: {
        columns: ["time", "value"],
        rows: []
      },
      tonngxAxis: {
        type: "category",
        splitLine: {},
        axisTick: {},
        axisLabel: {
          formatter: function(value) {
            var str_before = value.substring(10);
            return str_before;
          }
        }
      },
      datayAxis: {
        axisLine: {
          show: true,
          lineStyle: { color: "#b1b1b1" } //y轴坐标的显示颜色
        },
        name: ""
      },
      datacolor: ["#2925C2"],
      datachartseting: {
        area: true,
        showLine: ["value"],
        legendName: {
          value: "发电功率"
        },
        labelMap: {
          value: "发电功率"
        }
      },
      datagrid: {
        right: 50,
        left: 50
      },
      yearchartData: {
        columns: ["time", "value"],
        rows: []
      },
      yearcolors: ["#6076FF"],
      yearxAxis: {
        type: "category",
        axisLabel: {
          formatter: function(value, index) {
            console.log("测试时间");
            console.log(value);
            console.log(index);
            // var str_before = value.substring(0, 10);
            // return str_before;
          }
        }
      },
      yearextend: {
        series: {
          label: { show: true, position: "top" }
        },
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
      yearyAxis: {
        axisLine: {
          show: true,
          lineStyle: { color: "#b1b1b1" } //y轴坐标的显示颜色
        },
        name: ""
      },
      yearsettings: {
        legendName: {
          value: "电量"
        },
        labelMap: {
          value: "电量"
        }
      },
      pointname: "", //点中的名字
      singlechartData: {
        columns: ["time", "value"],
        rows: []
      },
      singaxisLabel: {
        type: "category",
        splitLine: {},
        axisTick: {},
        axisLabel: {
          formatter: function(value) {
            // console.log(value)
            var str_before = value.split(" ")[0];
            var str_after = value.split(" ")[1];
            return str_after + "\n" + str_before;
          }
        }
      },
      singsettings: {
        labelMap: {
          value: "值"
        }
      },
      singsyAxis: {
        axisLine: {
          show: true,
          lineStyle: { color: "#b1b1b1" } //y轴坐标的显示颜色
        },
        name: ""
      },
      currentindex: "" //电机的单个设备
    };
  },

  methods: {
    getlist() {
      //获取光伏信息
      getphotovoltaic(this.$route.params.id, this.$route.params.subid).then(
        res => {
          console.log("==00000=====");
          console.log(res);
          if (res.data.head.code == 0) {
            this.status = res.data.data.status;
            this.capacitydata = res.data.data.statistics.slice(0, 4); //截取前四个
            this.todaydata = res.data.data.statistics.slice(-3); //截取后三个
            let data = res.data.data.deviceStatusWithCountAndTypes;
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
          }
          console.log(this.todaydata);
        }
      );
    },

    handleClick(index) {
      console.log(index);

      //
    },
    gettimedate() {
      // var myDate = new Date();
      // timeFormatdata(myDate);
      console.log("时间");
      // console.log(timeFormatdata(myDate));
      var parms = {
        date: this.timevalue
      };
      getsolardata(this.$route.params.id, parms).then(res => {
        console.log("当日");
        console.log(res);
        if (res.data.head.code == 0) {
          this.datachartData.rows = res.data.data.logs;
          this.datayAxis.name = "功率/" + res.data.data.unit;
        }
      });
    },
    getyeardata() {
      //
      let data = this.timevalue.split("-");
      if (this.timevalue == "") {
        //总
        var year = "";
        var month = "";
      } else if (this.datatime == "年") {
        var year = data[0];
        var month = "";
      } else {
        var year = data[0];
        var month = data[1];
      }
      getsolaryearmonth(this.$route.params.id, year, month).then(res => {
        console.log("年月");
        console.log(res);
        if (res.data.head.code == 0) {
          this.yearchartData.rows = res.data.data.logs;
          this.yearyAxis.name = "电量/" + res.data.data.unit;
        }
      });
    },

    changetime() {
      if (this.datatime == "日") {
        //日的时候调一个接口./其他调另外的接口
        this.gettimedate();
      } else {
        this.getyeardata();
      }
    },
    changetypadata() {
      this.timevalue = timeFormatdata(new Date());
      console.log(this.datatime);
      switch (this.datatime) {
        case "日":
          this.typedate = "date";
          this.gettimedate();
          break;
        case "月":
          this.typedate = "month";
          this.getyeardata();
          break;
        case "年":
          this.typedate = "year";
          this.getyeardata();
          break;
        default:
          this.timevalue = "";
          this.getyeardata();
          break;
      }
    },
    getdevicelist() {
      //获取子站的设备列表\
      var parms = {
        start: this.start,
        size: this.size,
        keyword: this.deviceName,
        deviceType: this.deviceType
      };
      getdevice(this.$route.params.id, this.$route.params.subid, parms).then(
        res => {
          console.log("=设备==");
          console.log(res);
          if (res.data.head.code == 0) {
            this.device_list = res.data.data.rows;
            if (this.start == 0) {
              //因为就第一次的时候总数是对的,,
              //页面值过来了一次
              this.paggtatol = res.data.data.total;
            }
          }
        }
      );
    },

    getdevicetype() {
      //设备类型
      getdeviceTypes(this.$route.params.id, this.$route.params.subid).then(
        res => {
          console.log("设备类型");
          console.log(res);
          if (res.data.head.code == 0) {
            this.deviceoptions = res.data.data;
          }
        }
      );
    },
    getdevicedDeil() {
      //实时数据
      getdevicesrealtime(this.device_list[this.currentradio].id).then(res => {
        console.log("实时数据");
        console.log(res);
        if (res.data.head.code == 0) {
          this.devicetableDatamesage = res.data.data;
        }
      });
    },

    pageIndexChange(index) {
      console.log(index);
      let page = (index - 1) * this.size;
      this.start = page;
      this.getdevicelist();
      //分页
    },

    changedevicetype() {
      //设备类型
      console.log(this.deviceType);
      this.getdevicelist();
      setTimeout(() => {
        this.getdevicedDeil();
      }, 500);
    },
    seachDevice() {
      //关键词查找
      this.getdevicelist();
    },
    changeradio() {
      console.log(this.currentradio);
      this.getdevicedDeil();
    },
    checkinformation(index) {
      //查看设备信息
      this.valuedevicetime = [
        timeFormastart(new Date()),
        timeFormanow(new Date())
      ];
      console.log(index);
      this.pointname = index.measureName;
      this.currentindex = index.dataId;
      this.DevicedialogVisible = true;
      this.getsingdevicedetail();
    },

    getsingdevicedetail() {
      var parms = {
        startTime: this.valuedevicetime[0],
        endTime: this.valuedevicetime[1]
      };
      getdeviceIddataId(
        this.device_list[this.currentradio].id,
        this.currentindex,
        parms
      ).then(res => {
        console.log("------单个设备");
        console.log(res);
        if (res.data.head.code == 0) {
          this.singlechartData.rows = res.data.data.logs;
          this.singsyAxis.name = "单位/" + res.data.data.unit;
        }
      });
    },

    changedevice_time() {
      this.getsingdevicedetail();
      console.log(this.valuedevicetime);
    }
  },
  mounted() {
    this.getlist();
    this.getdevicetype();
    this.getdevicelist();

    console.log(this.$route.params);
    this.gettimedate();
    setTimeout(() => {
      this.getdevicedDeil();
    }, 500);

    // console.log(myDate.getMonth());
    // console.log(myDate.getDate()); //获取当前日(1-31)
  }
};
</script>

<style lang="scss" scoped>
.photovolbox {
  // border: 1px solid red;
  height: 100px;
  vertical-align: middle;
  display: inline-block;
  line-height: 100px;
  width: 210px;
  .photvolboxleft {
    display: inline-block;
    width: 60px;
    height: 60px;
    background: #7383e7;
    vertical-align: middle;
    border-radius: 5px;
    line-height: 60px;
  }
}
.photovolcapacity {
  border: 1px solid #efefef;
  box-shadow: 0px 0px 8px 6px rgba(245, 245, 250, 0.8);
  width: 240px;
  height: 100px;
  text-align: center;
  border-radius: 5px;
  display: inline-block;
  vertical-align: middle;
  line-height: 100px;
}
.boximg {
  vertical-align: middle;
}
.photvolboxright {
  display: inline-block;
  width: 120px;
  height: 60px;
  //border: 1px solid red;
  vertical-align: middle;
  .units {
    height: 20px;
    line-height: 20px;
    font-family: "微软雅黑";
  }
  .unitsvalue {
    height: 40px;
    line-height: 40px;
    font-weight: 800;
    font-size: 24px;
    font-family: "微软雅黑";
  }
}

.SandHCollagen {
  height: 100%;
}
.mainpict {
  height: 50%;
  // border: 1px solid red;
  min-height: 400px;
  padding: 20px;
  .conctent {
    height: 100%;
    border: 1px solid #ededed;
    box-shadow: 0px 0px 8px 6px rgba(245, 245, 250, 0.8);
    background: #fff;
    border-radius: 5px;
  }
}

.bg-purple {
  background: #d3dce6;
}
.dataimformation {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.grid-content {
  border-radius: 4px;
  height: 100%;
}
.boxName {
  font-family: "微软雅黑";
  color: #181343;
  font-size: 16px;
  font-weight: 800;
  display: inline-block;
}
.typeradiousbad {
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 7px;
  background: #ff8a8a;
  vertical-align: middle;
  margin-left: 20px;
}
.typeradiousgeneral {
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 7px;
  background: #fad893;
  vertical-align: middle;
  margin-left: 20px;
}
.typeradiousgood {
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 7px;
  background: #8be9a1;
  vertical-align: middle;
  margin-left: 20px;
}
.typedesc {
  font-family: "微软雅黑";
  font-size: 14px;
  color: "#636F8A";
  padding-left: 10px;
}
.phomessage {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.dataleft {
  display: inline-block;
  width: 60px;
  height: 60px;
  vertical-align: middle;
  border-radius: 5px;
  line-height: 60px;
  // border: 1px solid;
}
.datamessage {
  border-right: 1px solid #dadde2;
  padding: 20px;
}
.Devicetotal {
  position: absolute;
  top: 46px;
  left: 133px;
}
.DeviceNumber {
  padding-top: 10px;
  font-family: "微软雅黑";
  font-size: 20px;
  font-weight: 800;
}
.DeviceTotal {
  font-size: 20px;
  font-family: "微软雅黑";
  font-weight: 800;
  margin-bottom: 20px;

  .Devicepcs {
    padding-top: 10px;
    font-family: "微软雅黑";
    font-size: 14px;
    color: #636f8a;
  }
}
.mainfoot {
  height: calc(50% - 10px);
  // border: 1px solid red;
  padding: 20px 20px 0px 20px;
  min-height: 380px;
}
.mainbox {
  height: 100%;
  border: 1px solid #ededed;
  box-shadow: 0px 0px 8px 6px rgba(245, 245, 250, 0.8);
  background: #fff;
  border-radius: 5px;
}
.tendency {
  display: inline-block;
  padding: 20px;
}
.timeselect {
  height: 60px;
  // border: 1px solid red;
}
.timetab {
  float: right;
}
.timebox {
  padding-right: 100px;
}
.Devicemain {
  height: 100%;
  // border: 1px solid blue;
  padding: 80px 20px 0px 20px;
}
.devicelist {
  height: 100%;
  border: 1px solid #ededed;
  box-shadow: 0px 0px 8px 6px rgba(245, 245, 250, 0.8);
  border-radius: 5px;
  overflow: hidden;
}
.deviceleftlist {
  height: 100%;
  // border: 1px solid;
  padding: 20px 70px;
}
.equipmentType {
  font-family: "微软雅黑";
  font-size: 14px;
  color: #181343;
  height: 40px;
  line-height: 40px;
  font-weight: 800;
}
.currentdeviceName {
  font-family: "微软雅黑";
  font-size: 16px;
  font-weight: 800;
}
.devicetype {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  vertical-align: middle;
}
.devicealrem {
  background: #f85e36;
}
.deviceoffline {
  background: #799bc0;
}
.devicenormal {
  background: #84be62;
}
.devicebreakdown {
  background: #ffbb1e;
}

.deviceselect {
  height: 80px;
  line-height: 80px;
  margin-top: 20px;
  // border: 1px solid;
}

.device_detail {
  width: 40%;
  font-size: 14px;
  font-family: "微软雅黑";
  color: #606266;
  .devicesty {
    float: right;
    width: 60%;
  }
}
.lookover {
  cursor: pointer;
}
</style>
<style>
.top_enry .el-tabs__nav-scroll {
  padding-left: 30px;
}
.deviceselect .el-radio__inner {
  display: none;
}
.deviceselect .el-radio {
  width: 100%;
  height: 100%;
  /* vertical-align: middle;
  line-height: 80px; */
  vertical-align: top;
}
.deviceselect .is-checked {
  background: aliceblue;
}
</style>