import {AnyAction, applyMiddleware, combineReducers, createStore, Store} from 'redux'
import thunk, { ThunkMiddleware } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import Dependencies from '../Dependencies/Dependencies'
import {PlatformState} from "./PlatformState/PlatformState";
import initialPlatformState from "./PlatformState/initialPlatformState";

export type SelectedProject = string | null

function selectedProject(state: SelectedProject = null, action: AnyAction) {
    switch (action.type) {
        case 'SELECT_PROJECT':
            return action.id

        case 'CLEAR_SELECTED_PROJECT':
            return null

        default:
            return state
    }
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
    selectedProject: SelectedProject
}

export default function makeStore(deps: Dependencies, initialState?: object): Store<RootState, AnyAction> {
    const rootReducer = combineReducers({
        platformState,
        selectedProject,
    })
    const middleware = composeWithDevTools(applyMiddleware(
        thunk.withExtraArgument(deps) as ThunkMiddleware<RootState, AnyAction, Dependencies>,
    ))

    return createStore(rootReducer, initialState!, middleware)
}
