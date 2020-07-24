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

          <a href='https://github.com/YouthZhangCode/coronavirus' target="_blank" className={moduleScss.fixedShareBtn}>
            <svg t="1594632748422" className="icon" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg" p-id="1126" data-spm-anchor-id="a313x.7781069.0.i0" width="8vw"
                 height="8vw">
              <path
                d="M960 512a435.2 435.2 0 0 1-85.76 263.36 440 440 0 0 1-220.48 161.92 26.88 26.88 0 0 1-23.04-4.16 22.72 22.72 0 0 1-7.04-17.6v-122.88a104.64 104.64 0 0 0-30.4-82.88 416 416 0 0 0 59.52-10.24 218.24 218.24 0 0 0 54.72-23.04 164.8 164.8 0 0 0 47.04-38.4 184 184 0 0 0 32-61.44 293.76 293.76 0 0 0 12.16-88 168.64 168.64 0 0 0-46.4-120 154.88 154.88 0 0 0-4.48-119.04 76.48 76.48 0 0 0-47.04 6.4 300.48 300.48 0 0 0-53.76 25.6l-22.08 13.76a416 416 0 0 0-224 0c-6.4-4.48-14.4-9.28-24.64-15.68A326.08 326.08 0 0 0 326.4 256a82.88 82.88 0 0 0-50.24-8 156.8 156.8 0 0 0-4.16 120 173.76 173.76 0 0 0-46.08 120.64A288 288 0 0 0 238.08 576a196.48 196.48 0 0 0 32 61.44 152 152 0 0 0 47.04 39.04 267.84 267.84 0 0 0 54.72 23.04 414.08 414.08 0 0 0 59.84 10.24 92.48 92.48 0 0 0-28.8 60.16 99.2 99.2 0 0 1-26.56 8.32 167.36 167.36 0 0 1-32 2.88A69.12 69.12 0 0 1 303.36 768a109.44 109.44 0 0 1-32-36.48 96 96 0 0 0-28.16-30.4 80.64 80.64 0 0 0-28.8-14.08h-11.52a41.6 41.6 0 0 0-16.96 2.56q-4.8 2.88-2.88 6.72a44.16 44.16 0 0 0 5.44 8 55.36 55.36 0 0 0 7.68 7.36l4.16 2.56a78.08 78.08 0 0 1 25.6 22.08 157.76 157.76 0 0 1 18.24 29.44l5.76 13.44a72.32 72.32 0 0 0 25.6 36.16 96 96 0 0 0 38.72 16.64 196.16 196.16 0 0 0 40.32 4.16 182.08 182.08 0 0 0 32-2.24l13.44-2.24v83.84a23.04 23.04 0 0 1-7.68 17.6 27.84 27.84 0 0 1-23.36 4.16 438.08 438.08 0 0 1-219.2-162.88A427.84 427.84 0 0 1 64 512a437.44 437.44 0 0 1 60.16-224A443.52 443.52 0 0 1 288 124.16 437.44 437.44 0 0 1 512 64a437.44 437.44 0 0 1 224 60.16A443.52 443.52 0 0 1 899.84 288 436.8 436.8 0 0 1 960 512z"
                p-id="1127" fill="#ffffff" />
            </svg>
            <span>欢迎点赞、分享</span>
          </a>

        </div>
      </div>
    )
  }

})

export default Home;