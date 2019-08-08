export default {
  methods: {
    getBarOptions({
      textColor = '#fff',
      dataList,
      yAxisName = '',
      seriesName = '',
      yAxisType = 'value',
      xAxisType = 'category',
      barWidth = '60%',
      axisData = [],
      showSplitLine = false,
      axisLineColor = '#fff',
      showAxis = true,
      splitNumber = 5,
      grid,
      title,
      yAxisInterval = 'auto',
      xAxisInterval = 'auto',
      xAxisNameRotate = null
    }) {
      let defaultGrid = {
        left: '5%',
        right: '5%',
        top: '10%',
        bottom: '10%',
        containLabel: true
      }
      let defaultTitle = {
        text: ''
      }
      if (grid) {
        Object.assign(defaultGrid, grid)
      }
      if (title) {
        Object.assign(defaultTitle, title)
      }
      let yAxis = {
        show: showAxis,
        name: yAxisName,
        nameGap: 10,
        type: yAxisType,
        // nameRotate: 45,
        nameTextStyle: {
          color: textColor
        },
        axisLine: {
          lineStyle: {
            color: axisLineColor
          }
        },
        axisTick: {
          show: true,
          lineStyle: {
            color: axisLineColor
          }
        },
        axisLabel: {
          rotate: 0,
          textStyle: {
            color: textColor
          },
          interval: yAxisInterval
        },
        splitLine: {
          show: showSplitLine
        },
        splitNumber
      }
      let xAxis = {
        show: showAxis,
        type: xAxisType,
        // nameRotate: 45,
        axisLine: {
          lineStyle: {
            color: axisLineColor
          }
        },
        axisTick: {
          show: true,
          lineStyle: {
            color: axisLineColor
          }
        },
        axisLabel: {
          rotate: xAxisNameRotate,
          textStyle: {
            color: textColor
          },
          interval: xAxisInterval,
          // align: 'right'
        },
        splitLine: {
          show: showSplitLine
        }
      }
      if (yAxisType === 'value') {
        Object.assign(xAxis, {
          data: axisData
        })
      } else {
        Object.assign(yAxis, {
          data: axisData
        })
      }
      return {
        title: defaultTitle,
        color: ['#FF7271', '#51B9FF'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
            // lineStyle: {
            //   color: textColor,
            //   opacity: 0.5
            // }
          },
          // position: ['25%', '25%'],
          textStyle: {
            fontFamily: 'Microsoft YaHei'
          }
        },
        legend: {
          data: [{
            name: seriesName,
            icon: 'circle'
          }],
          left: '30%',
          textStyle: {
            color: textColor
          }
        },
        grid: defaultGrid,
        xAxis,
        yAxis,
        series: [{
          name: seriesName,
          type: 'bar',
          barWidth,
          data: dataList
        }]
      }
    }
  }
}