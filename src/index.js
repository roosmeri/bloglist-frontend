import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import './index.css'
import App from './App'
import { createStore, applyMiddleware } from 'redux'
import notificationReducer from './reducers/notificationReducer'


const store = createStore(
  notificationReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'))