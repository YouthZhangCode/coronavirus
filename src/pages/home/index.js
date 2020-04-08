/**
 * @Summary: short description for the file
 * @Date: 2020/3/10 4:50 PM
 * @Author: Youth
 */
import React, {Component} from 'react'
import echarts from 'echarts'
import { inject, observer } from 'mobx-react'
import '../../../node_modules/echarts/map/js/china'

import {EchartWrap, CarouselWrap, MyTableHeader, MyTable} from '../../components'
import moduleScss from './Home.module.scss'
import {RecentNum} from '../../components'
import * as EchartsOptions from '../../common/EchartsOptions'

export default
@inject('homeStore', 'foreignStore')
@observer
class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      chinaMapBtnSelectedIndex: 0,
      isTableHeaderFixed: false,
    }
  }

  componentDidUpdate() {
    this.tableHeaderOffsetTop = document.getElementById('tableHeaderWrap').offsetTop - 0.11733*(window.innerWidth)
  }

  componentWillUnmount() {
    window.onscroll = null;
  }

  componentDidMount() {

    window.onscroll = ()=> {
      let domScrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      if (domScrollTop > this.tableHeaderOffsetTop && !this.state.isTableHeaderFixed) {
        this.setState({
          isTableHeaderFixed: true
        })
      } else if (domScrollTop < this.tableHeaderOffsetTop && this.state.isTableHeaderFixed) {
        this.setState({
          isTableHeaderFixed: false
        })
      }
    }

    this.props.homeStore.loadRecentData()
    this.props.homeStore.loadTodayNotice()
    this.props.foreignStore.loadForeignData()
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
      <div>
        <div>

          {/*PageTab*/}
          <div className={`${moduleScss.pageTab} ${moduleScss.leftSelected}`}>
            <p className={moduleScss.pageTabCurrent}>国内疫情</p>
            <p onClick={()=>{this.props.history.push('./foreign')}}>海外疫情</p>
          </div>

          {/*天幕*/}
          <div className={moduleScss.marqueeWarp}>
            <div className={moduleScss.marquee}>
              <div className={moduleScss.marqueeTab}>
                <a href='#'>{this.props.homeStore.todayNotice.length > 0 && this.props.homeStore.todayNotice[0]['showNotice']}</a>
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
            <a href='#' className={moduleScss.first}>
              <span className={moduleScss.firstIcon}>今日关注</span>
            </a>
            <a href='#' className={moduleScss.mid}>
              <span className={moduleScss.midIcon}>出入境查询</span>
            </a>
            <a href='#'>
              <span className={moduleScss.lastIcon}>口罩售卖</span>
            </a>
          </div>

          {/* 中国疫情地图 */}
          <div className={moduleScss.chinaMapWrap}>
            <div id={'chinaMap'} className={moduleScss.chinaMap}>
            </div>
            <div className={moduleScss.chinaMapBtns}>
              <span onClick={()=>{this.chinaMapBtnClicked(0)}} className={`${moduleScss.segmentBtn} ${this.state.chinaMapBtnSelectedIndex === 0 ? moduleScss.chinaMapBtnSelected : undefined}`}>现有确诊</span>
              <span onClick={()=>{this.chinaMapBtnClicked(1)}} className={`${moduleScss.segmentBtn} ${this.state.chinaMapBtnSelectedIndex === 1 ? moduleScss.chinaMapBtnSelected : undefined}`}>累计确诊</span>
            </div>
          </div>

          {/* 国内疫情趋势 echarts */}
          <CarouselWrap dotNames={['境外输入\n省市TOP10','境外输入\n新增趋势','境外输入\n累计趋势']}>
            <EchartWrap title={'境外输入省市TOP10'} option={this.props.foreignStore.importedTop10Option}/>
            <EchartWrap title={'境外输入新增趋势'} option={this.props.homeStore.importedAddOption}/>
            <EchartWrap title={'境外输入累计趋势'} option={this.props.homeStore.importedTotalOption}/>
          </CarouselWrap>

          <CarouselWrap dotNames={["全国疫情\n新增趋势", '全国确诊\n疑似/重症', '全国累计\n治愈/死亡', '治愈率\n病死率']}>
            <EchartWrap title={'全国疫情新增趋势'} option={this.props.homeStore.chinaAddConfirmSuspectOption}/>
            <EchartWrap title={'全国确诊/疑似/重症趋势'} option={this.props.homeStore.chinaConfirmSuspectImportedOption}/>
            <EchartWrap title={'全国累计治愈/死亡趋势'} option={this.props.homeStore.chinaHealDeadOption}/>
            <EchartWrap title={'全国治愈率病/死率趋势'} option={this.props.homeStore.chinaHealDeadRateOption}/>
          </CarouselWrap>

          {/* 国内疫情列表 */}
          <div className={moduleScss.listWrap}>
            <div className={`${moduleScss.fixedTableHeader} ${this.state.isTableHeaderFixed ? undefined : moduleScss.hiddenHeader}`}>
              <MyTableHeader
                titles={[
                  {content:'地区', style:{width: this.props.homeStore.areaTableLayOut.item0}},
                  {content:'现有确诊', style:{color:'#ff5d00', background:'#fcf2e8', width: this.props.homeStore.areaTableLayOut.item1}},
                  {content:'累计确诊', style:{color:'#ff5253', background:'#fdeeee', width: this.props.homeStore.areaTableLayOut.item2}},
                  {content:'治愈', style:{color:'#178b50', background:'#e7fce7', width: this.props.homeStore.areaTableLayOut.item3}},
                  {content:'死亡', style:{color:'#4e5a65', background:'#f3f6f8', width: this.props.homeStore.areaTableLayOut.item4}},
                  {content:'疫情' }
                ]}
              />
            </div>
            <div id='tableHeaderWrap'>
              <MyTableHeader
                titles={[
                  {content:'地区', style:{width: this.props.homeStore.areaTableLayOut.item0}},
                  {content:'现有确诊', style:{color:'#ff5d00', background:'#fcf2e8', width: this.props.homeStore.areaTableLayOut.item1}},
                  {content:'累计确诊', style:{color:'#ff5253', background:'#fdeeee', width: this.props.homeStore.areaTableLayOut.item2}},
                  {content:'治愈', style:{color:'#178b50', background:'#e7fce7', width: this.props.homeStore.areaTableLayOut.item3}},
                  {content:'死亡', style:{color:'#4e5a65', background:'#f3f6f8', width: this.props.homeStore.areaTableLayOut.item4}},
                  {content:'疫情' }
                ]}
              />
            </div>
            {
              this.props.homeStore.chinaTree.map((item, index) =>
                <MyTable key={index} headerContents={item.headerContents} childrenContents={item.childrenContents}/>
              )
            }
          </div>

          <div style={{height: '400px', backgroundColor: "#f5f5f5"}}>

          </div>

        </div>
      </div>
    )
  }

}