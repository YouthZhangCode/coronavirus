import React, { useEffect, useState } from 'react';
import echarts from 'echarts';
import { observer } from 'mobx-react';

import { RecentNum } from '../../components';
import * as EchartsOptions from '../../common/EchartsOptions';
import { useStores } from "../../hocks"
import agent from '../../agent'

import moduleScss from './Province.module.scss';
import homeModuleScss from '../home/Home.module.scss';


const Province = observer((props) => {

  const { routeStore } = useStores();

  useEffect(()=>{
    routeStore.setSlideIndex(2);
    routeStore.setProvince(props.match.params.id);

    agent.Province.provinceJson('beijing')
      .then(beijingJson => {
        console.log('beijingJson -- ', beijingJson)
        echarts.registerMap('北京', beijingJson);
      })

  },[props.match.params.id])

  console.log('props -- ', props);


  return (
    <div>
      {_renderHeader()}
      {_renderTopData()}
      <div style={{height:'300px', backgroundColor:'#ddd'}}>12</div>
    </div>
  )

  function _renderHeader() {
    return (
      <div className={`${homeModuleScss.head} ${moduleScss.provinceHeader}`}>
        <p className={homeModuleScss.logo} />
        <div className={moduleScss.titles}>
          <p className={moduleScss.coronavirusName}/>
          <p className={moduleScss.realTime}>
            <span>{routeStore.province}</span>
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
              total={0}
              color={'#f23a3b'}
              change={0}
              backgroundColor={'#fff0f1'}
              description={'现有确诊'}/>
          </div>
          <div className={moduleScss.recentNum}>
            <RecentNum
              total={0}
              color={'#f23a3b'}
              change={0}
              backgroundColor={'#fff0f1'}
              description={'累计确诊'}/>
          </div>
          <div className={moduleScss.recentNum}>
            <RecentNum
              total={145}
              color={'#178b50'}
              change={0}
              backgroundColor={'#f8f0f4'}
              description={'累计治愈'}/>
          </div>
          <div className={moduleScss.recentNum}>
            <RecentNum
              total={2}
              color={'#4e5a65'}
              change={0}
              backgroundColor={'#f2f6f7'}
              description={'累计死亡'}/>
          </div>
        </div>
      </div>
    )
  }

})

export default Province;