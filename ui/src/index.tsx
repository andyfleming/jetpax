import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import {Provider} from 'react-redux'
import App from './App/App'
import * as serviceWorker from './serviceWorker'

import 'normalize.css/normalize.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/select/lib/css/blueprint-select.css'
import 'prismjs'
import "./Docs/prism-custom.scss"
import './index.scss'

import getDefaultDependencies from "./App/Dependencies/getDefaultDependencies"
import makeStore from "./App/Store/makeStore"
import registerSubscribers from "./App/Subscriptions/registerSubscribers"
import { DependencyProvider } from './App/Dependencies/DependencyContext'

// import openSocket from 'socket.io-client'
// const socket = openSocket('http://localhost:8777')
//
// function subscribeToTimer(cb) {
//     socket.on('timer', timestamp => cb(null, timestamp))
//     socket.emit('subscribeToTimer', 1000)
// }
const deps = getDefaultDependencies()
const store = makeStore(deps)

// Register WS subscribers
registerSubscribers(store, deps)

ReactDOM.render(
    <DependencyProvider value={deps}>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </DependencyProvider>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
