import initState from './initState.js'
const mutations = {
  updateDeviceStatusData(state, newDeviceStatusData) {
    state.deviceStatusData = newDeviceStatusData
  },
  updateHazardCount(state, newHazardCount) {
    state.hazardCount = newHazardCount
  },
  updateCurrentHazardCount(state, newCurrentHazardCount) {
    state.currentHazardCount = newCurrentHazardCount;
  },
  updateHazardTrendData(state, newHazardTrendData) {
    state.hazardTrendData = newHazardTrendData;
  },
  updateCarouselHazardList(state, newCarouselHazardList) {
    state.carouselHazardList = newCarouselHazardList;
  },
  updateHazardCause(state, newHazardCauseData) {
    state.hazardCauseData = newHazardCauseData
  },
  updateHazardArea(state, newHazardAreaData) {
    state.hazardAreaData = newHazardAreaData
  },
  updateHazardIndustry(state, newHazardIndustryData) {
    state.hazardIndustryData = newHazardIndustryData
  },
  updateHazardLevel(state, newHazardLevelData) {
    state.hazardLevelData = newHazardLevelData
  },
  updateDeviceCounts(state, newDeviceCounts) {
    state.deviceCounts = newDeviceCounts
  },
  updateSocialUnitCounts(state, newSocialUnitCounts) {
    state.socialUnitCounts = newSocialUnitCounts
  },

  resetState(state) {
    Object.assign(state, initState)
  }
};

export default mutations;