<template>
  <div :class="className" :style="styles"></div>
</template>

<script>
// import ECharts from 'echarts';
// import echartsLiquidfill from 'echarts-liquidfill'

// import echartsLiquidfill from "@/plugins/echartsPlugins/liquidfill/liquidfill.js";
// import bmap from 'echarts/extension/bmap/bmap'

// import echartsLiquidfill from '@/plugins/liquidfill/liquidFill.js'
// import bmap from '@/plugins/echartsPlugins/bmap/bmap.js'
// import echartsLiquidfill from '../../plugins/liquidfill/liquid-fill.js'
// import bmap from '../../plugins/echarts-plugins/bmap/bmap.js'

import Debounce from "lodash.debounce";
// import Resize from 'element-resize-event';
import Resize from "element-resize-detector";
import Wrapper from "@/plugins/wrapper.js";

const IEcharts = Wrapper(echarts, Resize, Debounce);
export default IEcharts;
</script>

