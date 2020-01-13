<template>
  <el-row style="height:100%">
    <div class="mainbox">
      <el-col :span="24" style="height:100%">
        <el-col :span="5" style="height:100%;padding:20px;">
          <div class="electricleft">
            <div style="margin-top:20px">
              <div style="margin-bottom:20px">
                <el-input placeholder="输入关键字进行过滤" v-model="subentryfifter"></el-input>
              </div>
              <el-tree
                class="filter-tree"
                :data="subentrydata"
                :props="subentryprops"
                default-expand-all
                :filter-node-method="subentryfilterNode"
                @node-click="subentryclick"
                :expand-on-click-node="false"
                :highlight-current="true"
                accordion
                ref="tree"
                node-key="nodeId"
                :current-node-key="subentrydefalue"
              ></el-tree>
            </div>
          </div>
        </el-col>

        <el-col :span="19">
             <div class="timetab">
              <span class="timebox" style="margin-right:40px;">
                <el-radio-group
                  v-model="electricdatatime"
                  size="medium"
                  @change="elecchangetypadata"
                >
                  <el-radio-button label="月"></el-radio-button>
                  <el-radio-button label="年"></el-radio-button>
                  <el-radio-button label="总"></el-radio-button>
                </el-radio-group>
              </span>
              <span class="timebox">
                <el-button
                  icon="el-icon-arrow-left"
                  circle
                  @click="electricleft"
                  :disabled="electricdatatime=='总'"
                ></el-button>
                <el-date-picker
                  v-model="electricelectrictimevalue"
                  :type="electrictypedate"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                  :picker-options="electricpickerOptions"
                  :clearable="false"
                  :disabled="electricdatatime=='总'"
                ></el-date-picker>
                <el-button
                  icon="el-icon-arrow-right"
                  circle
                  @click="electricright"
                  :disabled="electricdatatime=='总'"
                ></el-button>
              </span>
            </div>
        <el-col :span='24'>
              <el-col :span='12'>
                   <div  class='powerUtilization'>各分项用电所占百分比</div>
                       <div class='Powerfigure'>
                          <ve-pie 
                          :data="subitemchartData"
                           height="100%"
                          :legend="sublegend"
                          :extend="subitextend"
                          :grid="subitgrid"
                          :colors="subitcolors"
                          :settings="subittemsettings"
                          ></ve-pie>
                       </div>
              </el-col>
              <el-col :span='12'>
                    <div  class='powerUtilization'>各分项用电趋势图</div>
                      <div  class="barhistogram">
                       <ve-histogram 
                           :data="PowerchartData"
                           :settings="PowerchartSettings"
                           :colors='subitcolors'
                           :yAxis="poweryAxis"
                           :grid="powergrid"
                          >
                       </ve-histogram>
                     </div>
              </el-col>
        </el-col>
        <el-col :span='24'  style="margin-top:20px;">
              <el-col :span='12'>
                   <div  class='powerUtilization'>各分项用电所占百分比</div>
                        <div  class='Powerfigure'>
                        <ve-pie 
                        :data="subitemchartData"
                        :legend="sublegend"
                        :extend="subitextend"
                        :grid="subitgrid"
                        :colors="subitcolors"
                        :settings="subittemsettings"
                        ></ve-pie>
                       </div>
              </el-col>
              <el-col :span='12'>
                    <div  class='powerUtilization'>各分项用电趋势图</div>
                      <div class='barhistogram'>
                       <ve-histogram 
                           :data="PowerchartData"
                           :settings="PowerchartSettings"
                           :colors='subitcolors'
                           :yAxis="poweryAxis"
                            :grid="powergrid"
                          >
                        </ve-histogram>
                       </div>
              </el-col>
        </el-col>



       </el-col>
      </el-col>
    </div>
  </el-row>
</template>

<script>
import {
  timeFormastart,
  timeFormanow,
  timeFormatdata,
  timeFormatmonth,
  timeFormatyear
} from "@/assets/js/common";
import { treenodeconfig ,getenergyConsumptionManagement} from "@/api/api";
export default {
  data() {
    return {
      subentrydata: [],
      subentryprops: {
        children: "subNodes",
        label: "nodeName"
      },
      subentrydefalue: 0,
      subentryfifter: "",
      spanArr: [],
      nodeType: "",
      curreent_Name_title: "",
      electrictypedate: "month",
      electricdatatime: "月",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      electricelectrictimevalue: timeFormatmonth(new Date()),
      subitemchartData:{
           columns:['name','value',],
           rows:[],
      },
      subittemsettings:{
         radius: 80,
         offsetY: 300
      },
      sublegend:{
        top: 80,
        right: 220,
        width: 60,
        height: 80,
        itemGap: 30
      },
     subitextend:{
       series: {
          center: ["25%", "50%"]
        }
     },
     subitgrid:{
         right: 40 
     },
     subitcolors:['#11CF98','#566CFE','#84B0E0','#FFA45F'],
      electricpickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      PowerchartData:{
          columns: ['日期', '访问用户', '下单用户', '下单率'],
          rows: [
            { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
            { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
            { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
            { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
            { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
          ]
      },
       PowerchartSettings:{
            stack: { '用户': ['访问用户', '下单用户'] }
       },
       poweryAxis:{
       axisLine: {
          show: true,
          lineStyle: { color: "#b1b1b1" } //y轴坐标的显示颜色
        },
        name: "单位/KW",
       },
       powergrid:{
            bottom:120,
       },
       splitLine: {
          show: true,
          lineStyle: {
            color: ["#E2E5EB"],
            opacity: 0.4
          }
        },
       //Powercolors:[],
    };
  },
  methods: {
    
    changetime() {},
    subentryclick(node, data) {
      console.log("当前点击");
      console.log(node);
      this.spanArr = [];
      this.nodeType = node.nodeType;
      this.subentrydefalue = node.nodeId;
      this.curreent_Name_title = node.nodeName;
      console.log(this.volumetableData);
      // this.getdemandanalysislist().then(val => {
      //   this.getSpanArr(this.volumetableData);
      // });
    },
    subentrygettreelist() {
      var parms = {
        subStationId: this.$route.params.subid,
        type: "deviceGrouping"
      };
      return Promise.resolve(
        treenodeconfig(parms).then(res => {
          console.log("树状菜单");
          console.log(res);
          if (res.data.head.code == 0) {
            this.subentrydata = res.data.data;
            this.subentrydefalue = res.data.data[0].nodeId;
            // this.$nextTick(() => {
            // });
            this.curreent_Name_title = res.data.data[0].nodeName;
            this.nodeType = res.data.data[0].nodeType;
            // console.log("id" + this.subentrydefalue);
            console.log("树状id");
            console.log(this.subentrydefalue);
          }
        })
      );
    },
    
   Consumptionchart(){
      let data = this.electricelectrictimevalue.split("-");
      if (this.electricelectrictimevalue == "") {
        //总
        var year = "";
        var month = "";
      } else if (this.electricdatatime == "年") {
        var year = data[0];
        var month = "";
      } else {
        var year = data[0];
        var month = data[1];
      }

      var parms = {
        nodeId: this.subentrydefalue,
        nodeType: this.nodeType
      };


   return Promise.resolve(
      getenergyConsumptionManagement(year,month,parms).then(res=>{
                  console.log('ooooo===========')
                  console.log(res)
                  if(res.data.head.code==0){
                         this.subitemchartData.rows=res.data.data.energyQuantityClassificationSummary;
                        //  this.PowerchartData.rows=
                  }



                 
           })
         )
    },

    subentryfilterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
     elecchangetypadata() {
      ///充电放电趋势图
      //放电
      this.electricelectrictimevalue = timeFormatdata(new Date());
      console.log(this.electricdatatime);
      switch (this.electricdatatime) {
        case "月":
          this.electrictypedate = "month";
          // this.getyeardata();
        //  this.elecyearextend.xAxis.axisLabel = this.monthxAis.axisLabel;

          break;
        case "年":
          this.electrictypedate = "year";
          // this.getyeardata();
         // this.elecyearextend.xAxis.axisLabel = this.yearxAis.axisLabel;

          break;
        default:
          this.electricelectrictimevalue = "";
          // this.getyeardata();
        //  this.elecyearextend.xAxis.axisLabel = this.allxAis.axisLabel;
          break;
      }
      // this.getenergycharts();
     // this.getelectrichart();
    },
    electricleft() {
      // this.addEventdata("miuns");
      this.electricaddEventDate("miuns");
    },
    electricright() {
      this.electricaddEventDate("add");
    },
    electricaddEventDate(addType = "add") {
      //移过来的! 可以抽空优化
      var type = this.electrictypedate;
      let electricdatatime = new Date();
      switch (type) {
        case "month":
          console.log("month");
          var mounthstime = moment(this.electricelectrictimevalue).add(
            addType === "add" ? 1 : -1,
            "months"
          );
          let newtimemounth = moment(mounthstime).format("YYYY-MM");
          console.log(newtimemounth);

          if (addType === "add") {
            if (new Date(newtimemounth) > electricdatatime) {
              this.$message.error("日期大于当月,从新选择");
              return;
            } else {
              this.electricelectrictimevalue = newtimemounth;
            }
          } else {
            this.electricelectrictimevalue = newtimemounth;
          }
          break;
        case "year":
          var yearstime = moment(this.electricelectrictimevalue).add(
            addType === "add" ? 1 : -1,
            "years"
          );
          let newtimeyears = moment(yearstime).format("YYYY");

          if (addType === "add") {
            if (new Date(newtimeyears) > electricdatatime) {
              this.$message.error("日期大于当年,从新选择");
              return;
            } else {
              this.electricelectrictimevalue = newtimeyears;
            }
          } else {
            this.electricelectrictimevalue = newtimeyears;
          }
          break;
      }
       // this.getelectrichart();
    },




  },
  mounted() {
    this.subentrygettreelist().then(val=>{
           this.Consumptionchart()   
    }) ;
    
  }
};
</script>

<style lang="scss" scoped>

.electricleft {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 3px 16px 0px rgba(103, 119, 137, 0.2);
  padding: 20px;
  // min-height: 700px;
}
.timetab{
    float: right;
    margin: 20px;
}
.powerUtilization{
    font-size:14px;
    font-family:Microsoft YaHei;
    font-weight:bold;
    color:rgba(24,19,67,1);
    padding-left: 40px;
}
.Powerfigure{
   height: 320px;
   overflow: hidden;
}
.barhistogram{
   height: 320px;
    overflow: hidden;
}
</style>