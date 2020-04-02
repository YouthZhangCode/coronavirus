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

  @observable globalStatis = {}

  @action loadForeignData() {
    agent.Foreign.foreignData()
      .then(res => {
        if (res.ok || res.status === 2000 || res.statesText === "OK") {
          return JSON.parse(res.text)
        }
      })
      .then(json => {
        if (json.ret === 0) {
          console.log(JSON.parse(json.data))
          return JSON.parse(json.data)
        }
      })
      .then(
        action(({
          importStatis,
          globalStatis,
          globalDailyHistory,
          countryAddConfirmRankList,
          countryConfirmWeekCompareRankList,
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

          // 主要疫情国累计七日增幅rank
          this.countryWeakRankOption.yAxis.data = countryConfirmWeekCompareRankList.map(item => item.nation);
          let rankList = countryConfirmWeekCompareRankList.map(item => item.rate);
          this.countryWeakRankOption.series.data = rankList.reverse();
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




}

export default new ForeignStore();