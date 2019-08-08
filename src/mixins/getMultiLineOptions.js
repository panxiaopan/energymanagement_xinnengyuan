export default {
  methods: {
    getMultiLineOptions(options) {
      let defaultOptions = {
        textColor: '#000000',
        yAxisName: '',
        seriesName: [],
        dataList: [],
        hasMark: false,
        markTimeValue: {},
        xAxisLabel: {
          rotate: 0,
          textStyle: {
            color: "#000000"
          },
          formatter: function (value) {
            return moment(value).format("MM-DD")
          }
        },
        showDataZoom: false
      }
      if (options) {
        Object.assign(defaultOptions, options)
      }
      var series = defaultOptions.dataList.map((item, index) => {
        item = {
          name: defaultOptions.seriesName[index] || '',
          type: 'line',
          smooth: true,
          symbol: 'none',
          data: item,
          // tooltip: {
          //   trigger: 'axis',
          //   formatter: '{b0}: {c0}<br />{b1}: {c1}'
          // }
        }
        return item
      })
      if (defaultOptions.hasMark) {
        series.push({
          name: defaultOptions.markTimeValue.name || '',
          type: 'scatter',
          smooth: true,
          symbol: 'pin',
          symbolSize: 20,
          data: defaultOptions.markTimeValue.value || [],
        })
      }
      var legendData = defaultOptions.seriesName.map(item => {
        item = {
          name: item,
          icon: 'circle'
        }
        return item
      })

      return {
        tooltip: {
          trigger: 'axis',
          // formatter: '{@value}\n{a}:{@value}',
          formatter: (params) => {
            // console.log("params+++", params)
            // let pLen = params.length
            // let dLen = dataList.length
            let formatterStr = ''
            // if (pLen === dLen) {
            let time = ''
            let text = ''
            params.forEach(item => {
              time = item.value[0]
              if (item.value[3]) {
                text += `${this.$t('common.description')}: ${item.value[3]}<br />`
              }
              let name = item.seriesName ? (item.seriesName + ':') : ''
              let value = item.value[1]
              let unit = item.value[2] || ''
              // 数据为空或无数据
              if (isNaN(value)) {
                value = this.$t("common.emptyData")
                unit = ''
              }
              text += `${name} ${value} ${unit}<br />`
            })
            formatterStr = `${time}<br />${text}`

            return formatterStr
          }
        },
        grid: {
          left: '5%',
          right: '5%',
          bottom: '15%',
          top: 20,
          containLabel: true
        },
        legend: {
          data: legendData,
          right: '10%',
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
          axisLabel: defaultOptions.xAxisLabel
        },
        yAxis: [{
          name: defaultOptions.yAxisName,
          nameGap: 5,
          type: 'value',
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
          },
          boundaryGap: ['0', '50%']
        }],
        dataZoom: [{
          type: 'inside',
          // xAxisIndex: 0,
          start: 0,
          end: 100
        }, {
          show: defaultOptions.showDataZoom,
          // xAxisIndex: 0,
          start: 0,
          end: 100,
        }],
        series,

        // series: [{
        //   name: seriesName,
        //   type: 'line',
        //   smooth: true,
        //   symbol: 'none',
        //   data: dataList
        // }]
      };
    }
  }
};