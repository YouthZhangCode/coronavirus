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
          }
      }))
  }

}

export default new ForeignStore();