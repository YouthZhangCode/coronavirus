/**
 * @Summary: short description for the file
 * @Date: 2020/3/24 7:28 PM
 * @Author: Youth
 */
const commonChartsOption = {
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    left: '0',
    right: '0%',
    bottom: '0',
    top: '5%',
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
}
const chinaAddConfirmSuspect = {
  _id: 'chinaAddConfirmSuspect',
  ...commonChartsOption,
  legend: {
    data: ['确诊', '疑似'],
    show:false,
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
const chinaConfirmSuspectImported = {
  _id: 'chinaConfirmSuspectImported',
  ...commonChartsOption,
  legend: {
    data: ['累计确诊', '现有确诊', '现有疑似', '现有重症'],
    show: false,
  },
  series: [{
    name: '累计确诊',
    data: [],
    type: 'line',
    smooth: true,
    color: '#9b0a0e'
  },{
    name: '现有确诊',
    data: [],
    type: 'line',
    smooth: true,
    color: '#ff7b7c'
  },{
    name: '现有疑似',
    data: [],
    type: 'line',
    smooth: true,
    color: '#ffd661'
  },{
    name: '现有重症',
    data: [],
    type: 'line',
    smooth: true,
    color: '#cd73bf'
  }]
}

const chinaHealDead = {
  _id: 'chinaHealDead',
  ...commonChartsOption,
  legend: {
    data: ['累计治愈', '累计死亡',],
    show: false,
  },
  series: [{
    name: '累计治愈',
    data: [],
    type: 'line',
    smooth: true,
    color: '#65b379'
  },{
    name: '累计死亡',
    data: [],
    type: 'line',
    smooth: true,
    color: '#87878b'
  }]
}

const chinaHealDeadRate = {
  _id: 'chinaHealDeadRate',
  ...commonChartsOption,
  legend: {
    data: ['治愈率', '病死率',],
    show: false,
  },
  series: [{
    name: '治愈率',
    data: [],
    type: 'line',
    smooth: true,
    color: '#65b379'
  },{
    name: '病死率',
    data: [],
    type: 'line',
    smooth: true,
    color: '#87878b'
  }]
}

const importedTop10 = {
  _id: 'importedTop10',
  ...commonChartsOption,
  series: {
    type: 'bar',
    barWidth: '8px',
    itemStyle: {
      normal: {
        color: function (params) {
          let colorList = ['#ff2736', '#ff2736', '#ff2736','#ff2736','#ffa577','#ffa577','#ffa577','#ffcea0','#ffcea0','#ffcea0',]
          return colorList[params.dataIndex]
        }
      }
    }
  }
}

const importedAdd = {
  _id: 'importedAdd',
  ...commonChartsOption,
  series: {
    name: '境外输入新增',
    data: [],
    type: 'line',
    smooth: true,
    color: '#ff6341',
  }
}

const importedTotal = {
  _id: 'importedTotal',
  ...commonChartsOption,
  series: {
    name: '境外输入累计',
    data: [],
    type: 'line',
    smooth: true,
    color: '#de1f05',
  }
}

const chinaMapOption = {
  width: '95%',
  // 提示框组件
  tooltip: {
    // 触发类型, 数据项图形触发
    trigger: 'item',
    enterable: true,
    formatter: function (params) {
      console.log(1111, params)
      let tip = params.name + '：' + params.value;
      return '<div onclick=__chinaMapToolTipClicked(' + JSON.stringify(params.name) + ')>' + tip + '</div>'
    }
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

const provinceMapOption = {
  width: '95%',
  // 提示框组件
  tooltip: {
    // 触发类型, 数据项图形触发
    trigger: 'item',
    enterable: true,
    formatter: function (params) {
      console.log(1111, params)
      let tip = params.name + '：' + params.value;
      return '<div onclick=__chinaMapToolTipClicked(' + JSON.stringify(params.name) + ')>' + tip + '</div>'
    }
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
      // 地图类型
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

const chinaForeignConfirmAdd = {
  ...commonChartsOption,
  _id: 'chinaForeignConfirmAdd',
  legend: {
    data: ['中国', '海外'],
    show: false,
  },
  series:[
    {
      name: '中国',
      data: [],
      type: 'line',
      smooth: true,
      color: '#ff7b7c',
    },
    {
      name: '海外',
      data: [],
      type: 'line',
      smooth: true,
      color: '#9b0a0e',
    },
  ]
}

const chinaForeignConfirm = {
  ...commonChartsOption,
  _id: 'chinaForeignConfirm',
  legend: {
    data: ['中国累计', '中国现有', '海外累计', '海外现有'],
    show: false,
  },
  series: [
    {
      name: '中国累计',
      data: [],
      type: 'line',
      smooth: true,
      color: '#ff7b7c',
    },
    {
      name: '中国现有',
      data: [],
      type: 'line',
      smooth: true,
      color: '#ffd661',
    },
    {
      name: '海外累计',
      data: [],
      type: 'line',
      smooth: true,
      color: '#9b0a0e',
    },
    {
      name: '海外现有',
      data: [],
      type: 'line',
      smooth: true,
      color: '#ffa655',
    },
  ]
}

const chinaForeignHealRate = {
  ...commonChartsOption,
  legend: {
    data: ['中国', '海外'],
    show: false,
  },
  _id: 'chinaForeignHealRate',
  series: [
    {
      name: '中国',
      data: [],
      type: 'line',
      smooth: true,
      color: '#acdb70',
    },
    {
      name: '海外',
      data: [],
      type: 'line',
      smooth: true,
      color: '#2b7c74',
    },
  ]
}

const chinaForeignDeadRate = {
  _id: 'chinaForeignDeadRate',
  ...commonChartsOption,
  legend: {
    data: ['中国', '海外'],
    show: false,
  },
  series: [
    {
      name: '中国',
      data: [],
      type: 'line',
      smooth: true,
      color: '#b07c4d',
    },
    {
      name: '海外',
      data: [],
      type: 'line',
      smooth: true,
      color: '#2e75b6',
    }
  ]
}

const addConfirmTop10 = {
  _id: 'addConfirmTop10',
  ...commonChartsOption,
  series: {
    type: 'bar',
    barWidth: '8px',
    itemStyle: {
      normal: {
        color: function (params) {
          var colorList = ['#ff2736', '#ff2736', '#ffa577','#ffa577','#ffa577','#ffa577','#ffa577','#ffcea0','#ffcea0','#ffcea0',]
          return colorList[params.dataIndex]
        }
      }
    }
  }
}

const countryWeakRank = {
  _id: 'countryWeakRank',
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    left: '0',
    right: '0%',
    bottom: '0',
    top: '5%',
    containLabel: true
  },
  yAxis: {
    type: 'category',
    axisTick: {
      show: false,
    },
    axisLine: {
      lineStyle: {
        color: '#ccc',
        width: 1,
      }
    },
    axisLabel: {
      fontSize: 7,
      margin: 5,
      fontWeight: 500,
      color:'#888'
    },

  },
  xAxis: {
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
  series: {
    type: 'bar',
    barWidth: '8px',
    itemStyle: {
      normal: {
        color: function (params) {
          var colorList = ['#ff2736', '#ff2736', '#ffa577','#ffa577','#ffa577','#ffa577','#ffa577','#ffcea0','#ffcea0','#ffcea0',].reverse()
          return colorList[params.dataIndex]
        }
      }
    }
  }
}

const millionConfirmRank = {
  ...countryWeakRank,
  _id: 'millionConfirmRank',
}

const europeCountriesAddConfirm = {
  _id: 'europeCountriesAddConfirm',
  ...commonChartsOption,
  legend: {
    data: ['意大利', '西班牙', '德国', '法国'],
    show: false,
  },
  series: [
    {
      type: 'line',
      smooth: true,
      data: [],
      name: '意大利',
      color: '#9b0a0e',
    },
    {
      type: 'line',
      smooth: true,
      data: [],
      name: '西班牙',
      color: '#ff7b7c',
    },{
      type: 'line',
      smooth: true,
      data: [],
      name: '德国',
      color: '#ffa655',
    },{
      type: 'line',
      smooth: true,
      data: [],
      name: '法国',
      color: '#ffd661',
    }],
}

const asianCountriesAddConfirm = {
  _id: 'asianCountriesAddConfirm',
  ...commonChartsOption,
  legend: {
    data: ['韩国', '日本', '伊朗'],
    show: false,
  },
  series: [
    {
      name: '韩国',
      type: 'line',
      smooth: true,
      data: [],
      color: '#9b0a0e',
    },{
      name: '日本',
      type: 'line',
      smooth: true,
      data: [],
      color: '#ff7b7c',
    },{
      name: '伊朗',
      type: 'line',
      smooth: true,
      data: [],
      color: '#ffa655',
    }],
}

const northAmericaCountriesAddConfirm = {
  _id: 'northAmericaCountriesAddConfirm',
  ...commonChartsOption,
  legend: {
    data: ['美国', '加拿大'],
    show: false,
  },
  series: [
    {
      name: '美国',
      type: 'line',
      smooth: true,
      data: [],
      color: '#9b0a0e',
    },{
      name: '加拿大',
      type: 'line',
      smooth: true,
      data: [],
      color: '#ff7b7c',
    }],
}

const foreignCountriesConfirm = {
  _id: 'foreignCountriesConfirm',
  ...commonChartsOption,
  legend: {
    data: ['意大利', '伊朗', '西班牙', '德国', '英国', '法国', '美国', '日本'],
    show: false,
  },
  series: [{
    name: '意大利',
    type: 'line',
    smooth: true,
    data: [],
    color: '#9b0a0e',
  },{
    name: '伊朗',
    type: 'line',
    smooth: true,
    data: [],
    color: '#ff7b7c',
  },{
    name: '西班牙',
    type: 'line',
    smooth: true,
    data: [],
    color: '#ffa655',
  },{
    name: '德国',
    type: 'line',
    smooth: true,
    data: [],
    color: '#ffd661',
  },{
    name: '英国',
    type: 'line',
    smooth: true,
    data: [],
    color: '#cd73bf',
  },{
    name: '法国',
    type: 'line',
    smooth: true,
    data: [],
    color: '#7e74eb',
  },{
    name: '美国',
    type: 'line',
    smooth: true,
    data: [],
    color: '#5591fa',
  },{
    name: '日本',
    type: 'line',
    smooth: true,
    data: [],
    color: '#60bbfc',
  },],
}

const continentWeekConfirm = {
  _id: 'continentWeekConfirm',
  ...commonChartsOption,
  legend: {
    data: ['欧洲', '亚洲(不含中国)', '北美洲', '南美洲', '大洋洲', '非洲', '其他', '海外现有确诊'],
    show: false,
  },
  series: [
    {
      name:'欧洲',
      type: 'bar',
      barWidth: 8,
      stack: 'one',
      barGap: 0,
      data: [],
      color: '#dd0b10',
    },{
      name:'亚洲',
      type: 'bar',
      stack: 'one',
      data: [],
      color: '#ff6060',
    },{
      name:'北美洲',
      type: 'bar',
      stack: 'one',
      data: [],
      color: '#ffa655',
    },{
      name:'南美洲',
      type: 'bar',
      stack: 'one',
      data: [],
      color: '#fedd7f',
    },{
      name:'大洋洲',
      type: 'bar',
      stack: 'one',
      data: [],
      color: '#ae79ff',
    },{
      name:'非洲',
      type: 'bar',
      stack: 'one',
      data: [],
      color: '#ffafe6',
    },{
      name:'其他',
      type: 'bar',
      stack: 'one',
      data: [],
      color: '#d7c7d2',
    },{
      name:'海外现有确诊',
      type: 'bar',
      barWidth: 8,
      data: [],
      color: '#92b8ff',
    },
  ],

}

const provinceConfirmAdd = {
  _id: 'provinceConfirmAdd',
  ...commonChartsOption,
  legend: {
    data: ['新增确诊', '新增治愈', '新增死亡'],
    show: false,
  },
  series: [
    {
      type: 'line',
      smooth: true,
      data: [],
      name: '新增确诊',
      color: '#f06061',
    },
    {
      type: 'line',
      smooth: true,
      data: [],
      name: '新增治愈',
      color: '#65b379',
    },{
      type: 'line',
      smooth: true,
      data: [],
      name: '新增死亡',
      color: '#87878b',
    }],
}

const provinceConfirm = {
  _id: 'provinceConfirm',
  ...commonChartsOption,
  legend: {
    data: ['现有确诊', '累计确诊', '累计治愈', '累计死亡'],
    show: false,
  },
  series: [
    {
      type: 'line',
      smooth: true,
      data: [],
      name: '现有确诊',
      color: '#f06061',
    },{
      type: 'line',
      smooth: true,
      data: [],
      name: '累计确诊',
      color: '#9b0a0e',
    },{
      type: 'line',
      smooth: true,
      data: [],
      name: '累计治愈',
      color: '#65b379',
    },{
      type: 'line',
      smooth: true,
      data: [],
      name: '累计死亡',
      color: '#87878b',
    }],
}

export {

  // 国内
  chinaMapOption,
  chinaAddConfirmSuspect,
  chinaConfirmSuspectImported,
  chinaHealDead,
  chinaHealDeadRate,
  importedTop10,
  importedAdd,
  importedTotal,

  // 国外
  foreignCountriesConfirm,
  chinaForeignConfirmAdd,
  chinaForeignConfirm,
  chinaForeignDeadRate,
  chinaForeignHealRate,
  addConfirmTop10,

  // weekContinentMillion
  countryWeakRank,
  millionConfirmRank,
  continentWeekConfirm,

  // 洲际
  europeCountriesAddConfirm,
  asianCountriesAddConfirm,
  northAmericaCountriesAddConfirm,

  // 省
  provinceMapOption,
  provinceConfirmAdd,
  provinceConfirm,

}