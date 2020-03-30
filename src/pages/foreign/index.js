/**
 * @Summary: short description for the file
 * @Date: 2020/3/30 1:09 PM
 * @Author: Youth
 */
import React, { Component } from 'react';

import moduleScss from './Foreign.module.scss';
import homeModuleScss from '../home/Home.module.scss';

export default class Foreign extends Component {

  render() {
    return(
      <div>
        {this._renderHeader()}
      </div>
    )
  }

  _renderHeader() {
    return(
      <div className={homeModuleScss.head}>
        <p className={homeModuleScss.logo} />
      </div>
    )
  }
}