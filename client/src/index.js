import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery'
import 'popper.js'
import 'bootstrap/dist/js/bootstrap.bundle.min'

import './css/style.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

import configureStore from './store/store'
import { startSaveUser, removeUser } from "./actions/user"

const store = configureStore()
store.subscribe(() => {
    console.log(store.getState())
})

localStorage.getItem('token') ? store.dispatch(startSaveUser(JSON.parse(localStorage.getItem('token')))) : store.dispatch(removeUser())

const app = (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'))
serviceWorker.unregister()