/**
 * @Summary: short description for the file
 * @Date: 2020/3/24 5:28 PM
 * @Author: Youth
 */
import React, { Component, PureComponent } from 'react';
import echarts from 'echarts';
import PropTypes from 'prop-types';

export default class EchartWrap extends Component {

  static propTypes = {
    option: PropTypes.object.isRequired,
    title: PropTypes.string,
    showLegend: PropTypes.bool,
    height: PropTypes.string,
  }

  static defaultProps = {
    showLegend: true,
    height: '45vw',
  }

  constructor(props) {
    super(props)
    this.state = {
      state1: 1
    }
  }

  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   this.chart.setOption(nextProps.option)
  // }

  componentDidMount() {
    this.chart = echarts.init(document.getElementById(this.props.option._id))
    this.chart.setOption(this.props.option)
  }

  render() {
    return(
      <div style={styles.wrap}>
        <div style={styles.titleWrap}>
          <div style={styles.title}>{this.props.title}</div>
          <div style={{...styles.legendWrap, margin:'1vw 0'}}>
            {
              this.props.showLegend && Array.isArray(this.props.option.series) &&
              this.props.option.series.map(
                (item, index) =>
                  <div key={index} style={styles.legendWrap}>
                    <div style={{...styles.legendRect, backgroundColor:item.color}}>
                    </div>
                    <span style={styles.legend}>{item._name || item.name}</span>
                  </div>
              )
            }
          </div>
        </div>
        <div id={this.props.option._id} style={{...styles.chart, ...{height: this.props.height}}}>
        </div>
      </div>

    )
  }
}

const styles = {
  wrap: {
    border: '1px solid #efefef',
    borderRadius: '1.6vw',
    padding: '3.467vw 0 0',
    margin: '0 5.333vw'
  },
  titleWrap: {
    marginLeft: '3.2vw'
  },
  title: {
    fontSize: '3.733vw',
    color: '#222',
    fontWeight: 500,
  },
  legendWrap: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  legendRect: {
    width: '2.667vw',
    height: '2.667vw',
  },
  legend: {
    fontSize: '2.667vw',
    fontWeight: '400',
    color: '#737373',
    margin: '0 2.667vw 0 .6vw'
  },
  chart: {
    width: 'calc(100% - 6.4vw)',
    margin: '0 3.2vw',
  },

}