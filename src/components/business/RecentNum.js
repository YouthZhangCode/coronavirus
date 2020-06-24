/**
 * @Summary: short description for the file
 * @Date: 2020/3/12 5:19 PM
 * @Author: Youth
 */
import React from 'react'
import PropTypes from 'prop-types'

import constantStyle from '../../style/constant.scss'

export default function RecentNum(props) {

  const styles = {
    wrap:{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.6vw 0 3.2vw 0',
      backgroundColor: props.backgroundColor || '#fff'
    },
    change: {
      paddingTop: '1.6vw',
      color: '#7c7c7c',
      fontSize: constantStyle.fontSize1,
      lineHeight: constantStyle.padding1,
      height: constantStyle.padding1,
      fontWeight: '500',
    },
    total: {
      paddingTop: '1.6vw',
      fontSize: '5.867vw',
      lineHeight: '5.867vw',
      height: '5.867vw',
      fontWeight: '600',
      color: props.color || constantStyle.textColor737
    },
    description: {
      fontSize: '3.2vw',
      height: '3.2vw',
      lineHeight: '3.2vw',
      color: constantStyle.textColor222,
      marginTop: '1.6vw',
      fontWeight: 500,
    }
  }

  return(
    <div style={styles.wrap}>
      <div style={styles.change}>
        较上日
        <span style={{color:props.color || constantStyle.textColor737}}>{props.change >= 0 ? '+'+props.change : props.change}</span>
      </div>
      <div style={styles.total}>{props.total}</div>
      <div style={styles.description}>{props.description}</div>
    </div>
  )
}

RecentNum.propTypes = {
  change: PropTypes.number,
  total: PropTypes.number,
  description: PropTypes.string,
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
}