export default {
  methods: {
    getPieOptions({
      dataList = [],
      position = ['25%', '50%'],
      radius = ['50%', '70%'],
      title = {
        text: '',
        textStyle: {
          color: '#313131'
        }
      },
      legendStyle = {},
      color = ['#33de25', '#FFDF31', '#F06868', '#00ABFF', '#ccc'],
      labelFormatter = '{b}',
      textColor = '#fff',
      showLabel = true
    }) {
      let total = 0;
      dataList.forEach((item) => {
        total += (+item.value);
      })
      let isOneHundred = dataList.some(item => {
        return +item.value === total
      })
      if (isOneHundred) {
        dataList.forEach(item => {
          if (item.itemStyle) {
            item.itemStyle.borderWidth = 0
          }
        })
      }


      let legendData = dataList.map(item => {
        let name = item.name || '--';
        return {
          name: name,
          icon: 'rect'
        };
      });

      let legend = {
        x: '60%',
        y: 'middle',
        orient: 'vertical',
        data: legendData,
        padding: 5,
        itemGap: 15,
        itemWidth: 13,
        itemHeight: 9,
        textStyle: {
          fontSize: 14,
          color: textColor
        },
        formatter: (name) => {
          let data = dataList.filter(item => {
            return item.name === name
          })
          if (data.length > 0) {
            let count = +data[0].value
            let rate = Math.round((count / total) * 100) + '%'
            return `${name}  ${count}  ${rate}`
          }
          return name + 'dafdfdasfd'
        }
      };
      Object.assign(legend, legendStyle);
      return {
        title,
        animation: false,
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        legend,
        color,
        series: [{
          name: title.text,
          type: 'pie',
          center: position,
          radius: radius,
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center',
              formatter: labelFormatter
            },
            emphasis: {
              show: showLabel,
              textStyle: {
                fontSize: '25',
                fontWeight: 'bold'
              },
              formatter: labelFormatter,
              borderWidth: 0,
              borderColor: 'transparent'
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: dataList
        }]
      };
    }
  }
};