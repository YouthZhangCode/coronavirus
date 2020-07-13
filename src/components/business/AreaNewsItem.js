/**
 * @Summary: short description for the file
 * @Date: 2020/7/9 5:25 PM
 * @Author: Youth
 */
import React from 'react';

export default function AreaNewsItem(props) {
  return(
    <li style={styles.newsWrap}>
      <div style={styles.newsTextWrap}>
        <p style={styles.newsTitle}>{props.title}</p>
        <p style={styles.newsFrom}>{props.srcfrom}</p>
      </div>
      <div style={{...styles.shortcut, backgroundImage:`url(${props.shortcut})`}} />
    </li>
  )
}

const styles = {
  newsWrap: {
    display:'flex',
    justifyContent:'space-between',
    margin:'4vw 0',
  },
  newsTextWrap: {
    width:'60vw',
    display:'flex',
    flexDirection:"column",
    justifyContent:'space-between'
  },
  newsTitle: {
    fontSize:'4.267vw',
    lineHeight:'5.867vw',
    color:'#222',
    textOverflow:'ellipsis',
    overflow:'hidden',
    display:'-webkit-box',
    WebkitLineClamp: '2',
    WebkitBoxOrient: 'vertical',
  },
  newsFrom: {
    fontSize:'3.2vw',
    lineHeight:'3.2vw',
    color:'#a6a6a6',
  },

  shortcut: {
    width:'24.5vw',
    height:'16.8vw',
    marginLeft:'4vw',
    backgroundSize: 'cover',
    backgroundPosition: '50%',
    borderRadius: '1.6vw',
    display:'inline-block',
  }
}