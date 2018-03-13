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

// 这里不再使用全局的 state
function stateChanger (state, action) {
  switch (action.type) {
    case 'update_title':
      state.title.text = action.text
      break;
    case 'update_content':
      state.content.text = action.text
      break;
  }
}

function renderApp (appState) {
  renderTitle(appState.title)
  renderContent(appState.content)
}

function renderTitle (title) {
  const titleDOM = document.getElementById('title')
  titleDOM.innerHTML = title.text
  titleDOM.style.color = title.color
}

function renderContent (content) {
  const contentDOM = document.getElementById('content')
  contentDOM.innerHTML = content.text
  contentDOM.style.color = content.color
}

// 添加一个方法用来生成
function createStore (state, stateChanger) {
  const listeners = []
  const subscribe = function (listener) {
    listeners.push(listener)
  }
  const getState = function () {
    return state
  }
  const dispatch = function (action) {
    stateChanger(state, action)
    listeners.forEach((l) => {
      l()
    })
  }
  return {
    getState: getState,
    dispatch: dispatch,
    subscribe: subscribe
  }
}

let store = createStore(appState, stateChanger)
store.subscribe(() => {
  renderApp(store.getState())
})
renderApp(store.getState())
store.dispatch({
  type: 'update_text',
  text: '1024'
})
