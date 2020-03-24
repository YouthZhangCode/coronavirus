/**
 * @Summary: short description for the file
 * @Date: 2020/3/10 4:50 PM
 * @Author: Youth
 */
import React, {Component} from 'react'
import echarts from 'echarts'
import { inject, observer } from 'mobx-react'
import '../../../node_modules/echarts/map/js/china'
import { Carousel } from 'antd'

import {EchartWrap} from '../../components'
import moduleScss from './Home.module.scss'
import {RecentNum} from '../../components'
import * as EchartsOptions from '../../common/EchartsOptions'

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

    this.props.homeStore.loadRecentData()
    this.props.homeStore.loadTodayNotice()
    this.props.homeStore.loadTodayData()
      .then(res => {
        this.chinaMap.setOption({
          series: [
            {
              data: this.props.homeStore.chinaMapNowData
            }
          ],
        })
      })

    // 国内疫情地图
    this.chinaMap = echarts.init(document.getElementById('chinaMap'));
    this.chinaMap.setOption(EchartsOptions.chinaMapOption)

  }

  chinaMapBtnClicked(index) {
    this.setState({
      chinaMapBtnSelectedIndex: index
    })

    this.chinaMap.setOption({
      series: [
        {
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

          <EchartWrap option={this.props.homeStore.chinaAddConfirmSuspectOption}/>

          <Carousel className={moduleScss["ant-carousel"]}>
            <div className={moduleScss["slick-slide"]}>
              <h3>1</h3>
            </div>
            <div className={moduleScss["slick-slide"]}>
              <h3>2</h3>
            </div>
            <div className={moduleScss["slick-slide"]}>
              <h3>3</h3>
            </div>
            <div className={moduleScss["slick-slide"]}>
              <h3>4</h3>
            </div>
          </Carousel>
          <div style={{height: '400px', backgroundColor: "red"}}>

          </div>

        </div>
      </div>
    )
  }

}