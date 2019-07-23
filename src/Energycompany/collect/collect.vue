<template>
  <!-- <div>
    汇总
    <span class="ceshi">dwdwdwdwdw</span>
  </div>-->
  <el-row class="mian_enery">
    <el-col :span="24" class="top_enry">
      <el-tabs v-model="activecurrent" @tab-click="handleClick" size="big">
        <el-tab-pane label="视图" name="first"></el-tab-pane>
        <el-tab-pane label="概述" name="second"></el-tab-pane>
      </el-tabs>
    </el-col>
    <el-col :span="24">
      <div class="EnergySystem" style="margin-top:20px">
        <div class="titleName">
          <div class="titlefont">智慧能源站信息</div>
        </div>
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
    </el-col>
    <el-col :span="24">
      <div class="EnergySystem">
        <div class="titleName">
          <div class="titlefont">光伏</div>
        </div>
        <div class="photovoltaic"></div>
        <div style="height:300px">
          <ve-line
            :data="CPVchartData"
            :settings="CPVchartSettings"
            height="100%"
            :yAxis="CPVyAxis"
            :legend-visible="false"
            :colors="CPVcolors"
            :xAxis="CPVxAxis"
            :extend="CPVchartExtend"
            :grid="CPVgrid"
          ></ve-line>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getstationssummary } from "@/api/api";
export default {
  data() {
    return {
      activecurrent: "first",
      stationName: "",
      deviceamount: [], //各个设备的总数,
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
        // top: 60,
        // width: 140,
        // right: 70,
        // textStyle: {
        //   color: "#fff"
        // }
      },
      devicegrid: {
        bottom: 100,
        // top: 80,
        right: 70,
        left: 70
      },
      CPVchartData: {
        //光伏
        columns: ["time", "value"],
        rows: []
      },
      CPVchartSettings: {
        area: true,
        legendName: {
          value: "发电量"
        },
        labelMap: {
          value: "发电量"
        }
      },
      CPVcolors: ["#2925C2"],
      CPVyAxis: {
        //设置Y 轴
        axisLine: {
          show: true,
          lineStyle: { color: "#b1b1b1" } //y轴坐标的显示颜色
        },
        name: "功率/千瓦"
        // splitLine: {
        //   show: false
        // }
      },
      CPVxAxis: {
        type: "category",
        splitLine: {},
        axisTick: {},
        axisLabel: {
          formatter: function(value) {
            var str_before = value.substring(10);
            // var str_after = value.split(" ")[1];
            return str_before;
          }
        }
      },
      CPVchartExtend: {
        //显示x轴的颜色
        // xAxis: {
        //   axisLine: {
        //     show: true,
        //     lineStyle: { color: "#b1b1b1" } //x轴坐标的显示颜色
        //   }
        // }
      },
      CPVgrid: {
        bottom: 100,
        // top: 80,
        right: 70,
        left: 70
      }
    };
  },
  methods: {
    handleClick() {
      console.log(this.activecurrent);
    },
    getstationlist() {
      //获取总汇数据
      var stationId = this.$route.params.id;
      getstationssummary(stationId).then(res => {
        console.log("=====");
        console.log(res);
        if (res.data.head.code == 0) {
          this.stationName = res.data.data.stationConfigOverview.name;
          sessionStorage.setItem("station", this.stationName);
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
            //console.log(this.deviceamount);
            // console.log(devicenum);
          }

          this.CPVchartData.rows =
            res.data.data.SubsystemSummary.solarSummary.todayActivePowers.logs;
        }
      });
      // console.log(getstationssummary);
    }
  },
  mounted() {
    this.getstationlist();
  }
};
</script>

<style lang="scss" scoped>
.EnergySystem {
  border: 1px solid #ededed;
  border-radius: 5px;
  height: 454px;
  margin: 0px 20px 20px 20px;
  box-shadow: 0px 0px 8px 6px rgba(245, 245, 250, 0.8);
  background: #fff;
}
.titleName {
  height: 60px;
  background: #f5f5fa;
  line-height: 60px;
}
.titlefont {
  font-family: "微软雅黑";
  color: "#181343";
  font-weight: 800;
  font-size: 16px;
  padding-left: 20px;
}
.top_enry {
  height: 60px;
  background: #fff;
  //padding-left: 30px;
}
.photovoltaic {
  height: 150px;
  border-bottom: 1px solid #b6bbc6;
}
</style>
<style>
.top_enry .el-tabs__nav-scroll {
  padding-left: 30px;
}
</style>
