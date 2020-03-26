/**
 * @Summary: short description for the file
 * @Date: 2020/3/19 2:36 PM
 * @Author: Youth
 */
import { observable, action } from 'mobx'

import agent from '../agent'
import * as EchartsOptions from '../common/EchartsOptions'

export class HomeStore {

  @observable lastUpdateTime = "";
  @observable chinaTotal = {};
  @observable chinaAdd = {};
  @observable isShowAdd = false;
  @observable showAddSwitch = {}
  @observable areaTree = []
  @observable chinaMapNowData = []
  @observable chinaMapTotalData = []

  @observable chinaDayList = []
  @observable chinaDayAddList = []
  @observable dailyNewAddHistory = []
  @observable dailyHistory = []
  @observable wuhanDayList = []
  @observable articleList = []
  @observable provinceCompare = []
  @observable foreignList = []
  @observable globalStatis = []
  @observable globalDailyHistory = []
  @observable cityStatis = {}

  @observable todayNotice = []

  @observable chinaAddConfirmSuspectOption = EchartsOptions.chinaAddConfirmSuspect
  @observable chinaConfirmSuspectImportedOption = EchartsOptions.chinaConfirmSuspectImported
  @observable chinaHealDeadOption = EchartsOptions.chinaHealDead;
  @observable chinaHealDeadRateOption = EchartsOptions.chinaHealDeadRate;

  @action loadTodayData() {
    return agent.Home.todayData()
            .then(res => {
              let resObj = JSON.parse(res.text)
              if (resObj.ret === 0) {
                console.log('today data ----- \n', JSON.parse(resObj.data))
                return JSON.parse(resObj.data)
              } else {
                // throw
              }
            })
            .then(action((data) => {
              let {
                lastUpdateTime,
                chinaTotal,
                chinaAdd,
                isShowAdd,
                showAddSwitch,
                areaTree,
              } = data
              this.lastUpdateTime = lastUpdateTime;
              this.chinaTotal = chinaTotal;
              this.chinaAdd = chinaAdd;
              this.isShowAdd = isShowAdd;
              this.showAddSwitch = showAddSwitch;
              this.areaTree = areaTree;
              this.chinaMapNowData = areaTree[0] && areaTree[0].children.map(item => {
                return {...item, value: item.total.confirm - item.total.dead - item.total.heal}
              })
              this.chinaMapTotalData = areaTree[0] && areaTree[0].children.map(item => {
                return {...item, value: item.total.confirm}
              })
              return data
            }))
            .catch(e => {

            })
  }

  @action loadRecentData() {
    return agent.Home.recentData()
      .then(res => {
        if (res.ok || res.status === 2000 || res.statesText === "OK") {
          return JSON.parse(res.text)
        }
      })
      .then(json => {
        if (json.ret === 0) {
          console.log('recent data ---- \n', JSON.parse(json.data))
          return JSON.parse(json.data)
        }
      })
      .then(action(({
                      chinaDayList,
                      chinaDayAddList,
                      dailyNewAddHistory,
                      dailyHistory,
                      wuhanDayList,
                      articleList,
                      provinceCompare,
                      foreignList,
                      globalStatis,
                      globalDailyHistory,
                      cityStatis
                    }) => {
            this.chinaDayList = chinaDayList;
            this.chinaDayAddList = chinaDayAddList;
            this.dailyNewAddHistory = dailyNewAddHistory;
            this.dailyHistory = dailyHistory;
            this.wuhanDayList = wuhanDayList;
            this.articleList = articleList;
            this.provinceCompare = provinceCompare;
            this.foreignList = foreignList;
            this.globalStatis = globalStatis;
            this.globalDailyHistory = globalDailyHistory;
            this.cityStatis = cityStatis;

            this.chinaAddConfirmSuspectOption = {
              xAxis: {
                data: this.chinaDayAddList.map(item => item.date)
              },
              series: [{
                data: this.chinaDayAddList.map(item => item.confirm),
              },{
                data: this.chinaDayAddList.map(item => item.suspect),
              }]
            };
            this.chinaConfirmSuspectImportedOption = {
              xAxis: {
                data: this.chinaDayList.map(item => item.date)
              },
              series: [{
                data: this.chinaDayList.map(item => item.confirm)
              },{
                data: this.chinaDayList.map(item => item.nowConfirm)
              },{
                data: this.chinaDayList.map(item => item.suspect)
              },{
                data: this.chinaDayList.map(item => item.nowSevere)
              }]
            };
            this.chinaHealDeadOption = {
              xAxis: {
                data: this.chinaDayList.map(item => item.date)
              },
              series: [{
                data: this.chinaDayList.map(item => item.heal)
              },{
                data: this.chinaDayList.map(item => item.dead)
              }]
            };
            this.chinaHealDeadRateOption = {
              xAxis: {
                data: this.chinaDayList.map(item => item.date)
              },
              series: [{
                data: this.chinaDayList.map(item => item.healRate)
              },{
                data: this.chinaDayList.map(item => item.deadRate)
              }]
            }
      }))
  }

  @action loadTodayNotice() {
    agent.Home.todayNotice()
      .then(res => {
        let resObj = JSON.parse(res.text)
        if (resObj.ret === 0) {
          console.log('today notice ----- \n', JSON.parse(resObj.data))
          return JSON.parse(resObj.data)
        } else {
          // throw
        }
      })
      .then(action(data => {
        this.todayNotice = data
      }))
  }
}

export default new HomeStore();