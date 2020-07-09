/**
 * @Summary: short description for the file
 * @Date: 2020/3/19 2:36 PM
 * @Author: Youth
 */
import { observable, action } from 'mobx'

import agent from '../agent'
import foreignStore from './foreignStore'
import * as EchartsOptions from '../common/EchartsOptions'
import provinceStore from "./provinceStore"

const provinceHeaderLayOut = {
  item0: {width: '22.4vw', fontSize:'3.733vw', color:'#222'},
  item1: {width: '14.2vw', fontSize:'3.733vw', color:'#222'},
  item2: {width: '16vw', fontSize:'3.733vw', color:'#222'},
  item3: {width: '13vw', fontSize:'3.733vw', color:'#222'},
  item4: {width: '11.2vw', fontSize:'3.733vw', color:'#222'},
  item5: { fontSize:'3.733vw', color:'#005def'},
}

export class HomeStore {

  @observable lastUpdateTime = "";
  @observable chinaTotal = {};
  @observable chinaAdd = {};
  @observable isShowAdd = false;
  @observable showAddSwitch = {}
  @observable areaTree = []
  @observable chinaMapNowData = []
  @observable chinaMapTotalData = []
  @observable chinaTree = []

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
  @observable importedAddOption = EchartsOptions.importedAdd;
  @observable importedTotalOption = EchartsOptions.importedTotal;

  @observable areaList = [];

  areaTableLayOut = {
    item0: `${22.4 / 89.333 * 100}%`,
    item1: `${15.467 / 89.333 * 100}%`,
    item2: `${15.467 / 89.333 * 100}%`,
    item3: `${12 / 89.333 * 100}%`,
    item4: `${12 / 89.333 * 100}%`
  }

  provinceTableLayOut = {
    item0: {width: '20vw', color:'#222' },
    item1: {width: '18.9vw', color:'#005dff' },
    item2: {width: '18.9vw',  color:'#222' },
    item3: {width: '13.867vw',color:'#222' },
    item4: { color:'#222' },

  }


  @action loadTodayData() {
    return agent.Home.todayData()
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
              this.updateAreaList();
              this.chinaMapNowData = areaTree[0] && areaTree[0].children.map(item => {
                return {...item, value: item.total.confirm - item.total.dead - item.total.heal}
              })
              this.chinaMapTotalData = areaTree[0] && areaTree[0].children.map(item => {
                return {...item, value: item.total.confirm}
              })

              EchartsOptions.chinaMapOption.series[0].data = this.chinaMapNowData;

              this.chinaTree = this.areaTree[0] &&
                this.areaTree[0].children.map(item =>{
                  let headerContents = [
                    {content: item.name, style:{width: this.areaTableLayOut.item0}},
                    {content: item.total.nowConfirm, style:{width: this.areaTableLayOut.item1}},
                    {content: item.total.confirm, style:{width: this.areaTableLayOut.item2}},
                    {content: item.total.heal, style:{width: this.areaTableLayOut.item3}},
                    {content: item.total.dead, style:{width: this.areaTableLayOut.item4}},
                    {content: '详情', style:{color:'#005def', fontWeight:400}, onClick:this.chinaTreeDetailClicked.bind(this, item.name)},
                  ]
                  let childrenContents = item.children.map(item1 => {
                    return [
                      {content: item1.name},
                      {content: item1.total.nowConfirm},
                      {content: item1.total.confirm},
                      {content: item1.total.heal},
                      {content: item1.total.dead},
                      {content: ''},
                    ]
                  })
                  return {
                    headerContents,
                    childrenContents
                  }
                })

              return data
            }))
            .catch(e => {

            })
  }

  @action loadRecentData() {
    return agent.Home.recentData()
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
              ...EchartsOptions.chinaAddConfirmSuspect,
              xAxis: {
                data: this.chinaDayAddList.map(item => item.date)
              },
              series: [{
                name: '确诊',
                type: 'line',
                smooth: true,
                color:'#f06061',
                data: this.chinaDayAddList.map(item => item.confirm),
              },{
                name: '疑似',
                type: 'line',
                smooth: true,
                color:'#ffd661',
                data: this.chinaDayAddList.map(item => item.suspect),
              }]
            };
            this.chinaConfirmSuspectImportedOption = {
              ...EchartsOptions.chinaConfirmSuspectImported,
              xAxis: {
                data: this.chinaDayList.map(item => item.date)
              },
              series: [{
                data: this.chinaDayList.map(item => item.confirm),
                name: '累计确诊',
                type: 'line',
                smooth: true,
                color: '#9b0a0e'
              },{
                data: this.chinaDayList.map(item => item.nowConfirm),
                name: '现有确诊',
                type: 'line',
                smooth: true,
                color: '#ff7b7c'
              },{
                data: this.chinaDayList.map(item => item.suspect),
                name: '现有疑似',
                type: 'line',
                smooth: true,
                color: '#ffd661'
              },{
                data: this.chinaDayList.map(item => item.nowSevere),
                name: '现有重症',
                type: 'line',
                smooth: true,
                color: '#cd73bf'
              }]
            };
            this.chinaHealDeadOption = {
              ...EchartsOptions.chinaHealDeadRate,
              xAxis: {
                data: this.chinaDayList.map(item => item.date)
              },
              series: [{
                data: this.chinaDayList.map(item => item.heal),
                name: '治愈率',
                type: 'line',
                smooth: true,
                color: '#65b379'
              },{
                data: this.chinaDayList.map(item => item.dead),
                name: '病死率',
                type: 'line',
                smooth: true,
                color: '#87878b'
              }]
            };
            this.chinaHealDeadRateOption = {
              ...EchartsOptions.chinaHealDeadRate,
              xAxis: {
                data: this.chinaDayList.map(item => item.date)
              },
              series: [{
                data: this.chinaDayList.map(item => item.healRate),
                name: '治愈率',
                type: 'line',
                smooth: true,
                color: '#65b379'
              },{
                data: this.chinaDayList.map(item => item.deadRate),
                name: '病死率',
                type: 'line',
                smooth: true,
                color: '#87878b'
              }]
            };

            let importedAddList = this.chinaDayAddList.filter(item => item.importedCase > 0);
            this.importedAddOption = {
              ...EchartsOptions.importedAdd,
              xAxis: {
                data: importedAddList.map(item => item.date)
              },
              series: {
                data: importedAddList.map(item => item.importedCase),
                name: '境外输入新增',
                type: 'line',
                smooth: true,
                color: '#ff6341',
              }
            };
            let importedList = this.chinaDayList.filter(item => item.importedCase > 0);
            this.importedTotalOption = {
              ...EchartsOptions.importedTotal,
              xAxis: {
                data: importedList.map(item => item.date)
              },
              series: {
                data: importedList.map(item => item.importedCase),
                name: '境外输入累计',
                type: 'line',
                smooth: true,
                color: '#de1f05',
              }
            }

            let chinaNewAddData = dailyNewAddHistory.map(item => item.country)
            foreignStore.setChinaForeignConfirmAddOptionSeries(chinaNewAddData)

            let chinaConfirmData = dailyHistory.map(item => item.country.dead + item.country.heal + item.country.nowConfirm)
            foreignStore.setChinaForeignConfirmOptionSeries(0, chinaConfirmData)
            let chinaNowConfirmData = dailyHistory.map(item => item.country.nowConfirm)
            foreignStore.setChinaForeignConfirmOptionSeries(1, chinaNowConfirmData)

            let chinaHealRateData = dailyHistory.map(item => item.country.healRate)
            foreignStore.setChinaForeignHealRateSeries(chinaHealRateData)

            let chinaDeadRateData = dailyHistory.map(item => item.country.deadRate)
            foreignStore.setChinaForeignDeadRateSeries(chinaDeadRateData)

      }))
  }

  @action loadTodayNotice() {
    agent.Home.todayNotice()
      .then(action(data => {
        this.todayNotice = data
      }))
  }

  @action updateAreaList() {
    let provinces = this.areaTree[0] ? this.areaTree[0].children : []
    let areas = [];
    for(let province of provinces) {
      if (province.name === provinceStore.province) {
        areas = province.children;
      }
    }
    this.areaList = areas.map((item, index)=>{
      return [
        {content: item.name, style:this.provinceTableLayOut.item0},
        {content: item.today.confirm, style:this.provinceTableLayOut.item1},
        {content: item.total.confirm, style:this.provinceTableLayOut.item2},
        {content: item.total.heal, style:this.provinceTableLayOut.item3},
        {content: item.total.dead, style:this.provinceTableLayOut.item4},
      ]
    })
  }

  chinaTreeDetailClicked(area) {
    console.log(area, 'item clicked')
  }
}

export default new HomeStore();