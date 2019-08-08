export default {
  methods: {
    getStaticPieOptions({
      dataList = [],
      position = ['50%', '35%'],
      radius = ['50%', '70%'],
      title = {
        text: '--'
      },
      legendStyle = {},
      color = ['#33de25', '#FFDF31', '#F06868', '#00ABFF', '#ccc'],
      labelFormatter = '{b}',
      textColor = '#fff'
    }) {
      let total = 0;
      for (let i = 0, len = dataList.length; i < len; i++) {
        total += dataList[i].value - 0;
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
          return name
        }
      };
      Object.assign(legend, legendStyle);
      return {
        title,
        animation: false,
        tooltip: {
          show: false,
        },
        legend,
        color,
        series: [{
          name: title.text,
          type: 'pie',
          center: position,
          radius: radius,
          avoidLabelOverlap: false,
          hoverAnimation: false,
          // selectedMode: true,
          stillShowZeroSum: true,
          // itemStyle: {
          //   normal: {
          //     label: {
          //       show: false
          //     },
          //     labelLine: {
          //       show: false
          //     },
          //     shadowBlur: 40,
          //     shadowColor: 'rgba(40, 40, 40, 0.5)',
          //   }
          // },
          // label: {
          //   normal: {
          //     show: false,
          //     position: 'center',
          //     formatter: labelFormatter
          //   },
          //   emphasis: {
          //     show: false,
          //     textStyle: {
          //       fontSize: '25',
          //       fontWeight: 'bold'
          //     },
          //     formatter: labelFormatter
          //   }
          // },
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