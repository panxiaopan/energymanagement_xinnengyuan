<template>
  <div class="hj-common-alarm-panel-wrapper">
    <div v-if="eventItem">
      <div class="hj-common-alarm-panel__row">
        <div class="hj-common-alarm-panel__row__desc">
          <i class="iconfont icon-shandian" :class="[statusClass]"></i>&nbsp;
          <div class="hj-common-alarm-panel__row__desc__text">
            <div>
              <span>{{eventTime}}</span>&nbsp;
              <span v-if="showStationName">{{stationName}}</span>
            </div>
            <div>{{eventTitle}}</div>
          </div>
        </div>
        <div class="hj-common-alarm-panel__row__btn" v-if="authConfirm">
          <el-button type="primary" @click="click2Confirm" size="mini">{{$t("common.confirm")}}</el-button>
        </div>
      </div>

      <div class="hj-common-alarm-panel__row"  v-if="isVideoEvent">
        <div class="hj-common-alarm-panel__row__img">
          <img :src="eventImgUrl" alt="failedLoading" @click="clickEventImg">
        </div>
        <div class="hj-common-alarm-panel__row__video" @click="click2ViewHistoryVideo">
          <!-- <el-button  size="small"> -->
            <i class="iconfont icon-video"></i>
            <!-- </el-button> -->
        </div>
      </div>
      <div v-show="showBottomLine"  class="hj-common-alarm-panel-line"></div>
    </div>
    <div v-else class="hj-common-alarm-panel__empty">
      {{$t("common.emptyData")}}
    </div>
    <el-dialog :show-close="false" :append-to-body="appendToBody" :visible.sync="showImgDialog">
      <img :src="eventImgUrl" :height="imgHeight" :width="imgWidth" alt="failedloading">
    </el-dialog>
  </div>
</template>

<style scoped>
.hj-common-alarm-panel-wrapper {
  /* padding: 2vh 0; */
  padding-top: 2vh;
  width: 100%;
  font-size: 1.5vh;
}
.hj-common-alarm-panel__row {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.hj-common-alarm-panel__row__desc {
  display: flex;
  align-items: center;
}
.icon-shandian {
  /* height: 2vh; */
  font-size: 3vh;
}
.icon-video {
  /* cursor: pointer; */
  font-size: 3vh;
  color: #5ac769;
}
.warning {
  color: #f0ad4e;
}
.info {
  color: #5bc0de;
}
.error {
  color: #d9534f;
}
.hj-common-alarm-panel__row__img img {
  height: 5vh;
  /* max-width: 50%; */
  max-width: 20vw;
}
.hj-common-alarm-panel__row__video {
  cursor: pointer;
}
.hj-common-alarm-panel-line {
  width: 100%;
  /* height: 2px; */
  margin-top: 1vh;
  border-bottom: 1px solid #ffffff;
}
.hj-common-alarm-panel__empty {
  padding: 1vh;
  text-align: center;
}
</style>


<script>
const ERROR_LEVEL = 1;
const WARNNING_LEVEL = 2;
const INFO_LEVEL = 3;

const VIDEO_EVENT = 3;
const COMMUNICATION_EVENT = 1;
const DEVICE_EVENT = 2;
export default {
  name: "AlarmPanel",
  props: {
    authConfirm: {
      type: Boolean,
      default: true
    },
    eventItem: {
      type: Object,
      default: function() {
        return null;
      }
    },
    // 是否显示电站名称
    showStationName: {
      type: Boolean,
      default: false
    },
    // 是否嵌套
    appendToBody: {
      type: Boolean,
      default: false
    },
    // confirmEventUrl: {
    //   type: String,
    //   default: ''
    // },
    showBottomLine: {
      type: Boolean,
      default: true
    },
    clickConfirm: {
      type: Function,
      default: params => {
        // console.log("params")
      }
    },
    clickVideo: {
      type: Function,
      default: params => {}
    }
  },
  data() {
    return {
      // statusClass: 'warning',  // warning 告警 info 信息 error 故障
      showImgDialog: false,
      imgHeight: 200,
      imgWidth: 200
    };
  },
  computed: {
    statusClass() {
      var eventClass =
        this.eventItem.eventClass && this.eventItem.eventClass.value;
      switch (+eventClass) {
        case WARNNING_LEVEL:
          return "warning";
        case INFO_LEVEL:
          return "info";
        case ERROR_LEVEL:
          return "error";
      }
    },
    stationName() {
      return this.eventItem.stationName || "--";
    },
    eventTitle() {
      var deviceName = this.eventItem.deviceName || "--";
      var desc = this.eventItem.desc;
      if (this.isVideoEvent) {
        try {
          desc = JSON.parse(desc)["eventDesc"];
        } catch (e) {
          console.error("JSON Parse event desc error");
        }
      }
      return `${deviceName}: ${desc}`;
    },
    eventTime() {
      return this.eventItem.eventTime;
    },
    isVideoEvent() {
      var eventType =
        this.eventItem.eventType && this.eventItem.eventType.value;
      return eventType === VIDEO_EVENT;
    },
    eventImgUrl() {
      var desc = this.eventItem.desc;
      var url = "";
      if (this.isVideoEvent) {
        try {
          desc = JSON.parse(desc);
        } catch (e) {
          console.error("JSON Parse event desc error");
        }
        url = desc.pic;
      }
      // var preUrl =
      //   window.location.protocol +
      //   "//" +
      //   window.location.host +
      //   "/" +
      //   window.location.pathname.split("/")[1];
      // if (url) {
      //   if (process.env.NODE_ENV === "production") {
      //     url = preUrl + url;
      //   } else {
      //     url = "." + url;
      //   }
      // }

      return url;
    }
  },
  methods: {
    click2Confirm() {
      // this.clickConfirm(this.eventItem)
      // console.log("alarm item", item)
      this.$emit("click-confirm", this.eventItem);
    },
    clickEventImg() {
      var newImage = new window.Image();
      newImage.src = this.eventImgUrl;
      newImage.onload = () => {
        if (newImage.height > window.innerHeight * 0.6) {
          this.imgHeight = window.innerHeight * 0.6;
        }
        if (newImage.width > window.innerWidth * 0.4) {
          this.imgWidth = window.innerWidth * 0.4;
        }
      };
      this.$nextTick(() => {
        this.showImgDialog = true;
      });
    },
    click2ViewHistoryVideo() {
      this.$emit("click-video", this.eventItem);
      // this.clickVideo(this.eventItem)
    }
  },
  mounted() {}
};
</script>
