export default {
  styleJson: [{
      featureType: 'water',
      elementType: 'geometry',
      stylers: {
        color: '#2B5892' // 水的颜色 2B5892 0C224E'
      }
    },
    {
      featureType: 'land',
      elementType: 'geometry',
      stylers: {
        color: '#03092F' //调整土地颜色  03092F 004981
      }
    },
    // {
    //   "featureType": "land",
    //   "elementType": "all",
    //   "stylers": {
    //     "color": "#274e13b0"
    //   }
    // },
    {
      featureType: 'building', //调整建筑物颜色
      elementType: 'geometry',
      stylers: {
        color: '#1a5787'
      }
    },
    {
      featureType: 'railway',
      elementType: 'geometry',
      stylers: {
        visibility: 'off'
      }
    },
    {
      featureType: 'highway', //调整高速道路颜色
      elementType: 'geometry',
      stylers: {
        color: '#03292F' // 03092F 004981
      }
    },
    {
      featureType: 'highway', //调整高速名字是否可视
      elementType: 'labels',
      stylers: {
        visibility: 'off'
      }
    },
    {
      featureType: 'building', //调整建筑物标签是否可视
      elementType: 'labels',
      stylers: {
        visibility: 'off'
      }
    },
    {
      featureType: 'arterial', //调整一些干道颜色
      elementType: 'geometry',
      stylers: {
        color: '#03292F' //03292F 004981
      }
    },
    {
      featureType: 'arterial',
      elementType: 'labels',
      stylers: {
        visibility: 'off'
      }
    },
    {
      featureType: 'green',
      elementType: 'geometry',
      stylers: {
        visibility: 'off'
      }
    },
    {
      featureType: 'subway', //调整地铁颜色
      elementType: 'geometry.stroke',
      stylers: {
        color: '#03292F' // 03292F 003051
      }
    },
    {
      featureType: 'subway',
      elementType: 'labels',
      stylers: {
        visibility: 'off'
      }
    },
    {
      featureType: 'railway',
      elementType: 'labels',
      stylers: {
        visibility: 'off'
      }
    },
    {
      featureType: 'all', //调整所有的标签的边缘颜色
      elementType: 'labels.text.stroke',
      stylers: {
        color: 'rgba(255,255,255,1)'
      }
    },
    {
      featureType: 'all', //调整所有标签的填充颜色
      elementType: 'labels.text.fill',
      stylers: {
        color: '#2B5892' // 03292F 28D1BE
      }
    },
    {
      featureType: 'manmade',
      elementType: 'geometry',
      stylers: {
        visibility: 'off'
      }
    },
    {
      featureType: 'manmade',
      elementType: 'labels',
      stylers: {
        visibility: 'off'
      }
    },
    {
      featureType: 'local',
      elementType: 'geometry',
      stylers: {
        visibility: 'off'
      }
    },
    {
      featureType: 'local',
      elementType: 'labels',
      stylers: {
        visibility: 'off'
      }
    },
    {
      featureType: 'subway',
      elementType: 'geometry',
      stylers: {
        lightness: -65
      }
    },
    {
      featureType: 'railway',
      elementType: 'all',
      stylers: {
        lightness: -40
      }
    },
    // {
    //   featureType: 'boundary',
    //   elementType: 'geometry',
    //   stylers: {
    //     color: '#064f85', // 03292F
    //     weight: '1',
    //     lightness: -29
    //   }
    // },
    // {
    //   featureType: 'boundary',
    //   elementType: 'geometry.fill',
    //   stylers: {
    //     color: '#029fd4' // 03292F
    //   }
    // }
    {
      "featureType": "boundary",
      "elementType": "all",
      "stylers": {
        "color": "#38761dff"
      }
    },
    {
      "featureType": "boundary",
      "elementType": "labels.text.fill",
      "stylers": {
        "color": "#38761dff",
        "visibility": "on"
      }
    }
  ]
};