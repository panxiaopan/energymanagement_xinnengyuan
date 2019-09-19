<template>
  <div class="hj-station-device-management-wrapper">
    <div class="hj-station-device-management-header_back">
      <el-button type="primary" size="mini" @click="back2StationList">
        <img :src="backSrc" :alt="$t('common.return')" :title="$t('common.return')" />
      </el-button>
    </div>
    <el-tabs v-model="activeTabName" @tab-click="handleTabClick">
      <el-tab-pane :label="labelTextObj.firstTabLabel" name="station">
        <el-row>
          <el-col :xs="24" :sm="20" :md="20" :lg="15" :xl="15">
            <social-unit-management
              :unit-id="unitId"
              :update-url="updateUrl"
              ref="socialUnitManagement"
              @complete-add="completeAdd"
            ></social-unit-management>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane :label="labelTextObj.secondTabLabel" name="device" v-if="!isAdd">
        <communication-setting :unit-id="unitId" ref="communicationSetting"></communication-setting>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import SocialUnitManagement from "./social-unit-management.vue";
import CommunicationSetting from "./communication-setting.vue";
export default {
  name: "StationDeviceManagement",
  components: {
    SocialUnitManagement,
    CommunicationSetting
  },
  props: {
    unitId: {
      type: [Number, String],
      default: NaN
    }
  },
  data() {
    return {
      activeTabName: "station",
      backSrc: require("@/assets/images/hj-back.png"),
      labelTextObj: {
        firstTabLabel: this.$t("systemSetting.socialUnitSetting"),
        secondTabLabel: this.$t("systemSetting.deviceManagement")
      },
      isAddMode: false
    };
  },
  computed: {
    isAdd() {
      return isNaN(this.unitId);
    },
    updateUrl() {
      return `./socialUnits/${this.unitId}`;
    }
  },
  beforeRouteLeave(to, from, next) {
    // this.back2StationList;
    let isModified = false;
    if (this.isAdd && !this.isAddMode) {
      isModified = this.$refs.socialUnitManagement.isModified();
    }
    if (isModified) {
      this.$confirm(this.$t("common.unsavedTips"), this.$t("common.warning2"), {
        confirmButtonText: this.$t("common.ok"),
        cancelButtonText: this.$t("common.cancel"),
        type: "warning"
      })
        .then(() => {
          next();
        })
        .catch(() => {
          next(false);
        });
    } else {
      next();
    }
  },
  methods: {
    // ...mapActions(["resetState"]),
    handleTabClick(tabName) {
      if (this.activeTabName === "device") {
        if (!isNaN(this.unitId)) {
          this.$refs["communicationSetting"].queryDataList();
        }
      }
    },
    back2StationList() {
      this.$router.push({
        path: `/systemSetting/socialUnitList`
      });
    },
    completeAdd(isComplete) {
      this.isAddMode = !!isComplete;
      this.$router.push({
        path: `/systemSetting/socialUnitList`
      });
    }
  }
};
</script>
<style lang="less">
@import "./index.less";
</style>