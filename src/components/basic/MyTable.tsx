/**
 * @Summary: short description for the file
 * @Date: 2020/3/27 2:01 PM
 * @Author: Youth
 */
import React, { Component } from 'react';

import moduleScss from './MyTable.module.scss';

interface MyTableHeaderProps {
  titles: any[]
}

export class MyTableHeader extends Component<MyTableHeaderProps> {

  render() {
    return(
      <table>
        <thead>
          <tr>
            {this.props.titles.map((item:any, index:number) =>
              <th className={moduleScss.blockTh} key={index} style={{...item.style}}>{item.content}</th>
            )}
          </tr>
        </thead>
      </table>
    )
  }
}

interface MyTableProps {
  headerContents: any[]
  childrenContents: any[],
  showChildren: boolean,
}

interface MyTableState {
  showChildren: boolean
}

export class MyTable extends Component<MyTableProps, MyTableState> {

  static defaultProps = {
    showChildren: false,
    headerContents: [],
    childrenContents: [],
  }

  constructor(props: MyTableProps) {
    super(props);
    this.state = {
      showChildren: props.showChildren
    }
  }

  itemClicked(){
    this.setState({
      showChildren: !this.state.showChildren
    })
  }

  render() {
    return (
      <table>
        <tbody>
          <tr
            className={moduleScss.mainTableBody}>
            {this.props.headerContents.map((item, index) => {
              if (index === 0) {
                return (
                  <th key={index} style={{...item.style}} onClick={item.onClick || this.itemClicked.bind(this)}>
                    <p className={`${moduleScss.content} ${this.state.showChildren && moduleScss.showChildren}`}>{item.content}</p>
                  </th>
                )
              } else {
                return (
                  <td key={index} style={{...item.style}} onClick={item.onClick || this.itemClicked.bind(this)}>{item.content}</td>
                )
              }
            })}
          </tr>
          {this.state.showChildren && this.props.childrenContents.map((item, index0) => {
            return(
              <tr key={index0} className={moduleScss.subTableBody}>
                {
                  item.map((item1:any, index:number) => {
                    if (index === 0) {
                      return (
                        <th key={index} style={{...item1.style}} onClick={item1.onClick}>{item1.content}</th>
                      )
                    } else {
                      return (
                        <td key={index} style={{...item1.style}} onClick={item1.onClick}>{item1.content}</td>
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