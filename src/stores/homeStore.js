/**
 * @Summary: short description for the file
 * @Date: 2020/3/19 2:36 PM
 * @Author: Youth
 */
import { observable, action } from 'mobx'
import agent from '../agent'

export class HomeStore {

  @observable lastUpdateTime = "";
  @observable chinaTotal = {};
  @observable chinaAdd = {};
  @observable isShowAdd = false;
  @observable showAddSwitch = {}
  @observable areaTree = []

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

  @action loadTodayData() {
    agent.Home.todayData()
      .then(res => {
        let resObj = JSON.parse(res.text)
        if (resObj.ret === 0) {
          console.log('today data ----- \n', JSON.parse(resObj.data))
          return JSON.parse(resObj.data)
        } else {
          // throw
        }
      })
      .then(action(({
        lastUpdateTime,
        chinaTotal,
        chinaAdd,
        isShowAdd,
        showAddSwitch,
        areaTree,
        }) => {

        this.lastUpdateTime = lastUpdateTime;
        this.chinaTotal = chinaTotal;
        this.chinaAdd = chinaAdd;
        this.isShowAdd = isShowAdd;
        this.showAddSwitch = showAddSwitch;
        this.areaTree = areaTree;
      }))
      .catch(e => {

      })
  }

  @action loadRecentData() {
    agent.Home.recentData()
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