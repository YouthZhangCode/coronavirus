/**
 * @Summary: short description for the file
 * @Date: 2020/3/10 4:50 PM
 * @Author: Youth
 */
import React, { Component, useEffect, useState } from 'react'
import echarts from 'echarts'
import { inject, observer } from 'mobx-react'
import '../../../node_modules/echarts/map/js/china'

import { useStores } from "../../hocks"
import {EchartWrap, CarouselWrap, MyTableHeader, MyTable} from '../../components'
import moduleScss from './Home.module.scss'
import {RecentNum} from '../../components'
import * as EchartsOptions from '../../common/EchartsOptions'

let chinaMap, tableHeaderOffsetTop;

const Home = observer((props) => {

  const { homeStore, foreignStore } = useStores();

  global.__chinaMapToolTipClicked = (province)=>{
    props.history.push(`./province/${province}`)
  }

  useEffect(()=>{
    // 国内疫情地图
    chinaMap = echarts.init(document.getElementById('chinaMap'));
    chinaMap.setOption(EchartsOptions.chinaMapOption)

  },[])

  useEffect(()=>{
    tableHeaderOffsetTop = document.getElementById('tableHeaderWrap').offsetTop - 0.11733*(window.innerWidth)
  })

  const [chinaMapBtnSelectedIndex, setChinaMapBtnSelectedIndex] = useState(0);
  const [isTableHeaderFixed, setIsTableHeaderFixed] = useState(false);
  useEffect(()=>{
    window.onscroll = ()=> {
      let domScrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      if (domScrollTop > tableHeaderOffsetTop && !isTableHeaderFixed) {
        setIsTableHeaderFixed(true)
      } else if (domScrollTop < tableHeaderOffsetTop && isTableHeaderFixed) {
        setIsTableHeaderFixed(false);
      }
    }
    return function cleanup() {
      window.onscroll = null;
    }
  },[isTableHeaderFixed])


  function chinaMapBtnClicked(index) {
    setChinaMapBtnSelectedIndex(index);

    chinaMap.setOption({
      series: [
        {
          data: index === 0 ? homeStore.chinaMapNowData : homeStore.chinaMapTotalData
        }
      ],
    })
  }

  console.log('isTableHeaderFixed  ', isTableHeaderFixed)


  return (
    <div className={moduleScss.wrapper}>
      {_renderHeader()}
      {_renderTabChina()}
    </div>
  )


  function _renderHeader() {
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

  function _renderTabChina() {
    return (
      <div>
        <div>

          {/*PageTab*/}
          <div className={`${moduleScss.pageTab} ${moduleScss.leftSelected}`}>
            <p className={moduleScss.pageTabCurrent}>国内疫情</p>
            <p onClick={()=>{props.history.push('./foreign')}}>海外疫情</p>
          </div>

          {/*天幕*/}
          <div className={moduleScss.marqueeWarp}>
            <div className={moduleScss.marquee}>
              <div className={moduleScss.marqueeTab}>
                <a href='sandbaobrowse://sandbao/qrcode'>{homeStore.todayNotice.length > 0 && homeStore.todayNotice[0]['showNotice']}</a>
              </div>
            </div>
          </div>

          {/*时效*/}
          <div className={moduleScss.timeNum}>
            <p>
              统计截至
              <span>{` ${homeStore.lastUpdateTime} `}</span>
               更新于
              <span>39分钟</span>
              前
            </p>
          </div>

          {/*最新数据*/}
          <div className={moduleScss.recentNumWrap}>
            <div className={`${moduleScss.recentNumContent} ${moduleScss.topLeftRadius}`}>
              <RecentNum change={homeStore.chinaAdd.confirm} total={homeStore.chinaTotal.confirm} description={'累计确诊'} backgroundColor={'#fdf1f1'} color={'#cc1e1e'}/>
            </div>
            <div className={moduleScss.recentNumContent}>
              <RecentNum change={homeStore.chinaAdd.heal} total={homeStore.chinaTotal.heal} description={'累计治愈'} backgroundColor={'#f1f8f4'} color={'#178b50'}/>
            </div>
            <div className={`${moduleScss.recentNumContent} ${moduleScss.topRightRadius}`} >
              <RecentNum change={homeStore.chinaAdd.dead} total={homeStore.chinaTotal.dead} description={'累计死亡'} backgroundColor={'#f3f6f8'} color={'#4e5a65'}/>
            </div>
            <div className={`${moduleScss.recentNumContent} ${moduleScss.bottomLeftRadius}`}>
              <RecentNum change={homeStore.chinaAdd.nowConfirm} total={homeStore.chinaTotal.nowConfirm} description={'现有确诊'} backgroundColor={'#fdf1f1'} color={'#f23a3b'}/>
            </div>
            <div className={moduleScss.recentNumContent}>
              <RecentNum change={homeStore.chinaAdd.suspect} total={homeStore.chinaTotal.suspect} description={'现有疑似'} backgroundColor={'#faf2f6'} color={'#ca3f81'}/>
            </div>
            <div className={`${moduleScss.recentNumContent} ${moduleScss.bottomRightRadius}`}>
              <RecentNum change={homeStore.chinaAdd.nowSevere} total={homeStore.chinaTotal.nowSevere} description={'现有重症'} backgroundColor={'#fcf4f0'} color={'#f05926'}/>
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
              <span onClick={()=>{chinaMapBtnClicked(0)}} className={`${moduleScss.segmentBtn} ${chinaMapBtnSelectedIndex === 0 ? moduleScss.chinaMapBtnSelected : undefined}`}>现有确诊</span>
              <span onClick={()=>{chinaMapBtnClicked(1)}} className={`${moduleScss.segmentBtn} ${chinaMapBtnSelectedIndex === 1 ? moduleScss.chinaMapBtnSelected : undefined}`}>累计确诊</span>
            </div>
          </div>

          {/* 国内疫情趋势 echarts */}
          <CarouselWrap dotNames={['境外输入\n省市TOP10','境外输入\n新增趋势','境外输入\n累计趋势']}>
            <EchartWrap title={'境外输入省市TOP10'} option={foreignStore.importedTop10Option}/>
            <EchartWrap title={'境外输入新增趋势'} option={homeStore.importedAddOption}/>
            <EchartWrap title={'境外输入累计趋势'} option={homeStore.importedTotalOption}/>
          </CarouselWrap>

          <CarouselWrap dotNames={["全国疫情\n新增趋势", '全国确诊\n疑似/重症', '全国累计\n治愈/死亡', '治愈率\n病死率']}>
            <EchartWrap title={'全国疫情新增趋势'} option={homeStore.chinaAddConfirmSuspectOption}/>
            <EchartWrap title={'全国确诊/疑似/重症趋势'} option={homeStore.chinaConfirmSuspectImportedOption}/>
            <EchartWrap title={'全国累计治愈/死亡趋势'} option={homeStore.chinaHealDeadOption}/>
            <EchartWrap title={'全国治愈率病/死率趋势'} option={homeStore.chinaHealDeadRateOption}/>
          </CarouselWrap>

          {/* 国内疫情列表 */}
          <div className={moduleScss.listWrap}>
            <div className={`${moduleScss.fixedTableHeader} ${isTableHeaderFixed ? undefined : moduleScss.hiddenHeader}`}>
              <MyTableHeader
                titles={[
                  {content:'地区', style:{width: homeStore.areaTableLayOut.item0}},
                  {content:'现有确诊', style:{color:'#ff5d00', background:'#fcf2e8', width: homeStore.areaTableLayOut.item1}},
                  {content:'累计确诊', style:{color:'#ff5253', background:'#fdeeee', width: homeStore.areaTableLayOut.item2}},
                  {content:'治愈', style:{color:'#178b50', background:'#e7fce7', width: homeStore.areaTableLayOut.item3}},
                  {content:'死亡', style:{color:'#4e5a65', background:'#f3f6f8', width: homeStore.areaTableLayOut.item4}},
                  {content:'疫情' }
                ]}
              />
            </div>
            <div id='tableHeaderWrap'>
              <MyTableHeader
                titles={[
                  {content:'地区', style:{width: homeStore.areaTableLayOut.item0}},
                  {content:'现有确诊', style:{color:'#ff5d00', background:'#fcf2e8', width: homeStore.areaTableLayOut.item1}},
                  {content:'累计确诊', style:{color:'#ff5253', background:'#fdeeee', width: homeStore.areaTableLayOut.item2}},
                  {content:'治愈', style:{color:'#178b50', background:'#e7fce7', width: homeStore.areaTableLayOut.item3}},
                  {content:'死亡', style:{color:'#4e5a65', background:'#f3f6f8', width: homeStore.areaTableLayOut.item4}},
                  {content:'疫情' }
                ]}
              />
            </div>
            {
              homeStore.chinaTree.map((item, index) =>
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

})

export default Home;