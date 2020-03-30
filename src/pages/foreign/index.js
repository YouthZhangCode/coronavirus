/**
 * @Summary: short description for the file
 * @Date: 2020/3/30 1:09 PM
 * @Author: Youth
 */
import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';

import {RecentNum} from '../../components'
import moduleScss from './Foreign.module.scss';
import homeModuleScss from '../home/Home.module.scss';

export default
@inject('homeStore', 'foreignStore')
@observer
class Foreign extends Component {

  render() {
    return(
      <div>
        {this._renderHeader()}
        {this._renderPageTab()}
        {this._renderRecentNum()}
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
        <p>国内疫情</p>
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
}