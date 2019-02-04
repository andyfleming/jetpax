import { applyMiddleware, combineReducers, createStore, Store } from 'redux'
import thunk, { ThunkMiddleware } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import Dependencies from '../Dependencies/Dependencies'

type WebSocketActivityState = {
    request: boolean
    reply: boolean
    event: boolean
}

const initialWebSocketActivityState: WebSocketActivityState = {
    request: false,
    reply: false,
    event: false,
}

function webSocketActivity(state: WebSocketActivityState = initialWebSocketActivityState, action: any): WebSocketActivityState {
    switch (action.type) {
        case 'TX_MARCO':
            return {
                ...state,
                request: true,
            }
        case 'TX_MARCO_OVER':
            return {
                ...state,
                request: false,
            }
        case 'RX_POLO':
            return {
                ...state,
                reply: true,
            }
        case 'RX_POLO_OVER':
            return {
                ...state,
                reply: false,
            }
        case 'RX_BOOP':
            return {
                ...state,
                event: true,
            }
        case 'RX_BOOP_OVER':
            return {
                ...state,
                event: false,
            }
    }

    return state
}

export type RootState = {
    webSocketActivity: WebSocketActivityState
}

export type ActionResults = any

export default function makeStore(deps: Dependencies, initialState?: object): Store<RootState, ActionResults> {
    const rootReducer = combineReducers({
        webSocketActivity,
    })
    const middleware = composeWithDevTools(applyMiddleware(
        thunk.withExtraArgument(deps) as ThunkMiddleware<RootState, ActionResults, Dependencies>,
    ))

    return createStore(rootReducer, initialState!, middleware)
}
