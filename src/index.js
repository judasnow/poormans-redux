const appState = {
  title: {
    text: 'title1',
    color: 'red'
  },
  content: {
    text: 'text2',
    color: 'blue'
  }
}

// 这里创建一个新的对象 代替在原有对象上的修改 以方便检测状态的修改
function stateChanger (state, action) {
  switch (action.type) {
    case 'update_title':
      return {
        ...state,
        title: {
          ...state.title,
          text: action.text
        }
      }
      break;
    case 'update_content':
      return {
        ...state,
        content: {
          ...state.content,
          // 会覆盖同名的属性
          text: action.text
        }
      }
      break;
    default:
      return state
  }
}

function renderApp (appState, oldAppState = {}) {
  if (appState === oldAppState) {
    return
  }
  console.log('render all app')
  renderTitle(appState.title)
  renderContent(appState.content)
}

function renderTitle (title, oldTitle = '') {
  if (title === oldTitle) {
    return
  }
  console.log('render title')
  const titleDOM = document.getElementById('title')
  titleDOM.innerHTML = title.text
  titleDOM.style.color = title.color
}

function renderContent (content, oldContent = '') {
  if (content === oldContent) {
    return
  }
  console.log('render content')
  const contentDOM = document.getElementById('content')
  contentDOM.innerHTML = content.text
  contentDOM.style.color = content.color
}

// 添加一个方法用来生成 store 对象
function createStore (state, stateChanger) {
  const listeners = []
  const subscribe = function (listener) {
    listeners.push(listener)
  }
  const getState = function () {
    return state
  }
  const dispatch = function (action) {
    state = stateChanger(state, action)
    listeners.forEach((l) => {
      l()
    })
  }
  return {
    getState,
    dispatch,
    subscribe
  }
}

let store = createStore(appState, stateChanger)
let oldState = store.getState()
store.subscribe(() => {
  const newState = store.getState()
  renderApp(newState, oldState)
  oldState = newState
})
renderApp(store.getState())
store.dispatch({
  type: 'update_title',
  text: '10241s'
})
