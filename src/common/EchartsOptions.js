/**
 * @Summary: short description for the file
 * @Date: 2020/3/24 7:28 PM
 * @Author: Youth
 */
const chinaAddConfirmSuspect = {
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    top: 20,
    left: 0,
    icon:'rect',
    data: ['确诊', '疑似']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    top: 50,
    containLabel: true
  },
  xAxis: {
    type: 'category',
    axisLabel: {
      rotate: 30,
      fontSize: 10,
      margin: 16,
      fontWeight: 200,
    },
    axisTick: {
      show: false,
    }
  },
  yAxis: {
    type: 'value',
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      fontSize: 10,
      fontWeight: 400,
    }
  },
  series: [{
    name: '确诊',
    data: [],
    type: 'line',
    smooth: true,
    color:'#f06061'
  },{
    name: '疑似',
    data: [],
    type: 'line',
    smooth: true,
    color:'#ffd661'
  }]
};

const chinaMapOption = {
  width: '95%',
  // 提示框组件
  tooltip: {
    // 触发类型, 数据项图形触发
    trigger: 'item',
    enterable: true,
    // 使用函数模板，传入的数据值 ——> value: number | Array
    formatter: '{b0} : {c0} <br /> <div onclick="__chinaMapToolTipClicked()">sss</div>',

  },
  // 视觉映射组件
  visualMap: {
    type: 'piecewise',
    itemHeight: 16,
    itemWidth: 6,
    itemGap: 0,
    pieces: [
      {min: 10000, label: '10000人及以上', color: '#de1f05'},
      {min: 1000, max: 9999, label: '1000-9999人', color: '#ff2736',},
      {min: 500, max: 999, label: '500-999人', color: '#ff6341',},
      {min: 100, max: 499, label: '100-499人', color: '#ffa577',},
      {min: 10, max: 99, label: '10-99人', color: '#ffcea0',},
      {min: 1, max: 9, label: '1-9人', color: '#ffe7b2',},
      {min: 0, max: 0, label: '0人', color: '#e2ebf4',},
    ],
  },
  series: [
    {
      // 类型
      type: 'map',
      // 系列名称，用于tooltip的显示，legend 的图例筛选 在 setOption 更新数据和配置项时用于指定对应的系列
      map: 'china',
      // 地图类型
      // mapType: 'province',
      // 是否开启鼠标缩放和平移漫游 默认不开启
      // 如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move' 设置成 true 为都开启
      roam: false,
      // 图形上的文本标签
      label: {
        show: true, // 是否显示对应地名,
        fontSize: 8,
      },
      // 地图区域的多边形 图形样式
      itemStyle: {
        // 地图区域的颜色 如果设置了visualMap, 这个属性将不起作用
        areaColor: '#e2ebf4',
        // 描边线宽 为 0 时无描边
        borderWidth: 0.5,
        // 图形的描边颜色 支持的颜色格式同 color
        borderColor: '#fff',
        // 描边类型，默认为实线，支持 'solid', 'dashed', 'dotted'
        borderType: 'solid'
      },
      // 高亮状态
      emphasis: {
        // 文本标签
        label: {
          // 是否显示标签
          show: true,
          // 文字的颜色 如果设置为 'auto'，则为视觉映射得到的颜色，如系列色
          color: '#fff'
        },
        // 图形样式
        itemStyle: {
          // 地图区域的颜色
          areaColor: '#FF6347'
        }
      },
      // 地图系列中的数据内容数组，数组项可以为单个数值
      data: []
    }
  ]
}

export {
  chinaMapOption,
  chinaAddConfirmSuspect
}