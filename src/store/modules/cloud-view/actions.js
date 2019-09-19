import http from '@/api/http.js'
import getFormattedValueAndUnit from '@/utils/getFormattedValueAndUnit';
import getCompletedTimeValueList from '@/utils/getCompletedTimeValueList'

const actions = {
  // 汇总action
  querySummaryData(context, playload) {
    let {
      url
    } = playload
    http({
      url
    }).then(response => {
      console.log("cloud response+++++", response);
      let data = response.data && response.data.data
      if (data) {
        let {
          deviceStatusStatisticsVO,
          riskMonthStatisticsVO,
          riskStatisticsVO,
          realtimeRisksVO,
          riskVariationTrendVO
        } = data

        // 设备状态统计
        let deviceStatusWithCounts = deviceStatusStatisticsVO && deviceStatusStatisticsVO.deviceStatusWithCounts
        context.commit("updateDeviceCounts", deviceStatusWithCounts)
        // var deviceStatusData = {}
        let socialUnitStatusWithCounts = deviceStatusStatisticsVO && deviceStatusStatisticsVO.socialUnitStatusWithCounts
        context.commit("updateSocialUnitCounts", socialUnitStatusWithCounts)
        // 月度隐患数统计
        let {
          currentTotalCount: thisMonth,
          monthOnMonthInfo: lastMonth,
          yearOnYearInfo: lastYearMonth
        } = riskMonthStatisticsVO
        console.log("thisMonth, lastMonth, lastYearMonth", thisMonth, lastMonth, lastYearMonth)
        let newHazardCount = {
          thisMonth,
          lastMonth,
          lastYearMonth
        }
        context.commit("updateHazardCount", newHazardCount)

        // 当前隐患处理情况
        let leftRisksByStatus = realtimeRisksVO.leftRisksByStatus
        let todoCount = leftRisksByStatus && leftRisksByStatus[0] && leftRisksByStatus[0].count || '--'
        let doingCount = leftRisksByStatus && leftRisksByStatus[1] && leftRisksByStatus[1].count || '--'
        let newCurrentHazardCount = {
          todoCount,
          doingCount
        }
        context.commit("updateCurrentHazardCount", newCurrentHazardCount)
        // 隐患趋势
        let newHazardTrendData = riskVariationTrendVO.riskTimeCounts
        // 确认下天数30天
        getCompletedTimeValueList({
          dataList: newHazardTrendData,
          beginTime: moment().add(-29, 'days'),
          endTime: moment(),
          formatStr: 'YYYY-MM-DD',
          period: 1,
          periodType: 'days'
        })
        newHazardTrendData.forEach(item => {
          item.value = [item.time, item.value]
        })
        context.commit("updateHazardTrendData", newHazardTrendData)

        // 实时隐患列表---改为从timing那个接口读取，2019.02.19
        // let newCarouselazardList = realtimeRisksVO.risks || []
        // context.commit("updateCarouselHazardList", newCarouselazardList)

        // 右侧图表数据
        let {
          risksByReason: newHazardCauseData,
          risksByArea: newHazardAreaData,
          risksByIndustry: newHazardIndustryData,
          risksByGrade: newHazardLevelData,
        } = riskStatisticsVO
        context.commit("updateHazardCause", newHazardCauseData)
        context.commit("updateHazardArea", newHazardAreaData)
        context.commit("updateHazardIndustry", newHazardIndustryData)
        context.commit("updateHazardLevel", newHazardLevelData)
      }
    })
  },

  // 显示搜索电站结果列表
  querySearchStationList(context, playload) {
    stationMap.getSearchStationList(context, (newSearchStationList, status, response) => {
      context.commit("updateSearchStationList", newSearchStationList);
    });
  },
  setCarouselHazardList(context, newHazardList) {
    context.commit("updateCarouselHazardList", newHazardList)
  },
  // 更新搜索关键字、显示电站详情action
  setStationMapKeyword(context, keyword) {
    let newKeyword = keyword;
    context.commit("updateStationMapKeyword", newKeyword);
  },
  setStationMapShowDetails(context, showDetails) {
    let newShowDetails = showDetails;
    context.commit("updateStationMapShowDetails", newShowDetails);
  },
  setStationMapStationId(context, stationId) {
    let newStationId = stationId;
    context.commit("updateStationMapStationId", newStationId);
  },
  setStationListConfig(context, playload) {
    let newStationListConfig = Object.assign(
      context.state.stationListConfig,
      playload
    );
    context.commit("updateStationListConfig", newStationListConfig);
  },


  // 轮播事件
  queryCarouselAlarmEvents(context, playload) {
    stationMap.getCarouselAlarmEvents(context, (newCarouselAlarmEvents, status, response) => {
      context.commit("updateCarouselAlarmEvents", newCarouselAlarmEvents);
    });
  },
  setStationScatterConfig(context, playload) {
    let newStationScatterConfig = Object.assign(
      context.state.stationScatterConfig,
      playload
    );
    context.commit("updateStationScatterConfig", newStationScatterConfig);
  },
  queryStationScatterList(context) {
    stationMap.getStationScatterList(context, (newStationScatterList, status, response) => {
      context.commit("updateStationScatterList", newStationScatterList);
    });
  },

  resetState(context, playload) {
    context.commit("resetState")
  }
};

export default actions;