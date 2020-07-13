import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';

import {MyTable, MyTableHeader, RecentNum, EchartWrap, AreaNewsItem} from '../../components';
import { useStores } from "../../hocks"

import moduleScss from './Province.module.scss';
import homeModuleScss from '../home/Home.module.scss';

let provinceMap, areaTableHeaderOffsetTop;

const Province = observer((props) => {

  const { provinceStore, homeStore } = useStores();

  useEffect(()=>{
    provinceStore.setProvince(props.match.params.id);
    provinceStore.updateProvinceDailyList();
    provinceStore.requestNews(10);
    homeStore.updateAreaList();

  },[props.match.params.id])

  const [showFixedTable, setShowFixedTable] = useState(false);
  useEffect(()=>{
    areaTableHeaderOffsetTop = document.getElementById('areaTableHeader').offsetTop - 0.11733*(window.innerWidth)
  })
  useEffect(()=>{
    window.onscroll = ()=>{
      let domScrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      if (domScrollTop > areaTableHeaderOffsetTop && !showFixedTable) {
        setShowFixedTable(true)
      } else if (domScrollTop < areaTableHeaderOffsetTop && showFixedTable) {
        setShowFixedTable(false)
      }
    }
    return function cleanup() {
      window.onscroll = null;
    }
  },[showFixedTable])

  return (
    <div>
      {_renderHeader()}
      {_renderTopData()}
      {/*{_renderProvinceMap()}*/}
      {_renderLinks()}
      {_renderTrendCharts()}
      {_renderAreaList()}
      {_renderNews()}
    </div>
  )

  function _renderHeader() {
    return (
      <div className={`${homeModuleScss.head} ${moduleScss.provinceHeader}`}>
        <p className={homeModuleScss.logo} />
        <div className={moduleScss.titles}>
          <p className={moduleScss.coronavirusName}/>
          <p className={moduleScss.realTime}>
            <span>{provinceStore.province}</span>
          </p>
        </div>
        <p className={`${homeModuleScss.qs} ${moduleScss.qs}`}>
          <span>数据来源：国家及各地卫健委每日信息发布</span>
        </p>
        <div className={moduleScss.provinceBtn}>
          <div className={moduleScss.provinceBtnRelative}>
            切换省市
          </div>
        </div>
      </div>
    )
  }

  function _renderTopData() {
    return (
      <div className={moduleScss.topDataWrap}>
        <div className={moduleScss.timeNum}>
          <p>
            统计截至
            <span> 2020-06-17 09:14:04</span>
          </p>
          <div className={moduleScss.b_share}>
            分享数据
          </div>
        </div>
        {/* recentNum */}
        <div className={moduleScss.recentNumWrap}>
          <div className={moduleScss.recentNum}>
            <RecentNum
              total={provinceStore.todayDate.nowConfirm}
              color={'#f23a3b'}
              change={provinceStore.todayDate.newAdd}
              backgroundColor={'#fff0f1'}
              description={'现有确诊'}/>
          </div>
          <div className={moduleScss.recentNum}>
            <RecentNum
              total={provinceStore.todayDate.confirm}
              color={'#f23a3b'}
              change={provinceStore.todayDate.newConfirm}
              backgroundColor={'#fff0f1'}
              description={'累计确诊'}/>
          </div>
          <div className={moduleScss.recentNum}>
            <RecentNum
              total={provinceStore.todayDate.heal}
              color={'#178b50'}
              change={provinceStore.todayDate.newHeal}
              backgroundColor={'#f8f0f4'}
              description={'累计治愈'}/>
          </div>
          <div className={moduleScss.recentNum}>
            <RecentNum
              total={provinceStore.todayDate.dead}
              color={'#4e5a65'}
              change={provinceStore.todayDate.newDead}
              backgroundColor={'#f2f6f7'}
              description={'累计死亡'}/>
          </div>
        </div>
      </div>
    )
  }
  
  function _renderProvinceMap() {
    return (
      <div className={homeModuleScss.chinaMapWrap}>
        <div id={'provinceMap'} className={homeModuleScss.chinaMap} />
      </div>
    )
  }
  
  function _renderLinks() {
    return(
      <div className={homeModuleScss.enterWrap}>
        <a href='#' className={homeModuleScss.first}>
          <span className={homeModuleScss.firstIcon}>患病轨迹</span>
        </a>
        <a href='#' className={homeModuleScss.mid}>
          <span className={homeModuleScss.midIcon}>出行管控</span>
        </a>
        <a href='#'>
          <span className={homeModuleScss.lastIcon}>核酸检测</span>
        </a>
      </div>
    )
  }
  
  function _renderTrendCharts() {
    return(
      <>
        <div className={moduleScss.chartWrap}>
          <EchartWrap option={provinceStore.confirmAddOption} title={'北京疫情新增趋势'}/>
        </div>
        <div className={moduleScss.chartWrap}>
          <EchartWrap option={provinceStore.confirmOption} title={'北京疫情累计趋势'}/>
        </div>
      </>
    )
  }

  function _renderAreaList() {
    return (
      <div className={homeModuleScss.listWrap}>
        <div>
          <p className={moduleScss.title}>{`${provinceStore.province}疫情`}</p>
          <p className={moduleScss.description}>7:00-10:00为更新高峰，数据如有滞后请谅解</p>
        </div>
        <div className={`${homeModuleScss.fixedTableHeader} ${showFixedTable ? undefined : homeModuleScss.hiddenHeader}`}>
          {_renderTableHeader()}
        </div>
        <div id={'areaTableHeader'}>
          {_renderTableHeader()}
        </div>
        <MyTable headerContents={[]} childrenContents={homeStore.areaList} showChildren={true}/>
      </div>
    )
  }

  function _renderTableHeader() {
    return(
      <MyTableHeader
        titles={[
          {content: '地区', style: {color: '#222', background: '#f2f5f7', width: homeStore.provinceTableLayOut.item0.width}},
          {content: '新增确诊', style: {color: '#005dff', background: '#e8effc', width: homeStore.provinceTableLayOut.item1.width}},
          {content: '累计确诊', style: {color: '#f55253', background: '#fdeeee', width: homeStore.provinceTableLayOut.item2.width}},
          {content: '治愈', style: {color: '#178b50', background: '#e9f7ec', width: homeStore.provinceTableLayOut.item3.width}},
          {content: '死亡', style: {color: '#222', background: '#f2f5f7', width: homeStore.provinceTableLayOut.item4.width}},
        ]}/>
    )
  }

  function _renderNews() {
    return(
      <div className={moduleScss.newsWrap}>
        <div>
          <span className={moduleScss.areaTitle}>{`${provinceStore.province}疫情`}</span>
          <ul>
            {provinceStore.news.map((item, index)=>{
              return <AreaNewsItem key={index} {...item} />
            })}
          </ul>
        </div>
      </div>
    )
  }


})

export default Province;