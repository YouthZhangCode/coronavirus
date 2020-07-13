import { observable, action } from 'mobx'

import * as EchartsOptions from '../common/EchartsOptions'
import agent from '../agent';

export class ProvinceStore {

  @observable province = "北京";

  @observable todayDate = {};

  @observable confirmOption = EchartsOptions.provinceConfirm;
  @observable confirmAddOption = EchartsOptions.provinceConfirmAdd;

  @observable provinceMapNowData = [];
  @observable provinceMapTotalData = [];

  @observable news = [];

  @action setProvince(province) {
    this.province = province;
  }

  @action updateProvinceDailyList() {
    agent.Province.provinceDailyList(this.province)
      .then(action(res=>{
        let todayDate = res[res.length-2];
        this.todayDate = {
          ...todayDate,
          nowConfirm: todayDate.confirm-todayDate.heal-todayDate.dead,
          newAdd: todayDate.newConfirm - todayDate.newHeal - todayDate.newDead
        }
        let dailyList = res.slice(res.length-28, res.length-2);
        this.confirmAddOption.xAxis.data = dailyList.map((item, index)=>{
          return item.date;
        })
        this.confirmAddOption.series[0].data = dailyList.map((item, index)=>{
          return item.newConfirm;
        })
        this.confirmAddOption.series[1].data = dailyList.map((item, index)=>{
          return item.newHeal;
        })
        this.confirmAddOption.series[2].data = dailyList.map((item, index)=>{
          return item.newDead;
        })

        this.confirmOption.xAxis.data = res.map((item, index)=>{
          return item.date;
        })
        this.confirmOption.series[0].data = res.map((item)=>{
          return item.confirm-item.heal-item.dead;
        })
        this.confirmOption.series[1].data = res.map((item)=>{
          return item.confirm;
        })
        this.confirmOption.series[2].data = res.map((item)=>{
          return item.heal;
        })
        this.confirmOption.series[3].data = res.map((item)=>{
          return item.dead;
        })


      }))
  }

  @action requestNews(size) {
    agent.Province.news('bj', size)
      .then(action(res=>{
        console.log('news ---- ', res)
        this.news = res.data.items;
      }))
  }

}

export default new ProvinceStore();