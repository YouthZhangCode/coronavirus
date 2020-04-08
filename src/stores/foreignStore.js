/**
 * @Summary: short description for the file
 * @Date: 2020/3/26 2:43 PM
 * @Author: Youth
 */
import { action, observable } from 'mobx';

import agent from '../agent';
import * as EchartsOptions from '../common/EchartsOptions'

const areaTableLayOut = {
  item0: {width: '22.4vw', fontSize:'3.733vw', color:'#222'},
  item1: {width: '14.2vw', fontSize:'3.733vw', color:'#222'},
  item2: {width: '16vw', fontSize:'3.733vw', color:'#222'},
  item3: {width: '13vw', fontSize:'3.733vw', color:'#222'},
  item4: {width: '11.2vw', fontSize:'3.733vw', color:'#222'},
  item5: { fontSize:'3.733vw', color:'#005def'},
}

const tableHeaderLayOut = {
  item0: {width: '22.4vw', fontWeight: 500, background: '#f5f5f5', borderTop:'1px solid #fff'},
  item1: {width: '14.2vw', fontWeight: 500, background: '#f5f5f5', borderTop:'1px solid #fff'},
  item2: {width: '16vw', fontWeight: 500, background: '#f5f5f5', borderTop:'1px solid #fff'},
  item3: {width: '13vw', fontWeight: 500, background: '#f5f5f5', borderTop:'1px solid #fff'},
  item4: {width: '11.2vw', fontWeight: 500, background: '#f5f5f5', borderTop:'1px solid #fff'},
  item5: {fontWeight: 500, background: '#f5f5f5', borderTop:'1px solid #fff'},

}

export class ForeignStore  {

  @observable importedTop10Option = EchartsOptions.importedTop10;
  @observable chinaForeignConfirmAddOption = EchartsOptions.chinaForeignConfirmAdd;
  @observable chinaForeignConfirmOption = EchartsOptions.chinaForeignConfirm;
  @observable chinaForeignHealRateOption = EchartsOptions.chinaForeignHealRate;
  @observable chinaForeignDeadRateOption = EchartsOptions.chinaForeignDeadRate;
  @observable addConfirmTop10Option = EchartsOptions.addConfirmTop10;
  @observable countryWeakRankOption = EchartsOptions.countryWeakRank;
  @observable millionConfirmRankOption = EchartsOptions.millionConfirmRank;
  @observable continentWeekConfirmOption = EchartsOptions.continentWeekConfirm;
  @observable europeCountriesAddConfirmOption = EchartsOptions.europeCountriesAddConfirm;
  @observable asianCountriesAddConfirmOption = EchartsOptions.asianCountriesAddConfirm;
  @observable northAmericaCountriesAddConfirmOption = EchartsOptions.northAmericaCountriesAddConfirm;
  @observable foreignCountriesConfirmOption = EchartsOptions.foreignCountriesConfirm;

  @observable continentListData = [];
  @observable countryListData = [];


  @observable globalStatis = {}

  @action loadForeignData() {
    agent.Foreign.foreignData()
      .then(
        action(({
          importStatis,
          globalStatis,
          globalDailyHistory,
          countryAddConfirmRankList,
          continentStatis,
        })=>{
          this.globalStatis = globalStatis;
          this.importedTop10Option = {
            ...EchartsOptions.importedTop10,
            xAxis: {
              data: importStatis.TopList.map(item => item.province)
            },
            series: {
              data: importStatis.TopList.map(item => item.importedCase),
              type: 'bar',
              barWidth: '10px',
              itemStyle: {
                normal: {
                  color: function (params) {
                    var colorList = ['#ff2736', '#ff2736', '#ff2736','#ff2736','#ffa577','#ffa577','#ffa577','#ffcea0','#ffcea0','#ffcea0',]
                    return colorList[params.dataIndex]
                  }
                }
              }
            }
          };

          // 中国/海外新增确诊表
          this.chinaForeignConfirmAddOption.xAxis.data = globalDailyHistory.map(item => item.date);
          this.chinaForeignConfirmAddOption.series[1].data = globalDailyHistory.map(item => item.all.newAddConfirm)
          // 中国/海外确诊趋势表
          this.chinaForeignConfirmOption.xAxis.data = globalDailyHistory.map(item => item.date);
          this.chinaForeignConfirmOption.series[2].data = globalDailyHistory.map(item => item.all.confirm);
          this.chinaForeignConfirmOption.series[3].data = globalDailyHistory.map(item => item.all.confirm - item.all.dead - item.all.heal)
          // 中国/海外治愈率
          this.chinaForeignHealRateOption.xAxis.data = globalDailyHistory.map(item => item.date);
          this.chinaForeignHealRateOption.series[1].data = globalDailyHistory.map(item => item.all.healRate)
          // 中国/海外 病死率
          this.chinaForeignDeadRateOption.xAxis.data = globalDailyHistory.map(item => item.date);
          this.chinaForeignDeadRateOption.series[1].data = globalDailyHistory.map(item => item.all.deadRate)

          // 昨日新增确诊TOP10
          this.addConfirmTop10Option.xAxis.data = countryAddConfirmRankList.map(item => item.nation);
          this.addConfirmTop10Option.series.data = countryAddConfirmRankList.map(item => item.addConfirm);

        }))
  }

  @action setChinaForeignConfirmAddOptionSeries(chinaAddData) {
    this.chinaForeignConfirmAddOption.series[0].data = chinaAddData;
  }

  @action setChinaForeignConfirmOptionSeries(index, chinaConfirmData) {
    this.chinaForeignConfirmOption.series[index].data = chinaConfirmData;
  }

  @action setChinaForeignHealRateSeries(chinaData) {
    this.chinaForeignHealRateOption.series[0].data = chinaData;
  }

  @action setChinaForeignDeadRateSeries(chinaData) {
    this.chinaForeignDeadRateOption.series[0].data = chinaData;
  }

  @action loadForeignCountriesData() {
    Promise.all([
      agent.Foreign.countryData('意大利'),
      agent.Foreign.countryData('伊朗'),
      agent.Foreign.countryData('西班牙'),
      agent.Foreign.countryData('德国'),
      agent.Foreign.countryData('英国'),
      agent.Foreign.countryData('法国'),
      agent.Foreign.countryData('美国'),
      agent.Foreign.countryData('日本本土'),
    ])
      .then(action(res => {
        res.map((countryList, index)=>{
          countryList = countryList.filter(item => item.date > '02.24')
          this.foreignCountriesConfirmOption.series[index].data = countryList.map(item => item.confirm)
          if (index === 0) {
            this.foreignCountriesConfirmOption.xAxis.data = countryList.map(item => item.date)
          }
        })
      }))
  }

  @action loadEuropeCountriesData() {
    Promise.all([
      agent.Foreign.countryData('意大利'),
      agent.Foreign.countryData('西班牙'),
      agent.Foreign.countryData('德国'),
      agent.Foreign.countryData('法国'),
    ])
      .then(action(res=>{
        res.map((countryList, index) => {
          countryList = countryList.slice(countryList.length-41, countryList.length-1);
          this.europeCountriesAddConfirmOption.series[index].data = countryList.map(day => day.confirm_add)
          if (index === 0) {
            this.europeCountriesAddConfirmOption.xAxis.data = countryList.map(day => day.date)
          }
        })
      }))
  }

  @action loadAsiaCountriesData() {
    Promise.all([
      agent.Foreign.countryData('韩国'),
      agent.Foreign.countryData('日本本土'),
      agent.Foreign.countryData('伊朗'),
    ])
      .then(action(res=>{
        res.map((countryList, index) => {
          countryList = countryList.slice(countryList.length-49, countryList.length-1);
          this.asianCountriesAddConfirmOption.series[index].data = countryList.map(day => day.confirm_add)
          if (index === 0) {
            this.asianCountriesAddConfirmOption.xAxis.data = countryList.map(day => day.date)
          }
        })
      }))
  }

  @action loadNorthAmericaCountriesData() {
    Promise.all([
      agent.Foreign.countryData('美国'),
      agent.Foreign.countryData('加拿大'),
    ])
      .then(action(res=>{
        res.map((countryList, index) => {
          countryList = countryList.slice(countryList.length-31, countryList.length-1);
          this.northAmericaCountriesAddConfirmOption.series[index].data = countryList.map(day => day.confirm_add)
          if (index === 0) {
            this.northAmericaCountriesAddConfirmOption.xAxis.data = countryList.map(day => day.date)
          }
        })
      }))
  }

  @action loadAutoWeekContinentMillionData() {
    agent.Foreign.autoWeekContinentMillionData()
      .then(({
        FAutoCountryWeekCompRank,
        FAutoContinentConfirmStatis,
        FAutoConfirmMillionRankList,
      }) => {
        console.log('autoWeekContinentMillionData', {FAutoCountryWeekCompRank,
          FAutoContinentConfirmStatis,
          FAutoConfirmMillionRankList,})
        // 主要疫情国累计七日增幅rank
        FAutoCountryWeekCompRank.reverse();
        this.countryWeakRankOption.yAxis.data = FAutoCountryWeekCompRank.map(item => item.nation);
        this.countryWeakRankOption.series.data = FAutoCountryWeekCompRank.map(item => item.rate);
        // 每百万人确诊数排行
        FAutoConfirmMillionRankList = FAutoConfirmMillionRankList.slice(0, 10)
        FAutoConfirmMillionRankList.reverse();
        this.millionConfirmRankOption.yAxis.data = FAutoConfirmMillionRankList.map(item => item.nation);
        this.millionConfirmRankOption.series.data = FAutoConfirmMillionRankList.map(item => item.rate);

      })
  }

  @action loadAutoContinentGlobalDailyListCountryConfirmAdd() {
    agent.Foreign.autoContinentGlobalDailyListCountryConfirmAdd()
      .then(({
               FAutoGlobalStatis,
               FAutoContinentStatis,
               FAutoGlobalDailyList,
               FAutoCountryConfirmAdd,
             }) => {
        console.log('autoContinentGlobalDailyListCountryConfirmAdd',{
          FAutoGlobalStatis,
          FAutoContinentStatis,
          FAutoGlobalDailyList,
          FAutoCountryConfirmAdd,
        });
        FAutoContinentStatis = FAutoContinentStatis.slice(FAutoContinentStatis.length-7, FAutoContinentStatis.length);
        this.continentWeekConfirmOption.xAxis.data = FAutoContinentStatis.map(item => item.date);
        this.continentWeekConfirmOption.series[0].data = FAutoContinentStatis.map(item => item.statis['欧洲']);
        this.continentWeekConfirmOption.series[1].data = FAutoContinentStatis.map(item => item.statis['亚洲']);
        this.continentWeekConfirmOption.series[2].data = FAutoContinentStatis.map(item => item.statis['北美洲']);
        this.continentWeekConfirmOption.series[3].data = FAutoContinentStatis.map(item => item.statis['南美洲']);
        this.continentWeekConfirmOption.series[4].data = FAutoContinentStatis.map(item => item.statis['大洋洲']);
        this.continentWeekConfirmOption.series[5].data = FAutoContinentStatis.map(item => item.statis['非洲']);
        this.continentWeekConfirmOption.series[6].data = FAutoContinentStatis.map(item => item.statis['其他']);
        this.continentWeekConfirmOption.series[7].data = FAutoContinentStatis.map(item => item.nowConfirm);

      })
  }

  @action loadCountryRankListData() {
    agent.Foreign.countryRankListData()
      .then((res) => {

        this.countryListData = res.map(item => {
          return [
            {content: item.name, style: areaTableLayOut.item0},
            {content: item.confirmAdd, style: areaTableLayOut.item1},
            {content: item.confirm, style: areaTableLayOut.item2},
            {content: item.heal, style: areaTableLayOut.item3},
            {content: item.dead, style: areaTableLayOut.item4},
            {content: '详情', style: areaTableLayOut.item5, onClick: this.countryListItemClicked.bind(this,item)},
          ]
        })

        let Europe = res.filter(item => item.continent === '欧洲');
        let NorthAmerica = res.filter(item => item.continent === '北美洲');
        let Asia = res.filter(item => item.continent === '亚洲');
        let SouthAmerica = res.filter(item => item.continent === '南美洲');
        let Afica = res.filter(item => item.continent === '非洲');
        let Oceanica = res.filter(item => item.continent === '大洋洲');
        let other = res.filter(item => item.continent === '其他');

        let continentList = [Europe, NorthAmerica, Asia, SouthAmerica, Afica, Oceanica, other];

        this.continentListData = continentList.map(continent => {
          let name = '', confirmAdd = 0, confirm = 0, heal = 0, dead = 0;

          let childrenContents = continent.map(country => {
            name = country.continent
            confirmAdd += country.confirmAdd;
            confirm += country.confirm;
            heal += country.heal;
            dead += country.dead;
            return [
              {content: country.name, style: areaTableLayOut.item0},
              {content: country.confirmAdd, style: areaTableLayOut.item1},
              {content: country.confirm, style: areaTableLayOut.item2},
              {content: country.heal, style: areaTableLayOut.item3},
              {content: country.dead, style: areaTableLayOut.item4},
              {content: '详情', style: areaTableLayOut.item5, onClick: this.countryListItemClicked.bind(this,country)},
            ]
          })

          let headerContents = [
            {content: `${name}(${continent.length})`, style: tableHeaderLayOut.item0},
            {content: confirmAdd, style: tableHeaderLayOut.item1},
            {content: confirm, style: tableHeaderLayOut.item2},
            {content: heal, style: tableHeaderLayOut.item3},
            {content: dead, style: tableHeaderLayOut.item4},
            {content: '', style: tableHeaderLayOut.item5}
          ]
          return {
            headerContents,
            childrenContents,
          }

        })

        console.log('countryRankListData', res);
      })
  }

  countryListItemClicked(item) {
    console.log('countryListItemClicked', item);
  }

}

export default new ForeignStore();