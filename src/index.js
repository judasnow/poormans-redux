import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Header from './Header'
import Content from './Content'
import PropTypes from 'prop-types'
import './index.css'

function createStore (reducer) {
  let state = null
  const listeners = []
  const subscribe = function (listener) {
    listeners.push(listener)
  }
  const getState = function () {
    return state
  }
  const dispatch = function (action) {
    state = reducer(state, action)
    listeners.forEach((listener) => listener())
  }
  dispatch({})
  return {
    getState,
    dispatch,
    subscribe
  }
}

const themeReducer = function(state, action) {
  if (!state) {
    return {
      themeColor: 'red'
    }
  }
  switch (action.type) {
    case 'change_color':
      return {
        ...state,
        themeColor: action.themeColor
      }
    default:
      return state
  }
}

const store = createStore(themeReducer)

class Index extends Component {
  static childContextTypes = {
    store: PropTypes.object
  }

  getChildContext () {
    return { store }
  }

  render () {
    return (
      <div>
        <Header/>
        <Content/>
      </div>
    )
  }
}

ReactDOM.render(
  <Index/>,
  document.getElementById('root')
)
