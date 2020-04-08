/**
 * @Summary: short description for the file
 * @Date: 2020/3/30 1:09 PM
 * @Author: Youth
 */
import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';

import {RecentNum, EchartWrap, CarouselWrap, MyTableHeader, MyTable} from '../../components'
import moduleScss from './Foreign.module.scss';
import homeModuleScss from '../home/Home.module.scss';

const tableHeaderStyle = {
  item0: {width: '22.4vw',},
  item1: {width: '14.2vw', background:'#e8effc', color:'#005dff'},
  item2: {width: '16vw', background:'#fdeeee', color:'#f55253'},
  item3: {width: '13vw', background:'#e9f7ec', color:'#178b50'},
  item4: {width: '11.2vw', background:'#f3f6f8', color:'#4e5a65'},
}

export default
@inject('homeStore', 'foreignStore')
@observer
class Foreign extends Component {

  constructor(props) {
    super(props)
    this.state = {
      hideFixedHeader: true,
      foreignStatisIndex: 1,
    }
  }

  componentDidMount() {
    this.props.foreignStore.loadForeignCountriesData()
    this.props.foreignStore.loadEuropeCountriesData();
    this.props.foreignStore.loadAsiaCountriesData();
    this.props.foreignStore.loadNorthAmericaCountriesData();
    this.props.foreignStore.loadAutoWeekContinentMillionData();
    this.props.foreignStore.loadAutoContinentGlobalDailyListCountryConfirmAdd();
    this.props.foreignStore.loadCountryRankListData();

    window.onscroll = () => {
      let domScrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      if (domScrollTop > this.tableHeaderOffsetTop && this.state.hideFixedHeader) {
        this.setState({
          hideFixedHeader: false
        })
      } else if (domScrollTop < this.tableHeaderOffsetTop && !this.state.hideFixedHeader) {
        this.setState({
          hideFixedHeader: true
        })
      }
    }
  }

  componentDidUpdate() {
    this.tableHeaderOffsetTop = document.getElementById('tableHeader').offsetTop - 0.11733*(window.innerWidth);
  }

  componentWillUnmount() {
    window.onscroll = null;
  }

  render() {
    return(
      <div>
        {this._renderHeader()}
        {this._renderPageTab()}
        {this._renderRecentNum()}
        {this._renderForeignCountriesConfirmChart()}
        {this._renderChinaForeignComparisonCharts()}
        {this._renderCountryRankList()}
        <div style={{height:'200px', backgroundColor:'#999'}}></div>
      </div>
    )
  }

  //复用home中的css
  _renderHeader() {
    return(
      <div className={homeModuleScss.head}>
        <p className={homeModuleScss.logo} />
        <p className={homeModuleScss.title} />
        <p className={homeModuleScss.jump} />
        <p className={homeModuleScss.qs}>
          数据来源：各国(地区)官方通报和权威媒体报道
        </p>
      </div>
    )
  }

  _renderPageTab() {
    return(
      <div className={`${homeModuleScss.pageTab} ${homeModuleScss.rightSelected}`}>
        <p onClick={()=>{this.props.history.push('/')}}>国内疫情</p>
        <p className={homeModuleScss.pageTabCurrent}>海外疫情</p>
      </div>
    )
  }

  _renderRecentNum() {
    return(
      <div>
        <div className={homeModuleScss.timeNum}>
          <p>
            统计截止
            <span>{` ${this.props.homeStore.lastUpdateTime} `}</span>
            更新于
            <span>39分钟</span>
            前
          </p>
        </div>
        <div className={moduleScss.recentNumWrap}>
          <div className={moduleScss.recentNumWrapContent}>
            <RecentNum
              change={this.props.foreignStore.globalStatis.nowConfirmAdd}
              total={this.props.foreignStore.globalStatis.nowConfirm}
              description={'现有确诊'}
              backgroundColor={'#fff0f1'}
              color={'#f23a3b'}/>
          </div>
          <div className={moduleScss.recentNumWrapContent}>
            <RecentNum
              change={this.props.foreignStore.globalStatis.confirmAdd}
              total={this.props.foreignStore.globalStatis.confirm}
              description={'累计确诊'}
              backgroundColor={'#fff0f1'}
              color={'#cc1e1e'}/>
          </div>
          <div className={moduleScss.recentNumWrapContent}>
            <RecentNum
              change={this.props.foreignStore.globalStatis.healAdd}
              total={this.props.foreignStore.globalStatis.heal}
              description={'累计确诊'}
              backgroundColor={'#f0f8f4'}
              color={'#178b50'}/>
          </div>
          <div className={moduleScss.recentNumWrapContent}>
            <RecentNum
              change={this.props.foreignStore.globalStatis.deadAdd}
              total={this.props.foreignStore.globalStatis.dead}
              description={'累计死亡'}
              backgroundColor={'#f2f6f7'}
              color={'#4e5a65'}/>
          </div>
        </div>
        <div className={homeModuleScss.enterWrap}>
          <a href={'#'} className={homeModuleScss.first}>
            <span className={homeModuleScss.hwfk}>海外防控</span>
          </a>
          <a href={'#'} className={homeModuleScss.mid}>
            <span className={homeModuleScss.crjcx}>出入境查询</span>
          </a>
          <a href={'#'} className={homeModuleScss.first}>
            <span className={homeModuleScss.hrjy}>华人记疫</span>
          </a>
        </div>
      </div>
    )
  }

  _renderForeignCountriesConfirmChart() {
    return(
      <div className={moduleScss.foreignCountriesConfirmChartWrap}>
        <EchartWrap height={'60vw'} title={'海外多国累计确诊趋势'} option={this.props.foreignStore.foreignCountriesConfirmOption}/>
      </div>
    )
  }

  _renderChinaForeignComparisonCharts() {
    return(
      <div>
        <CarouselWrap dotNames={['中国/海外\n新增确诊','中国/海外\n确诊趋势','中国/海外\n治愈率','中国/海外\n病死率']}>
          <EchartWrap title={'中国/海外新增确诊对比'} option={this.props.foreignStore.chinaForeignConfirmAddOption}/>
          <EchartWrap title={'中国/海外确诊趋势对比'} option={this.props.foreignStore.chinaForeignConfirmOption}/>
          <EchartWrap title={'中国/海外治愈率对比'} option={this.props.foreignStore.chinaForeignHealRateOption}/>
          <EchartWrap title={'中国/海外病死率对比'} option={this.props.foreignStore.chinaForeignDeadRateOption}/>
        </CarouselWrap>
        <CarouselWrap dotNames={['昨日新增\n确诊TOP10', '欧洲多国\n新增确诊', '亚洲多国\n新增确诊', '北美多国\n新增确诊']}>
          <EchartWrap title={'昨日新增确诊国家TOP10'} showLegend={false} option={this.props.foreignStore.addConfirmTop10Option}/>
          <EchartWrap title={'欧洲多国新增确诊趋势'} option={this.props.foreignStore.europeCountriesAddConfirmOption}/>
          <EchartWrap title={'亚洲多国新增确诊趋势'} option={this.props.foreignStore.asianCountriesAddConfirmOption}/>
          <EchartWrap title={'北美多国新增确诊趋势'} option={this.props.foreignStore.northAmericaCountriesAddConfirmOption}/>
        </CarouselWrap>
        <div className={moduleScss.contentWeekConfirmChartWrap}>
          <EchartWrap title={'海外现有确诊及各洲累计确诊周比'} option={this.props.foreignStore.continentWeekConfirmOption}/>
        </div>
        <CarouselWrap dotNames={['每百万人\n确诊数排行', '累计确诊\n七日增幅排行']}>
          <EchartWrap height={'60vw'} title={'海外主要疫情国家-累计确诊七日增幅'} option={this.props.foreignStore.countryWeakRankOption}/>
          <EchartWrap height={'60vw'} title={'海外主要疫情国家-每百万人确诊数'} option={this.props.foreignStore.millionConfirmRankOption}/>
        </CarouselWrap>
      </div>
    )
  }

  _renderCountryRankList() {
    return(
      <div className={homeModuleScss.listWrap}>
        <div className={moduleScss.foreignStatisWrap}>
          <p className={moduleScss.foreignStatisTitle}>海外疫情</p>
          <div>
            <span
              onClick={()=>{
                this.setState({
                  foreignStatisIndex: 0
                })
              }}
              className={`${homeModuleScss.segmentBtn} ${this.state.foreignStatisIndex === 0 ? homeModuleScss.chinaMapBtnSelected : null}`}>
              按大洲查看
            </span>
            <span
              onClick={()=>{
                this.setState({
                  foreignStatisIndex: 1
                })
              }}
              className={`${homeModuleScss.segmentBtn} ${this.state.foreignStatisIndex === 1 ? homeModuleScss.chinaMapBtnSelected : null}`}>
              按国家查看
            </span>
          </div>
        </div>
        <div className={`${homeModuleScss.fixedTableHeader} ${this.state.hideFixedHeader ? homeModuleScss.hiddenHeader : null}`}>
          <MyTableHeader
            titles={[
              {content:'地区', style: tableHeaderStyle.item0},
              {content:'新增确诊', style: tableHeaderStyle.item1},
              {content:'累计确诊', style: tableHeaderStyle.item2},
              {content:'治愈', style: tableHeaderStyle.item3},
              {content:'死亡', style: tableHeaderStyle.item4},
              {content:'疫情' }
            ]}
          />
        </div>
        <div id='tableHeader'>
          <MyTableHeader
            titles={[
              {content:'地区', style: tableHeaderStyle.item0},
              {content:'新增确诊', style: tableHeaderStyle.item1},
              {content:'累计确诊', style: tableHeaderStyle.item2},
              {content:'治愈', style: tableHeaderStyle.item3},
              {content:'死亡', style: tableHeaderStyle.item4},
              {content:'疫情' }
            ]}
          />

        </div>
        {
          this.state.foreignStatisIndex === 1
          ? <MyTable showChildren={true} headerContents={[]} childrenContents={this.props.foreignStore.countryListData}/>
          : this.props.foreignStore.continentListData.map((continent, index) =>
              <MyTable key={index} headerContents={continent.headerContents} childrenContents={continent.childrenContents}/>
            )
        }
      </div>
    )
  }
}