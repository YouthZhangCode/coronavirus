/**
 * @Summary: short description for the file
 * @Date: 2020/6/19 10:57 AM
 * @Author: Youth
 */
import { observable, action } from 'mobx';

export class RouteStore {

  @observable slideIndex = 0;
  @observable province = '湖北';

  @action setSlideIndex(index) {
    this.slideIndex = index;
  }

  @action setProvince(province) {
    this.province = province;
  }

}

export default new RouteStore();