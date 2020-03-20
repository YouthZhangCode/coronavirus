/**
 * @Summary: short description for the file
 * @Date: 2020/3/10 4:50 PM
 * @Author: Youth
 */
import React, {Component} from 'react'
import {Map, Marker} from 'react-amap'
import F2 from '@antv/f2'
import echarts from 'echarts'
import { inject, observer } from 'mobx-react'

import moduleScss from './Home.module.scss'
import {RecentNum} from '../../components'



export default
@inject('homeStore')
@observer
class Home extends Component {

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
  }

  componentDidMount() {

    this.props.homeStore.loadTodayData()
    this.props.homeStore.loadRecentData()
    this.props.homeStore.loadTodayNotice()

    const data = [{
      time: '2016-08-08 00:00:00',
      tem: 10
    }, {
      time: '2016-08-08 00:10:00',
      tem: 22
    }, {
      time: '2016-08-08 00:30:00',
      tem: 20
    }, {
      time: '2016-08-09 00:35:00',
      tem: 26
    }, {
      time: '2016-08-09 01:00:00',
      tem: 20
    }, {
      time: '2016-08-09 01:20:00',
      tem: 26
    }, {
      time: '2016-08-10 01:40:00',
      tem: 28
    }, {
      time: '2016-08-10 02:00:00',
      tem: 20
    }, {
      time: '2016-08-10 02:20:00',
      tem: 18
    }];

    const chart = new F2.Chart({
      id: 'myChart',
      pixelRatio: window.devicePixelRatio
    });

    const defs = {
      time: {
        type: 'timeCat',
        mask: 'MM/DD',
        tickCount: 3,
        range: [ 0, 1 ]
      },
      tem: {
        tickCount: 5,
        min: 0,
        alias: '日均温度'
      }
    };
    chart.source(data, defs);
    chart.axis('time', {
      label: function label(text, index, total) {
        const textCfg = {};
        if (index === 0) {
          textCfg.textAlign = 'left';
        } else if (index === total - 1) {
          textCfg.textAlign = 'right';
        }
        return textCfg;
      }
    });
    chart.tooltip({
      showCrosshairs: true
    });
    chart.line().position('time*tem').shape('smooth');
    chart.point().position('time*tem').shape('smooth')
      .style({
        stroke: '#fff',
        lineWidth: 1
      });
    chart.render();

    var myChart = echarts.init(document.getElementById('echarts'));

    // 指定图表的配置项和数据
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

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);


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

          {/* 中国疫情地图 */}
          <div className={moduleScss.chinaMapWrap}>
            <Map
              zooms={[2, 4]}
              zoom={2}
              center={[116.397428, 39.90923]}
              isHotspot={false}
              viewMode={'2D'}
            >
            </Map>
          </div>

          <canvas id={'myChart'} width={300} height={400}>
          </canvas>

          <div id={'echarts'} style={{height:'400px'}}>

          </div>

        </div>
      </div>
    )
  }
}