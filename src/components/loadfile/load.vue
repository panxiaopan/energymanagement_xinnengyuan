<template>
  <el-col :span="24" style="width:100%;height:100%">
    <div class="mainbox">
      <el-col :span="24" style="height:100%">
        <el-col :span="5" style="height:100%;padding:20px;">
          <div class="electricleft">
            <div style="margin-top:20px">
              <div style="margin-bottom:20px">
                <el-input placeholder="输入关键字进行过滤" v-model="loadfifter"></el-input>
              </div>
              <el-tree
                class="filter-tree"
                :data="loaddata"
                :props="defaultProps"
                default-expand-all
                :filter-node-method="loadfilterNode"
                @node-click="loadnodeclick"
                :expand-on-click-node="false"
                :highlight-current="true"
                accordion
                ref="tree"
                node-key="id"
                :current-node-key="this.loaddefalutnone"
              ></el-tree>
            </div>
          </div>
        </el-col>
        <el-col :span="19" style="height:100%">
          <div style="height:60px;border:1px solid;margin-top:40px;line-height:60px ">
            <div class="time_share">负荷-图型</div>
            <div class="timeselect">
              <div class="timetab">
                <span class="timebox">
                  <el-radio-group v-model="loaddatatime" size="medium" @change="loadchangetypadata">
                    <el-radio-button label="日"></el-radio-button>
                    <el-radio-button label="月"></el-radio-button>
                    <el-radio-button label="年"></el-radio-button>
                  </el-radio-group>
                </span>
                <span class="timebox">
                  <el-button
                    icon="el-icon-arrow-left"
                    circle
                    @click="previous"
                    :disabled="loaddatatime=='总'"
                  ></el-button>
                  <el-date-picker
                    v-model="loadtimevalue"
                    :type="loadtypedate"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                    @change="changetime"
                    :picker-options="pickerOptions"
                    :clearable="false"
                    :disabled="loaddatatime=='总'"
                  ></el-date-picker>
                  <el-button
                    icon="el-icon-arrow-right"
                    circle
                    @click="gonext"
                    :disabled="loaddatatime=='总'"
                  ></el-button>
                </span>
              </div>
            </div>
            <div style="height:380px;border:1px solid ">
              <ve-line
                :data="loadchartData"
                :colors="loadcolors"
                :xAxis="xAxisOption"
                :yAxis="voltageyAxis"
              ></ve-line>
            </div>
            <div style="height:280px;border:1px solid red ">
              <div class="time_share">负荷-表格</div>

              <!-- <el-table :data="dataload">
                <el-table-column label="Name"></el-table-column>
                <el-table-column label="Name"></el-table-column>
                <el-table-column label="Name"></el-table-column>
                <el-table-column>
                </el-table-column>
              </el-table>-->
              <div class="load_box"></div>
            </div>
          </div>
        </el-col>
      </el-col>
    </div>
  </el-col>
</template>

<script>
import {
  timeFormastart,
  timeFormanow,
  timeFormatdata,
  timeFormatmonth,
  timeFormatyear
} from "@/assets/js/common";
import { enerymanage, treenodeconfig } from "@/api/api";
export default {
  watch: {
    loadfifter(val) {
      this.$refs.tree.filter(val);
    }
  },
  data() {
    return {
      loaddefalutnone: null,
      loadfifter: "",
      defaultProps: {
        children: "subNodes",
        label: "nodeName",
        id: "nodeId"
      },
      loaddata: [],
      loadtypedate: "date",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      loadtimevalue: timeFormatdata(new Date()),
      loaddatatime: "日",
      loadchartData: {
        columns: ["日期", "访问用户", "下单用户", "下单率"],
        rows: [
          { 日期: "2019-11-09", 访问用户: 1393, 下单用户: 1093 },
          { 日期: "2019-11-08", 访问用户: 3530, 下单用户: 3230 },
          { 日期: "2019-11-04", 访问用户: 2923, 下单用户: 2623 },
          { 日期: "2019-11-01", 访问用户: 1723, 下单用户: 1423 }
        ]
      },
      loadcolors: ["#56D07E", "#1B77FC"],
      xAxisOption: {
        //修改截取的时间
        type: "category",
        splitLine: {},
        axisTick: {},
        axisLabel: {
          formatter: function(value) {
            var str_before = value.substring(10, 16);
            // var str_after = value.split(" ")[1];
            return str_before;
          }
        },
        axisLine: {
          show: true,
          lineStyle: { color: "#b1b1b1" } //x轴坐标的显示颜色
        }
      },
      voltageyAxis: {
        axisLine: {
          show: true,
          lineStyle: { color: "#b1b1b1" } //y轴坐标的显示颜色
        },
        name: "",
        splitLine: {
          show: true,
          lineStyle: {
            color: ["#E2E5EB"],
            opacity: 0.4
          }
        }
      },
      dataload: []
    };
  },
  methods: {
    loadgettreelist() {
      var parms = {
        subStationId: this.$route.params.subid
      };
      treenodeconfig(parms).then(res => {
        console.log("树状菜单");
        console.log(res);
        if (res.data.head.code == 0) {
          this.loaddata = res.data.data;
          this.loaddefalutnone = res.data.data[0].nodeId;
          // console.log("id" + this.loaddefalutnone);
        }
      });
    },
    loadfilterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    changetime() {},
    loadaddEventDate(addType = "add") {
      //移过来的! 可以抽空优化
      var type = this.loadtypedate;
      let datatime = new Date();
      switch (type) {
        case "date":
          var datetime = moment(this.loadtimevalue).add(
            addType === "add" ? 1 : -1,
            "days"
          );
          let newtime = moment(datetime).format("YYYY-MM-DD");
          if (addType === "add") {
            if (new Date(newtime) > datatime) {
              this.$message.error("日期大于当天,从新选择");
            } else {
              this.loadtimevalue = newtime;
            }
          } else {
            this.loadtimevalue = newtime;
          }
          break;
        case "month":
          console.log("month");
          var mounthstime = moment(this.loadtimevalue).add(
            addType === "add" ? 1 : -1,
            "months"
          );
          let newtimemounth = moment(mounthstime).format("YYYY-MM");
          console.log(newtimemounth);

          if (addType === "add") {
            if (new Date(newtimemounth) > datatime) {
              this.$message.error("日期大于当月,从新选择");
            } else {
              this.loadtimevalue = newtimemounth;
            }
          } else {
            this.loadtimevalue = newtimemounth;
          }
          break;
        case "year":
          var yearstime = moment(this.loadtimevalue).add(
            addType === "add" ? 1 : -1,
            "years"
          );
          let newtimeyears = moment(yearstime).format("YYYY");

          if (addType === "add") {
            if (new Date(newtimeyears) > datatime) {
              this.$message.error("日期大于当年,从新选择");
            } else {
              this.loadtimevalue = newtimeyears;
            }
          } else {
            this.loadtimevalue = newtimeyears;
          }
          break;
      }
      // if (this.datatime == "日") {
      //   //日的时候调一个接口./其他调另外的接口
      //   this.gettimedate();
      // } else {
      //   this.getyeardata();
      // }
    },

    loadnodeclick() {},
    previous() {
      //日期往前
      this.loadaddEventDate("subtract");
    },
    gonext() {
      //日期往后
      this.loadaddEventDate("add");
    },
    loadchangetypadata() {
      this.loadtimevalue = timeFormatdata(new Date());
      console.log(this.loaddatatime);
      switch (this.loaddatatime) {
        case "日":
          this.loadtypedate = "date";
          // this.gettimedate();
          break;
        case "月":
          this.loadtypedate = "month";
          console.log("进月来");
          // this.yearextend.xAxis.axisLabel = this.monthxAis.axisLabel;
          // this.getyeardata();

          break;
        case "年":
          this.loadtypedate = "year";
          // this.yearextend.xAxis.axisLabel = this.yearxAis.axisLabel;
          // this.getyeardata();
          break;
        default:
          // this.loadtimevalue = "";
          // this.yearextend.xAxis.axisLabel = this.allxAis.axisLabel;

          // this.getyeardata();
          break;
      }
    }
  },
  mounted() {
    this.loadgettreelist();
  }
};
</script>

<style lang="scss" scoped>
.load_box {
  width: 1132px;
  height: 162px;
  border: 1px solid #b6bbc6;
}

.electricleft {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 3px 16px 0px rgba(103, 119, 137, 0.2);
  padding: 20px;
  // min-height: 700px;
}
.time_share {
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(24, 19, 67, 1);
  padding-left: 20px;
  font-size: 14px;
  display: inline-block;
}
.tendency {
  display: inline-block;
  padding: 20px;
}
.timeselect {
  height: 60px;
  //  display: inline-block;
  // border: 1px solid red;
  float: right;
}
.timetab {
  float: right;
}
.timebox {
  padding-right: 100px;
}
</style>