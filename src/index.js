import App from "./App";

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

// 直接使用全局变量中的值
// 但是全局变量在 app 中无法得到保障

// 为了解决这个问题 定义一个方法 将所有对全局状态的修改
// 都集中在同一个地方
// 根据不同的 action 执行不同的操作
function dispatch (action) {
  switch (action.type) {
    case 'update_title':
      appState.title.text = action.text
      break;
    case 'update_content':
      appState.content.text = action.text
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

renderApp(appState)
dispatch({ type: 'update_title', text: '《React.js 小书》' })
renderApp(appState)
