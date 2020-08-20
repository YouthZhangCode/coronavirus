/**
 * @Summary: short description for the file
 * @Date: 2020/3/11 10:51 AM
 * @Author: Youth
 */
import React, { Suspense } from 'react'

const LHome = React.lazy(() => import('./home'));
const LForeign = React.lazy(() => import('./foreign'));
const LProvince = React.lazy(() => import('./province'));

function SusFuncHOC(WrappedComponent) {
  return (props) => {
    return (
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <WrappedComponent {...props}/>
        </Suspense>
      </div>
    )
  }

}

function SusClassHOC(WrappedComponent) {
  return class extends React.Component {
    render() {
      return(
        <Suspense fallback={<div>Loading...</div>}>
          <WrappedComponent {...this.props}/>
        </Suspense>
      )
    }
  }
}

const Foreign = SusClassHOC(LForeign)

const Home = SusFuncHOC(LHome), Province = SusFuncHOC(LProvince)


export {
  Home,
  Foreign,
  Province,
}