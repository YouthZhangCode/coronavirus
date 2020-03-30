/**
 * @Summary: short description for the file
 * @Date: 2020/3/11 10:08 AM
 * @Author: Youth
 */
import React, {Component} from 'react'
import {withRouter} from 'react-router'

import moduleScss from './Header.module.scss'

class Header extends Component{

  constructor(props) {
    super(props)
    this.state = {
      selected:0
    }
  }

  render() {
    return(
      <div>
        <div className={moduleScss.navHide}>
          <div className={moduleScss.navWrapper}>
            <div className={moduleScss.hidden}>
              <div ref='aaa' className={`${moduleScss.navBar} ${moduleScss.view}`}>
                <div onClick={()=>{this.itemSelected(0)}} className={`${moduleScss.navItem} ${moduleScss.itemHome} ${this.state.selected === 0 && moduleScss.active}`}>国内疫情</div>
                <div onClick={()=>{this.itemSelected(1)}} className={`${moduleScss.navItem} ${moduleScss.itemForeign} ${this.state.selected === 1 && moduleScss.active}`}>海外疫情</div>
                <div onClick={()=>{this.itemSelected(2)}} className={`${moduleScss.navItem} ${moduleScss.itemHubei} ${this.state.selected === 2 && moduleScss.active}`}>湖北疫情</div>
                <div onClick={()=>{this.itemSelected(3)}} className={`${moduleScss.navItem} ${this.state.selected === 3 && moduleScss.active}`}>最新进展</div>
                <div onClick={()=>{this.itemSelected(4)}} className={`${moduleScss.navItem} ${this.state.selected === 4 && moduleScss.active}`}>定点医院</div>
                <div onClick={()=>{this.itemSelected(5)}} className={`${moduleScss.navItem} ${this.state.selected === 5 && moduleScss.active}`}>韩国疫情</div>
                <div onClick={()=>{this.itemSelected(6)}} className={`${moduleScss.navItem} ${this.state.selected === 6 && moduleScss.active}`}>病患轨迹</div>
                <div onClick={()=>{this.itemSelected(7)}} className={`${moduleScss.navItem} ${this.state.selected === 7 && moduleScss.active}`}>较真辟谣</div>
                <div onClick={()=>{this.itemSelected(8)}} className={`${moduleScss.navItem} ${this.state.selected === 8 && moduleScss.active}`}>复工信息</div>
                <div onClick={()=>{this.itemSelected(9)}} className={`${moduleScss.navItem} ${this.state.selected === 9 && moduleScss.active}`}>交通信息</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  itemSelected(index) {
    this.setState({
      selected: index
    })
    if (index === 0) {
      this.props.history.push('/')
    } else if (index === 1) {
      this.props.history.push('./foreign')
    }
  }

  scrollTo() {
    console.log(11111)
    // let bodyWidth = window.document.body.offsetWidth;
    this.refs.aaa.scrollTo(370,0);
    // this.refs.aaa.style.transform = 'translateX(-50%)'
  }
}

export default withRouter(Header)