export default {
  methods: {
    getHBarOptions({
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
      grid,
      title
    }) {
      let defaultGrid = {
        left: '5%',
        right: '5%',
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
        show: true,
        name: yAxisName,
        nameGap: 5,
        type: yAxisType,
        axisLine: {
          show: false,
          lineStyle: {
            color: axisLineColor
          }
        },
        axisTick: {
          show: false,
          lineStyle: {
            color: axisLineColor
          }
        },
        axisLabel: {
          rotate: 0,
          textStyle: {
            color: textColor
          }
        },
        splitLine: {
          show: showSplitLine
        }
      }
      let xAxis = {
        show: false,
        type: xAxisType,
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
        },
        splitLine: {
          show: showSplitLine
        },
        boundaryGap: ['0', '20%']
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
            fontFamily: '微软雅黑'
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
        dataZoom: [{
          type: 'inside',
          xAxisIndex: 0,
          start: 0,
          end: 100
        }],
        series: [{
          name: seriesName,
          type: 'bar',
          barWidth,
          label: {
            normal: {
              show: true,
              position: 'right'
            }
          },
          data: dataList
        }]

      }
    }
  }
}