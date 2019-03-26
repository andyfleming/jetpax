import {AnyAction, applyMiddleware, combineReducers, createStore, Store} from 'redux'
import thunk, { ThunkMiddleware } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import Dependencies from '../Dependencies/Dependencies'
import {PlatformState} from "./PlatformState/PlatformState";
import initialPlatformState from "./PlatformState/initialPlatformState";

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

function webSocketActivity(state: WebSocketActivityState = initialWebSocketActivityState, action: AnyAction): WebSocketActivityState {
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


function platformState(state: PlatformState = initialPlatformState, action: AnyAction) {
    if (action.type === 'PLATFORM_STATE_UPDATE') {
        console.log('dispatched action "PLATFORM_STATE_UPDATE" found with data:')
        console.log(action.state)
        return action.state
    }

    return state
}

export type RootState = {
    platformState: PlatformState
    webSocketActivity: WebSocketActivityState
}

export default function makeStore(deps: Dependencies, initialState?: object): Store<RootState, AnyAction> {
    const rootReducer = combineReducers({
        platformState,
        webSocketActivity,
    })
    const middleware = composeWithDevTools(applyMiddleware(
        thunk.withExtraArgument(deps) as ThunkMiddleware<RootState, AnyAction, Dependencies>,
    ))

    return createStore(rootReducer, initialState!, middleware)
}
