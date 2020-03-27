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

  @action loadForeignData() {
    agent.Foreign.foreignData()
      .then(res => {
        if (res.ok || res.status === 2000 || res.statesText === "OK") {
          return JSON.parse(res.text)
        }
      })
      .then(json => {
        if (json.ret === 0) {
          return JSON.parse(json.data)
        }
      })
      .then(
        action(({
          importStatis
        })=>{
          this.importedTop10Option = {
            xAxis: {
              data: importStatis.TopList.map(item => item.province)
            },
            series: {
              data: importStatis.TopList.map(item => item.importedCase)
            }
          }
      }))
  }

}

export default new ForeignStore();