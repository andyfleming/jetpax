import {Store} from "redux"
import {RootState} from "../Store/makeStore"
import Dependencies from "../Dependencies/Dependencies"
import {PlatformState} from "../Store//PlatformState/PlatformState";

export default function registerSubscribers(store: Store<RootState, any>, {ws}: Dependencies) {
    ws.on('platformStateUpdate', (data: PlatformState) => {
        console.log('web socket event RX: platformStateUpdate. Data:')
        console.log(data)
        store.dispatch({
            type: 'PLATFORM_STATE_UPDATE',
            state: data
        })
    })
}
