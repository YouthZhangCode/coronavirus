/**
 * @Summary: short description for the file
 * @Date: 2020/3/25 2:23 PM
 * @Author: Youth
 */
import React, { Component } from 'react';
import { Carousel } from 'antd';
import PropTypes from 'prop-types';

import moduleScss from './CarouselWrap.module.scss'

export default class CarouselWrap extends Component{

  static propTypes = {
    dotNames: PropTypes.array
  }


  constructor(props){
    super(props)
    this.carousel = React.createRef();
    this.state = {
      selectedIndex: 0
    }
  }

  carouselGoTo(index) {
    if (index !== this.state.selectedIndex) {
      this.carousel.current.goTo(index)
      this.setState({
        selectedIndex: index
      })
    }
  }

  render() {
    return(
      <div className={moduleScss.wrap}>
        <div className={moduleScss.carouselWrap}>

          <Carousel
            afterChange={current => {
              if (this.state.selectedIndex !== current) {
                this.setState({
                  selectedIndex: current
                })
              }
            }}
            ref={this.carousel}
            dots={false}>
            {this.props.children}
          </Carousel>
          {
            this.state.selectedIndex !== 0 &&
            <p onClick={()=>{this.carouselGoTo(this.state.selectedIndex - 1)}} className={moduleScss.arr_l}>
            </p>
          }
          {
            this.state.selectedIndex !== this.props.children.length - 1 &&
            <p onClick={()=>{this.carouselGoTo(this.state.selectedIndex + 1)}} className={moduleScss.arr_r}>
            </p>
          }
        </div>
        <div className={moduleScss.dotsWrap}>
          {this.props.dotNames.map((item, index)=><span key={index} onClick={this.carouselGoTo.bind(this, index)} className={index === this.state.selectedIndex ? moduleScss.selected : undefined}>{item}</span>)}
        </div>
      </div>
    )
  }
}