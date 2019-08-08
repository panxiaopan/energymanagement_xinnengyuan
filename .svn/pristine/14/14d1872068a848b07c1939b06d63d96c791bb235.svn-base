export default {
  methods: {
    getLineOptions(options) {
      let defaultOptions = {
        textColor: '#000000',
        // dateType = 'date',
        dataList: [],
        yAxisName: '',
        seriesName: '',
        showDataZoom: false
      }
      if (options) {
        Object.assign(defaultOptions, options)
      }
      return {
        // title,
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '5%',
          right: '5%',
          bottom: '10%',
          top: 25,
          containLabel: true
        },
        legend: {
          data: [{
            name: defaultOptions.seriesName,
            icon: 'circle'
          }],
          left: 'center',
          textStyle: {
            color: defaultOptions.textColor
          }
        },
        xAxis: {
          type: 'time',
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: defaultOptions.textColor
            }
          },
          axisTick: {
            show: true,
            lineStyle: {
              color: defaultOptions.textColor
            }
          },
          axisLabel: {
            rotate: 0,
            textStyle: {
              color: defaultOptions.textColor
            },
            formatter: function (value, index) {
              return moment(value).format("MM-DD")
            }
          }
        },
        yAxis: [{
          name: defaultOptions.yAxisName,
          nameGap: 10,
          type: 'value',
          boundaryGap: [0, '100%'],
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: defaultOptions.textColor
            }
          },
          axisTick: {
            show: true,
            lineStyle: {
              color: defaultOptions.textColor
            }
          },
          axisLabel: {
            rotate: 0,
            textStyle: {
              color: defaultOptions.textColor
            }
          }
        }],
        animation: false,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            animation: false
          },
        },
        dataZoom: [{
          type: 'inside',
          // xAxisIndex: 0,
          start: 0,
          end: 100
        }, {
          show: defaultOptions.showDataZoom,
          start: 0,
          end: 100,
        }],


        series: [{
          name: defaultOptions.seriesName,
          type: 'line',
          smooth: true,
          symbol: 'none',
          data: defaultOptions.dataList
        }]
      };
    }
  }
};