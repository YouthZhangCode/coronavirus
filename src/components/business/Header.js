/**
 * @Summary: short description for the file
 * @Date: 2020/3/11 10:08 AM
 * @Author: Youth
 */
import React, {Component} from 'react'
import {withRouter} from 'react-router'
import { observer } from 'mobx-react'

import { useStores } from "../../hocks"
import moduleScss from './Header.module.scss'

const Header = observer((props) => {

  const {provinceStore } = useStores();
  let slideIndex = 0;
  return(
    <div>
      <div className={moduleScss.navHide}>
        <div className={moduleScss.navWrapper}>
          <div className={moduleScss.hidden}>
            <div className={`${moduleScss.navBar} ${moduleScss.view}`}>
              <div onClick={() => {
                itemSelected(0)
              }}
                   className={`${moduleScss.navItem} ${moduleScss.itemHome} ${slideIndex === 0 && moduleScss.active}`}>国内疫情
              </div>
              <div onClick={() => {
                itemSelected(1)
              }}
                   className={`${moduleScss.navItem} ${moduleScss.itemForeign} ${slideIndex === 1 && moduleScss.active}`}>海外疫情
              </div>
              <div onClick={() => {
                itemSelected(2)
              }}
                   className={`${moduleScss.navItem} ${moduleScss.itemHubei} ${slideIndex === 2 && moduleScss.active}`}>{`${provinceStore.province}疫情`}</div>
              <div onClick={() => {
                itemSelected(3)
              }} className={`${moduleScss.navItem} ${slideIndex === 3 && moduleScss.active}`}>最新进展
              </div>
              <div onClick={() => {
                itemSelected(4)
              }} className={`${moduleScss.navItem} ${slideIndex === 4 && moduleScss.active}`}>定点医院
              </div>
              <div onClick={() => {
                itemSelected(5)
              }} className={`${moduleScss.navItem} ${slideIndex === 5 && moduleScss.active}`}>韩国疫情
              </div>
              <div onClick={() => {
                itemSelected(6)
              }} className={`${moduleScss.navItem} ${slideIndex === 6 && moduleScss.active}`}>病患轨迹
              </div>
              <div onClick={() => {
                itemSelected(7)
              }} className={`${moduleScss.navItem} ${slideIndex === 7 && moduleScss.active}`}>较真辟谣
              </div>
              <div onClick={() => {
                itemSelected(8)
              }} className={`${moduleScss.navItem} ${slideIndex === 8 && moduleScss.active}`}>复工信息
              </div>
              <div onClick={() => {
                itemSelected(9)
              }} className={`${moduleScss.navItem} ${slideIndex === 9 && moduleScss.active}`}>交通信息
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )

  function itemSelected(index) {
    if (index === 0) {
      props.history.push('/')
    } else if (index === 1) {
      props.history.push('/foreign')
    } else if (index === 2) {
      props.history.push('/province/' + provinceStore.province)
    }
  }

})

export default withRouter(Header)