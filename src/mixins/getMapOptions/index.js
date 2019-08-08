import greenStyle from './greenStyle.js';
import blueStyle from './blueStyle.js';
import whiteStyle from './whiteStyle.js';
import lightBlueMapStyle from './lightBlueMapStyle.js';
import midNightBlueStyle from './midNightBlueMapStyle.js';
import nightMapStyle from './nightMapStyle.js';
var systemStyleObj = {
  greenStyle,
  blueStyle,
  lightBlueMapStyle,
  midNightBlueStyle,
  nightMapStyle,
  whiteStyle
};
export default {
  methods: {
    getMapOptions(opts) {
      // 默认参数
      const defaultOpts = {
        labelFormatter: '{b}',
        center: [104.114129, 37.550339],
        zoom: 5,
        seriesIconType: 'scatter',
        dataObj: {},
        systemStyle: 'blueStyle'
      }
      opts = opts ? Object.assign(defaultOpts, opts) : defaultOpts

      var commonColor = '#B1FF5E'; // '#51b9ff'  '#1afa29' '#B1FF5E'
      var tooltip = {
        trigger: 'item',
        enterable: true,
        position: 'right',
        transitionDuration: 1,
        triggerOn: 'click',
        padding: 0
        // extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);'
      }
      if (typeof opts.tooltipFormatter !== 'undefined') {
        tooltip = Object.assign(tooltip, {
          formatter: (params, ticket, callback) => {
            return opts.tooltipFormatter(params, ticket, callback)
          }
        })
      }

      var legendData = []
      Object.keys(opts.dataObj).forEach(key => {
        let name = opts.dataObj[key]['name'] || '--'
        legendData.push({
          name,
          icon: 'circle'
        })
      })
      return {
        animation: false,
        legend: {
          show: false,
          data: legendData,
          right: '2%',
          top: '20.5%',
          textStyle: {
            color: commonColor
          },
          inactiveColor: opts.systemStyle == 'lightBlueMapStyle' ? '#010305' : '#fff',
          // selectedMode: 'single'
        },
        tooltip,
        bmap: {
          center: opts.center,
          zoom: opts.zoom,
          roam: true,
          mapStyle: systemStyleObj[opts.systemStyle] ?
            systemStyleObj[opts.systemStyle] : blueStyle
        },
        series: [{
          name: opts.dataObj.normal && opts.dataObj.normal.name || '--',
          type: opts.seriesIconType,
          // animation: false,
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke'
          },
          // hoverAnimation: false,
          coordinateSystem: 'bmap',
          data: opts.dataObj.normal && opts.dataObj.normal.dataList || [],
          symbol: opts.dataObj.normal && opts.dataObj.normal.symbol || 'circle',
          symbolSize: function (valArr) {
            return [32, 36]
          },
          symbolOffset: [0, '-50%'],
          label: {
            show: false,
            formatter: opts.labelFormatter,
            position: 'left',
          }
        }, {
          name: opts.dataObj.alarm && opts.dataObj.alarm.name || '--',
          type: opts.seriesIconType,
          // animation: false,
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke'
          },
          // hoverAnimation: false,
          coordinateSystem: 'bmap',
          data: opts.dataObj.alarm && opts.dataObj.alarm.dataList || [],
          symbol: opts.dataObj.alarm && opts.dataObj.alarm.symbol || 'circle',
          symbolSize: function (valArr) {
            return [32, 36]
          },
          symbolOffset: [0, '-50%'],
          label: {
            formatter: opts.labelFormatter,
            position: 'left',
            show: false
          }
        }, {
          name: opts.dataObj.offline && opts.dataObj.offline.name || '--',
          type: opts.seriesIconType,
          // animation: false,
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke'
          },
          // hoverAnimation: false,
          coordinateSystem: 'bmap',
          data: opts.dataObj.offline && opts.dataObj.offline.dataList,
          symbol: opts.dataObj.offline && opts.dataObj.offline.symbol || 'circle',
          symbolSize: function (valArr) {
            return [32, 36]
          },
          symbolOffset: [0, '-50%'],
          label: {
            formatter: opts.labelFormatter,
            position: 'left',
            show: false
          }
        }, {
          name: opts.dataObj.error && opts.dataObj.error.name || '--',
          type: opts.seriesIconType,
          // animation: false,
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke'
          },
          // hoverAnimation: false,
          coordinateSystem: 'bmap',
          data: opts.dataObj.error && opts.dataObj.error.dataList,
          symbol: opts.dataObj.error && opts.dataObj.error.symbol || 'circle',
          symbolSize: function (valArr) {
            return [32, 36]
          },
          symbolOffset: [0, '-50%'],
          label: {
            formatter: opts.labelFormatter,
            position: 'left',
            show: false
          }
        }]
      };
    }
  }
}