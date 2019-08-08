export default {
  methods: {
    getRadarOptions({
      title = {
        text: '',
        textStyle: {
          color: '#313131'
        }
      },
      indicator,
      dataList,
      seriesName = '',
      textColor = "#fff",
      splitColor = ['#2175FF', '#656AEE', '#1A53B9', '#163D8A', '#122659'],
      axisLineColor = '#428AFF',
      radius = '70%',
      areaStyleColor = '#A970FF'
    }) {
      var max = Math.max.apply(null, dataList)
      indicator = indicator.map(item => {
        item.max = max
        return item
      })
      return {
        title,
        tooltip: {
          show: false,
          // formatter: function (params) {
          //   console.log("params", params)
          //   return JSON.stringify(params)
          // }
        },

        radar: {
          // nameGap: 5,
          name: {
            color: textColor,
            formatter: function (value, indicator) {
              // console.log("indicator", indicator)
              let count = indicator.value || '0'
              return value + ' ' + count;
            }
          },
          indicator,
          radius,
          startAngle: 45,
          axisLine: {
            lineStyle: {
              color: axisLineColor
            }
          },
          splitLine: {
            lineStyle: {
              color: splitColor,
              opacity: 0.6
            }
          },
          splitArea: {
            areaStyle: {
              color: splitColor
            }
          }
        },
        series: [{
          name: seriesName,
          type: 'radar',
          areaStyle: {
            // type: 'default',
            color: areaStyleColor,
            opacity: 0.6
          },
          lineStyle: {
            color: axisLineColor,
            // opacity: 0.6
          },

          data: [{
            value: dataList,
            name: ''
          }]
        }]
      };
    }
  }
}