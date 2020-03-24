/**
 * @Summary: short description for the file
 * @Date: 2020/3/24 5:28 PM
 * @Author: Youth
 */
import React, { Component } from 'react';
import echarts from 'echarts';
import PropTypes from 'prop-types';

export default class EchartWrap extends Component {

  static propTypes = {
    option: PropTypes.object.isRequired,
    title: PropTypes.string,
    showLegend: PropTypes.bool,
  }

  constructor(props) {
    super(props)
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps')
    this.chart.setOption(nextProps.option)
  }

  componentDidMount() {
    this.chart = echarts.init(document.getElementById('chartWrap'))
    this.chart.setOption(this.props.option)
  }

  render() {
    return(
      <div id='chartWrap' style={styles.chartWrap}>
        <div>{this.props.title}</div>
        <div>图例</div>
      </div>
    )
  }
}

const styles = {
  chartWrap: {
    height: '100vw'
  }
}