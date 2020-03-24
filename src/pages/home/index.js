/**
 * @Summary: short description for the file
 * @Date: 2020/3/10 4:50 PM
 * @Author: Youth
 */
import React, {Component} from 'react'
import echarts from 'echarts'
import { inject, observer } from 'mobx-react'
import '../../../node_modules/echarts/map/js/china'

import moduleScss from './Home.module.scss'
import {RecentNum} from '../../components'

export default
@inject('homeStore')
@observer
class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      chinaMapBtnSelectedIndex: 0,
    }
  }

  componentDidMount() {

    global.__chinaMapToolTipClicked = () => {
      console.log('__chinaMapToolTipClicked')
    }

    this.props.homeStore.loadTodayData()
      .then(res => {
        this.chinaMap.setOption({
          series: [
            {
              // 地图系列中的数据内容数组，数组项可以为单个数值
              data: this.props.homeStore.chinaMapNowData
            }
          ],
        })
      })
    this.props.homeStore.loadRecentData()
    this.props.homeStore.loadTodayNotice()

    // 国内疫情地图
    this.chinaMap = echarts.init(document.getElementById('chinaMap'));
    this.chinaMapOption = {
      width:'95%',

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
        itemGap:0,
        pieces: [
          {min: 10000,label: '10000人及以上', color: '#de1f05'},
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
            fontSize:8,
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
          data: this.props.homeStore.chinaMapTotalData
        }
      ]
    }
    this.chinaMap.setOption(this.chinaMapOption)

    // 国内疫情趋势 折线图
    var myChart = echarts.init(document.getElementById('echarts'));
    var option = {
      title: {
        text: 'ECharts 入门示例'
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true
      }]
    };
    myChart.setOption(option);


  }

  chinaMapBtnClicked(index) {
    this.setState({
      chinaMapBtnSelectedIndex: index
    })

    this.chinaMap.setOption({
      series: [
        {
          // 地图系列中的数据内容数组，数组项可以为单个数值
          data: index === 0 ? this.props.homeStore.chinaMapNowData : this.props.homeStore.chinaMapTotalData
        }
      ],
    })
  }

  render() {
    return(
      <div className={moduleScss.wrapper}>
        {this._renderHeader()}
        {this._renderTabChina()}
      </div>
    )
  }

  _renderHeader() {
    return(
      <div className={moduleScss.head}>
        <p className={moduleScss.logo} />
        <p className={moduleScss.title} />
        <p className={moduleScss.jump} />
        <p className={moduleScss.jump_zhuizong} />
        <p className={moduleScss.qs}>
          数据来源：国家及各地卫健委每日信息发布
        </p>
      </div>
    )
  }

  _renderTabChina() {
    return (
      <div className={'tabChina'}>
        <div className={'topDataWrap'}>

          {/*天幕*/}
          <div className={moduleScss.marqueeWarp}>
            <div className={moduleScss.marquee}>
              <div className={moduleScss.marqueeTab}>
                <a>{this.props.homeStore.todayNotice.length > 0 && this.props.homeStore.todayNotice[0]['showNotice']}</a>
              </div>
            </div>
          </div>

          {/*时效*/}
          <div className={moduleScss.timeNum}>
            <p>
              统计截至
              <span>{` ${this.props.homeStore.lastUpdateTime} `}</span>
               更新于
              <span>39分钟</span>
              前
            </p>
          </div>

          {/*最新数据*/}
          <div className={moduleScss.recentNumWrap}>
            <div className={`${moduleScss.recentNumContent} ${moduleScss.topLeftRadius}`}>
              <RecentNum change={this.props.homeStore.chinaAdd.confirm} total={this.props.homeStore.chinaTotal.confirm} description={'累计确诊'} backgroundColor={'#fdf1f1'} color={'#cc1e1e'}/>
            </div>
            <div className={moduleScss.recentNumContent}>
              <RecentNum change={this.props.homeStore.chinaAdd.heal} total={this.props.homeStore.chinaTotal.heal} description={'累计治愈'} backgroundColor={'#f1f8f4'} color={'#178b50'}/>
            </div>
            <div className={`${moduleScss.recentNumContent} ${moduleScss.topRightRadius}`} >
              <RecentNum change={this.props.homeStore.chinaAdd.dead} total={this.props.homeStore.chinaTotal.dead} description={'累计死亡'} backgroundColor={'#f3f6f8'} color={'#4e5a65'}/>
            </div>
            <div className={`${moduleScss.recentNumContent} ${moduleScss.bottomLeftRadius}`}>
              <RecentNum change={this.props.homeStore.chinaAdd.nowConfirm} total={this.props.homeStore.chinaTotal.nowConfirm} description={'现有确诊'} backgroundColor={'#fdf1f1'} color={'#f23a3b'}/>
            </div>
            <div className={moduleScss.recentNumContent}>
              <RecentNum change={this.props.homeStore.chinaAdd.suspect} total={this.props.homeStore.chinaTotal.suspect} description={'现有疑似'} backgroundColor={'#faf2f6'} color={'#ca3f81'}/>
            </div>
            <div className={`${moduleScss.recentNumContent} ${moduleScss.bottomRightRadius}`}>
              <RecentNum change={this.props.homeStore.chinaAdd.nowSevere} total={this.props.homeStore.chinaTotal.nowSevere} description={'现有重症'} backgroundColor={'#fcf4f0'} color={'#f05926'}/>
            </div>
          </div>

          {/* 链接 */}
          <div className={moduleScss.enterWrap}>
            <a className={moduleScss.first}>
              <span className={moduleScss.firstIcon}>今日关注</span>
            </a>
            <a className={moduleScss.mid}>
              <span className={moduleScss.midIcon}>出入境查询</span>
            </a>
            <a>
              <span className={moduleScss.lastIcon}>口罩售卖</span>
            </a>
          </div>

          <div className={moduleScss.chinaMapWrap}>
            <div id={'chinaMap'} className={moduleScss.chinaMap}>
            </div>
            <div className={moduleScss.chinaMapBtns}>
              <span onClick={()=>{this.chinaMapBtnClicked(0)}} className={`${this.state.chinaMapBtnSelectedIndex === 0 && moduleScss.chinaMapBtnSelected}`}>现有确诊</span>
              <span onClick={()=>{this.chinaMapBtnClicked(1)}} className={`${this.state.chinaMapBtnSelectedIndex === 1 && moduleScss.chinaMapBtnSelected}`}>累计确诊</span>
            </div>
          </div>

          <div id={'echarts'} style={{height:'400px'}}>
          </div>

        </div>
      </div>
    )
  }

}