import moment from 'moment';
export default {
  methods: {
    getDataLogOption({
      title,
      max,
      unit,
      dataArr,
      dateType
    }) {
      return {
        title: {
          text: title,
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          formatter: e => {
            if (e[0].seriesName == this.$t('runningStatus')) {
              switch (e[0].data.value[1]) {
                case 1:
                  e[0].data.value[1] = this.$t('standby');
                  break;
                case 2:
                  e[0].data.value[1] = this.$t('normal');
                  break;
                case 3:
                  e[0].data.value[1] = this.$t('fault');
                  break;
                case 4:
                  e[0].data.value[1] = this.$t('breakdown');
                  break;
              }
            }
            var str =
              this.$t('time') +
              '：' +
              e[0].data.value[0] +
              '</br>' +
              e[0].seriesName +
              '：' +
              e[0].data.value[1] +
              ' ' +
              unit;
            return str;
          }
        },
        xAxis: [{
          type: 'time',
          axisLabel: {
            formatter: function (params) {
              var dateStr = moment(params).format('HH:mm');
              switch (dateType) {
                case 'day':
                  break;
                case 'week':
                  dateStr = moment(params).format('MM-DD HH:mm');
                  break;
              }

              if (params == 'Invalid date') {
                return '--';
              }
              return dateStr == 'Invalid date' ? params : dateStr;
            }
          }
        }],
        dataZoom: {
          type: 'inside'
        },
        yAxis: [{
          name: title + '(' + unit + ')',
          type: 'value',
          max: +(max * 1.2).toFixed(2)
        }],
        series: [{
          name: title,
          type: 'line',
          data: dataArr,
          itemStyle: {
            normal: {
              opacity: 0
            }
          },
          lineStyle: {
            normal: {
              color: '#F7A35C'
            }
          }
        }]
      };
    }
  }
};