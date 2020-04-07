/**
 * @Summary: short description for the file
 * @Date: 2020/3/26 2:43 PM
 * @Author: Youth
 */
import { action, observable } from 'mobx';

import agent from '../agent';
import * as EchartsOptions from '../common/EchartsOptions'

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

  @observable countryRankList = {
    Europe: [],
    NorthAmerica: [],
    Asia: [],
    SouthAmerica: [],
    Afica: [],
    Oceanica: [],
    other: [],
  };

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
      .then(res => {
        res.map((countryList, index)=>{
          countryList = countryList.filter(item => item.date > '02.24')
          this.foreignCountriesConfirmOption.series[index].data = countryList.map(item => item.confirm)
          if (index === 0) {
            this.foreignCountriesConfirmOption.xAxis.data = countryList.map(item => item.date)
          }
        })
      })
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
        this.countryRankList.Europe = res.filter(item => item.continent === '欧洲');
        this.countryRankList.NorthAmerica = res.filter(item => item.continent === '北美洲');
        this.countryRankList.Asia = res.filter(item => item.continent === '亚洲');
        this.countryRankList.SouthAmerica = res.filter(item => item.continent === '南美洲');
        this.countryRankList.Afica = res.filter(item => item.continent === '非洲');
        this.countryRankList.Oceanica = res.filter(item => item.continent === '大洋洲');
        this.countryRankList.other = res.filter(item => item.continent === '其他');
        console.log('countryRankListData', res);
      })
  }


}

export default new ForeignStore();