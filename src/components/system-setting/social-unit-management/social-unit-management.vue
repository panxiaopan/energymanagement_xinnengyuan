<template>
  <div class="hj-station-management-wrapper" v-loading="formLoading">
    <el-form
      ref="formObj"
      v-if="formObj"
      :model="formObj"
      :rules="formObjRules"
      :label-width="labelWidth"
      size="medium"
    >
      <el-form-item
        v-for="(val, key) in formObj"
        v-show="formObj[key].show"
        :key="key"
        :label="formObj[key].label"
        :prop="formObj[key].name"
      >
        <el-input
          v-if="formObj[key].formType==='string'"
          v-model="formObj[key].value"
          :placeholder="formObj[key].placeholder"
          @change="changeInputString"
        ></el-input>
        <el-input
          v-if="formObj[key].formType==='number'"
          :min="0"
          v-model="formObj[key].value"
          :placeholder="formObj[key].placeholder"
          type="number"
        ></el-input>
        <div v-if="formObj[key].formType==='latLng'" class="hj-station-management-item--latLng">
          <el-input
            v-if="formObj[key].formType==='latLng'"
            v-model="formObj[key].value"
            :placeholder="formObj[key].placeholder"
            readonly
          ></el-input>&nbsp;&nbsp;
          <el-button @click="dialogVisible=true" type="primary">{{click2SelectLatLng}}</el-button>
        </div>
        <el-checkbox
          v-if="formObj[key].formType==='checkbox'"
          v-model="formObj[key].value"
        >{{formObj[key].label}}</el-checkbox>
        <el-switch v-if="formObj[key].formType==='switch'" v-model="formObj[key].value"></el-switch>
        <!-- 地址节点表单项 -->
        <div v-if="formObj[key].formType==='area'">
          <el-row type="flex" justify="space-between">
            <el-col :span="4" v-for="name in areaOptions" :key="name">
              <el-select
                :disabled="formObj[name].disabled"
                v-model="formObj[name].value"
                :placeholder="formObj[name].placeholder"
                @change="changeAreaValue(formObj[name])"
              >
                <el-option
                  v-for="ops in areaList[name]"
                  :key="ops.value"
                  :label="ops.label"
                  :value="ops.value"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>
        </div>
        <el-date-picker v-if="formObj[key].formType==='datePicker'" v-model="formObj[key].value"></el-date-picker>
        <el-select
          v-if="formObj[key].formType==='select'"
          filterable
          v-model="formObj[key].value"
          :placeholder="formObj[key].placeholder"
        >
          <el-option
            v-for="ops in selectOptions[key]"
            :key="ops.id"
            :label="ops.name"
            :value="ops.id"
          ></el-option>
        </el-select>
        <el-select
          v-if="formObj[key].formType==='multiSelect'"
          v-model="formObj[key].value"
          multiple
          :placeholder="formObj[key].placeholder"
        >
          <el-option
            v-for="ops in selectOptions[key]"
            :key="ops.id"
            :label="ops.name"
            :value="ops.id"
          ></el-option>
        </el-select>
        <!-- 层级表单项--设备类型/品牌/型号 -->
        <el-cascader
          v-if="formObj[key].formType==='cascader'"
          :placeholder="formObj[key].placeholder"
          expand-trigger="hover"
          :options="cascaderOptions"
          v-model="formObj[key].value"
          @change="handleCascaderChange"
        ></el-cascader>
        <!-- 图片表单项 -->
        <el-upload
          v-if="formObj[key].formType==='img'"
          :class="key+'__upload'"
          :ref="key"
          action
          :limit="10"
          :on-remove="handleRemove"
          :on-change="handleChange"
          :file-list="formObj[key].value"
          list-type="picture-card"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary">{{$t("systemSetting.selectFile")}}</el-button>
          <div slot="tip" class="el-upload__tip">{{$t("systemSetting.imageFormatLimit")}}</div>
        </el-upload>
      </el-form-item>

      <!-- 是否显示全部或隐藏部分表单项 -->
      <div v-if="this.hideKey.length" class="hj-station-form-item__more">
        <span @click="changeFormShow">{{foldUpMoreText}}</span>
      </div>
      <el-form-item class="hj-row-center-layout">
        <el-button
          type="primary"
          @click="submitForm('formObj')"
          :disabled="disabledSubmit"
          :loading="submitLoading"
        >{{$t("systemSetting.save")}}</el-button>
        <el-button @click="resetForm('formObj')">{{$t("systemSetting.reset")}}</el-button>
      </el-form-item>
    </el-form>

    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      @open="openMapDialog"
      top="5%"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      custom-class="hj-custom-dialog-wrapper--map"
    >
      <el-row class="hj-station-management-map-search-header">
        <!-- <span>{{$t("systemSetting.quickSearchCity")}}</span>&nbsp;&nbsp; -->
        <el-input
          v-model="searchCityName"
          @keyup.enter.stop.native="handleEnterSearch"
          :placeholder="searchCityPlaceholder"
          class="search-input"
        >
          <el-button slot="append" icon="el-icon-search" type="primary" @click="clickSearchIcon"></el-button>
          <!-- <i slot="suffix" class="el-icon-search"></i> -->
        </el-input>
      </el-row>
      <div id="vueMap" ref="vueMap" :style="{height: mapHeight, width: mapWidth}"></div>
      <span slot="footer" class="hj-row-center-layout">
        <el-button @click.stop="cancelSelectLngAndLat">{{$t("systemSetting.cancel")}}</el-button>
        <el-button type="primary" @click.stop="confirmSelectLngAndLat">{{$t("systemSetting.ok")}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import coordtransform from "coordtransform";
const jsonp = require("jsonp");
// 导入初始表单项 新增表单--含默认设备信息 编辑表单--含消防信息
import getFormData from "./getFormData.js";
import getUpdateFormaData from "./getUpdateFormData.js";
export default {
  name: "StationManagement",
  components: {
    // SelectAddress
  },
  props: {
    unitId: {
      type: [Number, String],
      default: NaN
    },
    queryConfigUrl: {
      type: String,
      default: ""
    },
    queryDeviceTreeUrl: {
      type: String,
      default: "./common/deviceBrandModelTree"
    },
    //下拉表单项URL命名规则 query + 表单key(capitalized) + Url
    queryIndustryUrl: {
      type: String,
      default: "./socialUnits/industries"
    },
    queryNatureUrl: {
      type: String,
      default: "./socialUnits/natures"
    },
    queryFireFacilityTypesUrl: {
      type: String,
      default: "./socialUnits/fireFacilityTypes"
    },
    queryMainCircuitCurrentUrl: {
      type: String,
      default: "./common/mainCircuitCurrents"
    },
    queryAreaCodeUrl: {
      type: String,
      default: "./common/areas/townCode/"
    },
    queryAreaListUrl: {
      type: String,
      default: "./common/areas/parentId/"
    },
    postUrl: {
      type: String,
      default: "./socialUnits"
    },
    updateUrl: {
      type: String,
      default: "./socialUnits/{unitId}"
    }
  },
  data() {
    const lang = window.localStorage.hjLanguage || "zh";
    var {
      addrArr,
      addrObj,
      formObj,
      formObjRules,
      hideKey,
      submitFormKey
    } = isNaN(this.unitId) ? getFormData(lang) : getUpdateFormaData(lang);
    return {
      map: null,
      dialogVisible: false,
      dialogTitle: "点击地图任意位置选择经纬度",
      click2SelectLatLng: "点击选择经纬度",
      searchCityPlaceholder: "输入城市名称进行搜索",
      searchCityName: "",
      mapWidth: "100%",
      mapHeight: screen.height * 0.5 + "px",
      addrArr,
      addrObj,
      formObj,
      formObjRules,
      hideKey,
      submitFormKey,
      selectedLatLng: [],
      foldUpMoreText: this.$t("systemSetting.more"),
      areaOptions: ["country", "province", "city", "county", "town"],
      // fileList: [],
      areaList: {},
      cascaderOptions: [],
      // 行业、单位性质下拉项
      selectOptions: {
        industry: [],
        nature: [],
        // 消防类型下拉项 多选
        fireFacilityTypes: [],
        mainCircuitCurrent: []
      },
      submitLoading: false,
      formLoading: false,
      disabledSubmit: false
      // disabledSubmit: isNaN(this.unitId) ? false : true
      // multiSelectOptions: {
      // }
    };
  },
  computed: {
    labelWidth() {
      return this.isAdd ? "150px" : "160px";
    },
    isAdd() {
      return isNaN(this.unitId);
    }
  },
  beforeCreate() {
    console.log("-");
  },
  methods: {
    changeInputString(value) {
      console.log("input ++++++", value);
    },
    openMapDialog() {
      this.$nextTick(() => {
        // document.body.style.paddingRight = "0px";
        this.showMap();
      });
    },
    showMap() {
      // 创建地址解析器实例
      if (!this.myGeo) {
        this.myGeo = new BMap.Geocoder();
      }
      let currentPoint = null;
      if (!this.map) {
        this.map = new BMap.Map("vueMap");
        // 若修改社会单位 则显示当前社会单位的经纬度overlay
        if (this.formObj["latLng"] && this.formObj["latLng"].value !== "") {
          let lng = this.formObj["latLng"].value.split(",")[0];
          let lat = this.formObj["latLng"].value.split(",")[1];
          currentPoint = new BMap.Point(lng, lat);
          this.map.centerAndZoom(currentPoint, 12);
          this.map.addOverlay(new BMap.Marker(currentPoint));
          this.getLocationAndOpenInfowindow({
            point: currentPoint
          });
        } else {
          // 若新建社会单位，默认显示当前IP所在城市中心点经纬度坐标
          let myCity = new BMap.LocalCity();
          myCity.get(result => {
            let cityName = result.name;
            if (!currentPoint) {
              currentPoint = result.center;
            }
            // 初始化地图 必须步骤
            this.map.centerAndZoom(currentPoint, 12);
            this.map.setCenter(cityName);
          });
        }

        this.map.addControl(new BMap.MapTypeControl());
        this.map.addControl(new BMap.NavigationControl());
        this.map.enableScrollWheelZoom(true);

        this.map.addEventListener("click", e => {
          this.map.clearOverlays();
          let point = {};
          point.lng = e.point.lng;
          point.lat = e.point.lat;
          this.tempLatAndLng = point;
          this.dialogTitle = `${this.$t("systemSetting.longitude")}: ${
            point.lng
          }, ${this.$t("systemSetting.latitude")}:${point.lat}`;
          this.selectedLatLng = [point.lng, point.lat];
          let bmapPoint = new BMap.Point(point.lng, point.lat);
          this.map.addOverlay(new BMap.Marker(bmapPoint));
          this.getLocationAndOpenInfowindow({
            point
          });
        });
        // } else {
        //   this.map.clearOverlays();
        //   if (this.formObj["latLng"] && this.formObj["latLng"].value !== "") {
        //     let lat = this.formObj["latLng"].value.split(",")[0];
        //     let lng = this.formObj["latLng"].value.split(",")[1];
        //     this.dialogTitle = `${this.$t(
        //       "systemSetting.longitude"
        //     )}: ${lng}, ${this.$t("systemSetting.latitude")}:${lat}`;
        //     currentPoint = new BMap.Point(lng, lat);
        //     this.map.addOverlay(new BMap.Marker(currentPoint));
        //     this.getLocationAndOpenInfowindow({
        //       point: currentPoint
        //     });
        //   } else {
        //     // 若新建社会单位，默认显示当前IP所在城市中心点经纬度坐标
        //     this.dialogTitle = "点击地图任意位置选择经纬度";
        //     let myCity = new BMap.LocalCity();
        //     myCity.get(result => {
        //       let cityName = result.name;
        //       if (!currentPoint) {
        //         currentPoint = result.center;
        //       }
        //       // 初始化地图 必须步骤
        //       // this.map.centerAndZoom(currentPoint, 12);
        //       this.map.setCenter(cityName);
        //     });
        //   }
      }
    },
    isInchina(point) {
      /**
       * 判断是否在国内，不在国内则不做偏移
       * @param point {object, include lng,lat props}//百度坐标
       * @returns {boolean}
       */
      // 纬度3.86~53.55,经度73.66~135.05 国内经纬度范围 //国际坐标
      // coordtransform.bd09togcj02  // return [lng,lat]

      var locationArr = coordtransform.bd09togcj02(point.lng, point.lat); //百度坐标转换为火星坐标
      var gcj02Lng = locationArr[0];
      var gcj02Lat = locationArr[1];
      // coordtransform.gcj02towgs84  // return [lng,lat]
      var wgs84LatAndLngArr = coordtransform.gcj02towgs84(gcj02Lng, gcj02Lat);
      var lng = wgs84LatAndLngArr[0].toFixed(2);
      var lat = wgs84LatAndLngArr[1].toFixed(2);
      // if (lng > 73.66 && lng < 135.05 && lat > 3.86 && lat < 53.55) {
      //   this.language = "zh";
      // } else {
      //   this.language = "en";
      // }
      return lng > 73.66 && lng < 135.05 && lat > 3.86 && lat < 53.55;
    },
    getLocationAndOpenInfowindow({ point, info }) {
      var isInCn = this.isInchina(point);
      var bmapPoint = new BMap.Point(point.lng, point.lat);
      var opts = {
        width: 250, // 信息窗口宽度
        height: 10 // 信息窗口高度
      };

      // console.log("AMap geocoder", AMap);
      // AMap.plugin("AMap.Geocoder", function() {
      //   var geocoder = new AMap.Geocoder({
      //     // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
      //     // city: '010'
      //   });
      //   console.log("geocoder", geocoder);
      //   // var lnglat = [116.396574, 39.992706]
      //   var lnglat = [point.lng, point.lat];
      //   geocoder.getAddress(lnglat, function(status, result) {
      //     // if (result.info === "OK") {
      //     // result为对应的地理位置详细信息
      //     console.log("status", status, "result+++++++++++++", result);
      //     // }
      //   });
      // });

      if (!info) {
        var locationArr = coordtransform.bd09togcj02(point.lng, point.lat);
        var getDataUrl =
          "https://restapi.amap.com/v3/geocode/regeo?output=json&key=0ccbdaff7f5e64f5de6ffaa933fa5f85&location=";
        getDataUrl += `${locationArr[0]},${locationArr[1]}`;
        jsonp(getDataUrl, {}, (error, response) => {
          // console.log("jsonp map response+++++++++", response);
          if (response.infocode == 10000) {
            var regeocode = response.regeocode;
            var addressComponent = regeocode.addressComponent;
            // console.log("详细地址信息", addressComponent);
            // 地址详细字段说明见文档 https://lbs.amap.com/api/webservice/guide/api/georegeo
            if (addressComponent.country == this.$t("systemSetting.China")) {
              // this.language = "zh";
              this.addrArr.forEach(item => {
                var name = "",
                  value = "";
                switch (item) {
                  case "city":
                  case "country":
                  case "province":
                    name = addressComponent[item];
                    // value = addressComponent.citycode;
                    break;
                  case "county":
                    name = addressComponent.district;
                    value = addressComponent.adcode;
                    break;
                  case "town":
                    name = addressComponent.township;
                    value = addressComponent.towncode;
                    break;
                  case "remark":
                    name = regeocode.formatted_address;
                    value = regeocode.formatted_address;
                    break;
                  default:
                    name = addressComponent[item];
                    value = addressComponent[item];
                }
                this.addrObj[item] = {
                  name,
                  value,
                  type: item
                };
              });
            }
            if (regeocode.formatted_address) {
              var infoWindow = new BMap.InfoWindow(
                regeocode.formatted_address,
                opts
              ); // 创建信息窗口对象
              this.map.openInfoWindow(infoWindow, bmapPoint); // 打开信息窗口
            }
            // var formatted_address = regeocode.formatted_address;
            // this.formObj["remark"].value = formatted_address; //自动填充详细地址
          }
        });
      } else {
        var infoWindow = new BMap.InfoWindow(info, opts); // 创建信息窗口对象
        this.map.openInfoWindow(infoWindow, bmapPoint); // 打开信息窗口
      }
    },
    clickSearchIcon() {
      this.map.clearOverlays(); //清除地图上所有覆盖物
      var completeSearch = LocalResult => {
        var point = LocalResult.getPoi(0).point; //获取第一个智能搜索的结果
        var { lat, lng } = point;
        this.tempLatAndLng = { lat, lng };
        this.dialogTitle = `${this.$t("systemSetting.longitude")}: ${
          point.lng
        }, ${this.$t("systemSetting.latitude")}:${point.lat}`;

        this.map.centerAndZoom(point, 15);
        this.map.addOverlay(new BMap.Marker(point)); //添加标注
        this.getLocationAndOpenInfowindow({
          point
        });
      };
      var local = new BMap.LocalSearch(this.map, {
        //智能搜索
        onSearchComplete: completeSearch
      });
      local.search(this.searchCityName);
    },
    handleEnterSearch() {
      this.clickSearchIcon();
    },
    changeAreaValue(area) {
      // console.log("areaType, value", area);
      // 根据改变的父项 清空子项
      let { name: areaType, value: areaCode } = area;
      // 组合各区域节点数据
      switch (areaType) {
        case "country":
          this.areaOptions
            .filter(item => {
              return item !== "country";
            })
            .forEach(key => {
              this.$set(this.formObj[key], "value", "");
              // this.formObj[key].value = "";
            });
          break;
        case "province":
          this.areaOptions
            .filter(item => {
              return !(item === "country" || item === "province");
            })
            .forEach(key => {
              // this.formObj[key].value = "";
              this.$set(this.formObj[key], "value", "");
            });
          break;
        case "city":
          this.areaOptions
            .filter(item => {
              return item === "county" || item === "town";
            })
            .forEach(key => {
              // this.formObj[key].value = "";
              this.$set(this.formObj[key], "value", "");
            });
          break;
        case "county":
          this.areaOptions
            .filter(item => {
              return item === "town";
            })
            .forEach(key => {
              // this.formObj[key].value = "";
              this.$set(this.formObj[key], "value", "");
            });
          break;
        default:
          break;
      }
      // 根据选中的节点 设置选中的节点对象
      this.areaOptions.forEach(item => {
        let dataList = this.areaList[item];
        let code = this.formObj[item].value;
        if (code === "") {
          this.formObj["area"].value[item] = { name: "", code };
        } else {
          // 从当前节点列表找到对应节点名称 label
          let selected = dataList.filter(item => {
            return item.value === code;
          });
          let name = "";
          if (selected.length > 0) {
            name = selected[0].label || selected[0].name;
          }
          this.formObj["area"].value[item] = { name, code };
        }
      });
      console.log("this.formObj++++country,province...", this.formObj);
      // 更新后续节点列表
      this.queryAreaList(areaType, areaCode);
    },
    cancelSelectLngAndLat() {
      this.dialogVisible = false;
    },
    confirmSelectLngAndLat() {
      this.dialogVisible = false;
      this.formObj["latLng"].value = this.selectedLatLng.join(",");
      // 根据选择的地区towncode直接查询所选区域各层级的code
      this.areaOptions.forEach(key => {
        this.formObj[key].disabled = false;
      });

      this.$nextTick(() => {
        // 详细地址赋值
        this.formObj["remark"].value = this.addrObj["remark"].value;
        // 根据选中的区域信息addrObj--townCode获取选中的区域节点及节点列表
        let townCode = this.addrObj["town"].value;
        this.queryCompleteAreaList(townCode);
      });
    },
    changeFormShow() {
      this.foldUpMoreText =
        this.foldUpMoreText === this.$t("systemSetting.more")
          ? this.$t("systemSetting.foldUp")
          : this.$t("systemSetting.more");

      this.hideKey.forEach(key => {
        this.formObj[key]["show"] = !this.formObj[key]["show"];
      });
    },
    handleRemove(file, fileList) {
      // this.fileList = fileList;
    },
    handleChange(file, fileList) {
      console.log("change fileList", fileList, this.$refs.upload);
      if (["jpeg", "png", "jpg"].indexOf(file.raw.type.split("/")[1]) < 0) {
        this.$message.error(this.$t("workOrderManagement.imgFormatError"));
      }
      // this.fileList = fileList;
    },
    handleCascaderChange(value) {
      console.log("---xiala---");
      console.log("cascader value", value);
      if (value[0] == "ELECTRICAL_FIRE_MONITORING_DETECTOR") {
        console.log("进来");
        this.formObj["mainCircuitCurrent"].show = true;
      } else {
        this.formObj["mainCircuitCurrent"].show = false;
        this.formObj["mainCircuitCurrent"].value = 1;
      }
    },
    queryAreaList(areaType, areaCode) {
      let url = this.queryAreaListUrl + areaCode;
      this.$http({
        url
      }).then(response => {
        let code =
          response.data && response.data.head && response.data.head.code;
        let data = response.data && response.data.data;
        if (code === 0 && data) {
          let dataList = data.map(item => {
            item.value = item.id;
            item.label = item.name;
            return item;
          });
          switch (areaType) {
            case "country":
              this.$set(this.areaList, "province", dataList);
              break;
            case "province":
              this.$set(this.areaList, "city", dataList);
              break;
            case "city":
              this.$set(this.areaList, "county", dataList);
              break;
            case "county":
              this.$set(this.areaList, "town", dataList);
              break;
            case "": //国家节点
              this.$set(this.areaList, "country", dataList);
              break;
          }
          console.log("this.areaList", this.areaList);
        }
      });
    },
    queryCompleteAreaList(townCode) {
      // console.log("this.addrObj", this.addrObj);
      // let townCode = this.addrObj["town"].value;
      if (!townCode || (Array.isArray(townCode) && townCode.length === 0)) {
        this.$message.warning(this.$t("systemSetting.townCodeErrorTips"));
        this.areaOptions.forEach(key => {
          // 清空此前选中的区域节点值
          this.formObj[key].value = "";
          this.formObj["area"].value = {
            country: null,
            province: null,
            city: null,
            county: null,
            town: null
          };
        });
        this.queryAreaList("", 0); // 单独请求国家节点列表 -- 目前只有中国
        return;
      }
      let url = this.queryAreaCodeUrl + townCode;
      this.$http({
        url
      }).then(response => {
        let code =
          response.data && response.data.head && response.data.head.code;
        let data = response.data && response.data.data;
        if (code === 0 && data) {
          // console.log("area list response", data);
          // 设置选中的节点对象
          this.formObj["area"].value = data;
          this.queryAreaList("", 0); // 单独请求国家节点列表 -- 目前只有中国
          this.areaOptions.forEach(key => {
            // 选中的区域节点值
            let { name, code: areaCode } = data[key];
            this.formObj[key].value = areaCode;
            // 循环请求所在区域的节点列表
            // let url = this.queryAreaListUrl + code;
            if (key === "town") {
              return;
            }
            this.queryAreaList(key, areaCode);
          });
        }
      });
    },
    // 查询下拉项表单 keyArr--表单项的key数组:industry-行业 nature-单位性质
    querySelectOptions(key) {
      let urlObj = {
        industry: this.queryIndustryUrl,
        nature: this.queryNatureUrl,
        fireFacilityTypes: this.queryFireFacilityTypesUrl,
        mainCircuitCurrent: this.queryMainCircuitCurrentUrl
      };
      let url = urlObj[key];
      this.$http({
        url
      }).then(response => {
        let code =
          response.data && response.data.head && response.data.head.code;
        let data = response.data && response.data.data;
        if (code === 0 && data) {
          this.selectOptions[key] = data.map(item => {
            if (typeof item === "object") {
              item.label = item.name;
              item.value = item.id;
            } else {
              //mainCircuitCurrent--电流互感器规格
              item = {
                label: item + " A",
                value: item,
                name: item + " A",
                id: item
              };
            }
            return item;
          });
          console.log(
            "mainCircuitCurrent selectOptions",
            this.selectOptions["mainCircuitCurrent"]
          );
        }
      });
    },
    queryDeviceTreeList() {
      var url = this.queryDeviceTreeUrl;
      this.$http({
        url
      }).then(response => {
        let code =
          response.data && response.data.head && response.data.head.code;
        let data = response.data && response.data.data;
        if (code === 0 && data) {
          // console.log("device tree response data", data);
          this.cascaderOptions = data.map(item => {
            item.label = item.name;
            item.value = item.deviceClassId;
            if (item.nodeList.length) {
              item.children = item.nodeList.map(subItem => {
                subItem.label = subItem.name;
                subItem.value = subItem.id;
                if (subItem.nodeList.length) {
                  subItem.children = subItem.nodeList.map(grandItem => {
                    grandItem.label = grandItem.name;
                    grandItem.value = grandItem.id;
                    return grandItem;
                  });
                }
                return subItem;
              });
            }
            return item;
          });
        }
      });
    },
    submitForm(formName) {
      console.log("this.formObj+++++++++++++", this.formObj);
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submitLoading = true;
          // console.log("this.formObj+++++++++++++", this.formObj);
          let url = this.postUrl;
          let method = "post";
          let form = this.formObj;
          let formAreaObj = form["area"].value;
          let addrjson = {};
          let json = {};
          this.submitFormKey.forEach(key => {
            if (typeof form[key] === "undefined") {
              let mapKey = "";
              switch (key) {
                case "areaId":
                  json[key] =
                    formAreaObj["town"] && formAreaObj["town"]["code"];
                  break;
                case "longitude":
                  json[key] = form["latLng"].value.split(",")[0];
                  break;
                case "latitude":
                  json[key] = form["latLng"].value.split(",")[1];
                  break;
                case "addrjson":
                  Object.keys(formAreaObj).forEach(subKey => {
                    addrjson[subKey] = formAreaObj[subKey].name;
                  });
                  //详细地址可编辑 单独添加到json中
                  addrjson["remark"] = form["remark"].value;
                  json[key] = JSON.stringify(addrjson);
                  break;
                case "deviceClassId":
                  json[key] = form["deviceTreeId"].value[0];
                  break;
                case "deviceBrandId":
                  json[key] = form["deviceTreeId"].value[1];
                  break;
                case "deviceTypeId":
                  json[key] = form["deviceTreeId"].value[2];
                  break;
                case "addedMainEntrancePics":
                case "addedExitPics":
                case "addedFireHydrantPics":
                case "addedImportanceSectionPics":
                case "addedEvacuationPlanPics":
                  mapKey = key.slice(5, 6).toLocaleLowerCase() + key.slice(6);
                  // 直接通过上传组件实例拿到文件数据
                  console.log("this.$refs[mapKey]", mapKey, this.$refs[mapKey]);
                  // let uploadRef = this.$refs[mapKey][0]
                  if (
                    this.$refs[mapKey][0] &&
                    this.$refs[mapKey][0].uploadFiles
                  ) {
                    json[key] = this.$refs[mapKey][0].uploadFiles
                      .filter(item => {
                        return typeof item.raw !== "undefined";
                      })
                      .map(item => {
                        item = item.raw;
                        return item;
                      });
                  }

                  break;
                // json[key] = this.formObj[mapKey]
                case "existedMainEntrancePics":
                case "existedExitPics":
                case "existedFireHydrantPics":
                case "existedImportanceSectionPics":
                case "existedEvacuationPlanPics":
                  mapKey = key.slice(7, 8).toLocaleLowerCase() + key.slice(8);
                  // 直接通过上传组件实例拿到文件数据
                  // let uploadRef = this.$refs[mapKey][0]
                  if (
                    this.$refs[mapKey][0] &&
                    this.$refs[mapKey][0].uploadFiles
                  ) {
                    json[key] = this.$refs[mapKey][0].uploadFiles
                      .filter(item => {
                        return typeof item.raw === "undefined";
                      })
                      .map(item => {
                        if (typeof item !== "undefined") {
                          // item = { name: item.name, url: item.url };
                          item = item.name;
                          return item;
                        }
                        return item;
                      });
                  }
                  break;
                default:
                  break;
              }
            } else {
              json[key] = form[key].value;
            }
          });
          if (!this.isAdd) {
            // url = url + `/${this.unitId}`;
            url = this.updateUrl;
            delete json.registCode;
            method = "put";
          }
          console.log("json", json);
          let jsonFormData = new FormData();
          Object.keys(json).forEach(key => {
            // 数组数据需将每个子数据append下
            if (key.indexOf("Pics") > -1 || key === "fireFacilityTypes") {
              // if (json[key].length===0) {
              //   jsonFormData.append(key, json[key]);
              // }
              json[key].forEach(item => {
                jsonFormData.append(key, item);
              });
            } else {
              jsonFormData.set(key, json[key]);
            }
          });
          let message = this.isAdd
            ? this.$t("systemSetting.addSuccessfully")
            : this.$t("systemSetting.updateSuccessfully");
          this.$http({
            url,
            json: jsonFormData,
            method,
            contentType: "formData"
          })
            .then(response => {
              let code =
                response.data && response.data.head && response.data.head.code;
              let data = response.data && response.data.data;
              console.log("submit form response", data);
              if (+code === 0) {
                this.$message.success(message);
                if (this.isAdd) {
                  // let unitId = data
                  this.$emit("complete-add", true);
                } else {
                  this.queryConfig();
                }
                // this.submitLoading = false;
              }
              this.submitLoading = false;
            })
            .catch(err => {
              this.submitLoading = false;
            });
        }
      });
    },
    resetForm(formName) {
      // this.$refs[formName].resetFields();
      if (!this.isAdd) {
        this.updateForm();
      } else {
        var { addrArr, addrObj, formObj, formObjRules, hideKey } = getFormData(
          window.localStorage.hjLanguage || "zh"
        );
        this.addrArr = addrArr;
        this.addrObj = addrObj;
        this.formObj = formObj;
      }
      this.$refs.formObj.resetFields();
    },
    updateForm() {
      let picsKeyMap = new Map([
        ["evacuationPlanPicNameUrls", "evacuationPlanPics"],
        ["mainEntrancePicNameUrls", "mainEntrancePics"],
        ["exitPicNameUrls", "exitPics"],
        ["fireHydrantPicNameUrls", "fireHydrantPics"],
        ["importanceSectionPicNameUrls", "importanceSectionPics"]
      ]);
      // alert("dd");
      Object.keys(this.initConfigData).forEach(key => {
        if (typeof this.formObj[key] !== "undefined") {
          switch (key) {
            // 行业和性质 id name数值类
            case "industry":
            case "nature":
              let data = this.initConfigData[key];
              this.formObj[key].value = data.id;
              break;
            case "name":
            case "areaCovered":
            case "grossFloorArea":
            case "installedCompany":
            case "installedDate":
            case "contactEmail":
            case "numberOfEmployees":
            case "contactNumber":
              this.formObj[key].value = this.initConfigData[key];
              // this.$set(this.formObj[key], "value", this.initConfigData[key]);
              break;
          }
        } else {
          switch (key) {
            case "manResponsibleForFireSecurity":
              let manResponsibleForFireSecurity = this.initConfigData[key];
              this.formObj["safetyManName"].value =
                manResponsibleForFireSecurity["name"];
              this.formObj["safetyManTel"].value =
                manResponsibleForFireSecurity["tel"];
              break;
            // 更新消防相关信息
            case "fireInfo":
              let fireInfo = this.initConfigData[key];
              Object.keys(fireInfo).forEach(fireKey => {
                if (typeof this.formObj[fireKey] !== "undefined") {
                  // 多选下拉
                  if (this.formObj[fireKey]["formType"] === "multiSelect") {
                    let data = fireInfo[fireKey] || []; //array格式
                    this.formObj[fireKey].value = data.map(item => {
                      item = item.id;
                      return item;
                    });
                  } else {
                    this.formObj[fireKey].value = fireInfo[fireKey];
                  }
                } else if (picsKeyMap.get(fireKey)) {
                  //消防相关图片
                  let nameUrlArr = fireInfo[fireKey] || [];
                  this.formObj[picsKeyMap.get(fireKey)].value = nameUrlArr.map(
                    item => {
                      item.url = this.computedUrl(item.url);
                      return item;
                    }
                  );
                  //为空时 array格式
                }
              });
              break;
          }
        }
      });
      // 经纬度赋值
      let longitude = this.initConfigData["longitude"];
      let latitude = this.initConfigData["latitude"];
      this.formObj["latLng"].value = `${longitude}, ${latitude}`;
      // 地区节点赋值
      // 节点可操作
      this.areaOptions.forEach(key => {
        this.formObj[key].disabled = false;
      });
      let areaId = this.initConfigData["areaId"];
      this.queryCompleteAreaList(areaId);
      // 详细地址直接从addrjson中取出赋值 区域节点通过请求再赋值
      this.formObj["remark"].value = this.initConfigData["addrjson"].remark;
      console.log("this.formObj updated", this.formObj);
    },
    computedUrl(url) {
      // var url = this.data && this.data.picUrl;
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
      } else {
        url = "";
      }
      return url;
    },
    queryConfig() {
      this.formLoading = true;
      let url = `socialUnits/${this.unitId}/config`;
      this.$http({
        url
      })
        .then(response => {
          let code =
            response.data && response.data.head && response.data.head.code;
          let data = response.data && response.data.data;
          if (code === 0 && data) {
            console.log("config data++++++++", data);
            this.initConfigData = data;
            this.updateForm();
          }
          this.formLoading = false;
        })
        .catch(err => {
          this.formLoading = false;
        });
    },
    // 是否填写或修改表单
    isModified() {
      let result = false;
      let initData = getFormData(window.localStorage.hjLanguage || "zh");
      if (this.isAdd) {
        //新增社会单位时
        console.log("this.formObj+++ isModified?", this.formObj);
        result = Object.keys(this.formObj).some(key => {
          if (key === "deviceTreeId") {
            let len = this.formObj[key].value.length;
            return len > 0;
          } else if (key === "area") {
            let area = this.formObj[key].value;
            let hasValue = Object.keys(area).some(subKey => {
              return !!area[subKey]; //是否为Null
            });
            return !!hasValue;
          } else {
            return this.formObj[key].value !== initData["formObj"][key].value;
          }
        });
      }
      console.log("result", result);
      return result;
    }
  },
  mounted() {
    // alert(this.unitId);
    if (!this.isAdd) {
      this.queryConfig();
    } else {
      this.formObj["mainCircuitCurrent"].show = false;
      this.formObj["mainCircuitCurrent"].value = 50;
    }
    this.queryDeviceTreeList();
    // 初始化下拉项表单  -- 行业 单位性质
    console.log("this.formObj+++", this.formObj);
    Object.keys(this.formObj).forEach(key => {
      if (
        this.formObj[key]["formType"] === "select" ||
        this.formObj[key]["formType"] === "multiSelect"
      ) {
        this.querySelectOptions(key);
      }
    });
  }
};
</script>
<style lang="less">
.hj-station-management-wrapper {
  .el-form-item {
    .el-cascader--medium {
      width: 100%;
    }

    .el-select {
      width: 100%;
    }
  }

  .el-form-item__label {
    color: #313131;
  }

  // .el-checkbox {
  //   color: darken(#ffffff, 30%);
  // }
  .hj-station-management-map-search-header {
    padding: 10px;
    position: absolute;
    top: 1vh;
    left: 3vw;
    z-index: 99;

    // background-color:
    .search-input {
      width: 30%;
      min-width: 300px;
    }
  }

  .hj-station-management-item--latLng {
    display: flex;
    justify-content: space-between;
  }

  .hj-station-form-item__more {
    display: flex;
    justify-content: flex-end;

    span {
      text-decoration: underline;
      // color: @baseColor;
      color: #31b944;
      cursor: pointer;
    }
  }

  .el-upload__tip {
    color: darken(#ffffff, 30%);
  }
}
</style>