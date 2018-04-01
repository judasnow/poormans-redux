import React, { Component } from 'react';
import './App.css';

import {createStore} from './redux'
import {connect} from './redux-react'

const themeReducer = (state, action) => {
  if (!state) return {
    themeColor: 'blue'
  }
  switch (action.type) {
    case 'CHANGE_COLOR':
      return { ...state, themeColor: action.themeColor }
    default:
      return state
  }
}

class Header extends Component {
  // static contextTypes = {
  //   store: () => {}
  // }

  // contextTypes = {
  //   themeColor: () => true
  // }

  constructor () {
    super()
    // this.state = { themeColor: '' }
  }

  // componentWillMount () {
  //   this._updateThemeColor()
  // }
  //
  // _updateThemeColor () {
  //   // 使用 context 中的状态设置自己的状态
  //   const { store } = this.context
  //   const state = store.getState()
  //   console.dir(store)
  //   this.setState({ themeColor: state.themeColor })
  // }

  render () {
    return <div>header: {this.props.themeColor}</div>
  }
}

let mapStateToProps = (state, ownProps) => {
  return {
    themeColor: state.themeColor
  }
}
let HeaderCon = connect(mapStateToProps)(Header)

const store = createStore(themeReducer)

class WrapNode extends Component {
  static childContextTypes = {
    store: () => true
  }

  constructor () {
    super()
  }

  getChildContext() {
    return {store: store};
  }

  render () {
    return <div>{this.props.children}</div>
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <WrapNode>
          <HeaderCon />
        </WrapNode>
      </div>
    );
  }
}

export default App;
