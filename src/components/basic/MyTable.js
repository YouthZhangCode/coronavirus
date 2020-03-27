/**
 * @Summary: short description for the file
 * @Date: 2020/3/27 2:01 PM
 * @Author: Youth
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import moduleScss from './MyTable.module.scss';

export class MyTableHeader extends Component {

  static propTypes = {
    titles: PropTypes.array.isRequired
  }

  render() {
    return(
      <table>
        <thead>
          <tr>
            {this.props.titles.map((item, index) =>
              <th key={index} style={item.style}>{item.content}</th>
            )}
          </tr>
        </thead>
      </table>
    )
  }
}

export class MyTable extends Component {

  static propTypes = {
    headerContents: PropTypes.array.isRequired,
    childrenContents: PropTypes.array
  }

  constructor(props) {
    super(props)
    this.state = {
      showChildren: true
    }
  }

  render() {
    return (
      <table>
        <tbody style={{width: '100vw'}}>
        <tr style={{width: '100%', background: 'red'}}>
          {this.props.headerContents.map((item, index) => {
            if (index === 0) {
              return (
                <th key={index} style={item.style} onClick={item.onClick}>{item.content}</th>
              )
            } else {
              return (
                <td key={index} style={item.style} onClick={item.onClick}>{item.content}</td>
              )
            }
          })}
        </tr>
        {this.state.showChildren && this.props.childrenContents.map((item, index0) => {
          return(
            <tr key={index0} style={{width: '100%'}}>
              {
                item.map((item1, index) => {
                  if (index === 0) {
                    return (
                      <th key={index} style={item1.style} onClick={item1.onClick}>{item1.content}</th>
                    )
                  } else {
                    return (
                      <td key={index} style={item1.style} onClick={item1.onClick}>{item1.content}</td>
                    )
                  }
                })
              }
            </tr>
          )
        })}
        </tbody>
      </table>
    )
  }
}