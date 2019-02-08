import {Store} from "redux"
import {RootState} from "../Store/makeStore"
import Dependencies from "../Dependencies/Dependencies"

export default function registerSubscribers(store: Store<RootState, any>, {ws}: Dependencies) {
    ws.on('connect', () => {

        ws.on('polo', () => {
            store.dispatch({
                type: 'RX_POLO',
            })
            setTimeout(() => {
                store.dispatch({
                    type: 'RX_POLO_OVER',
                })
            }, 300)
        })
        ws.on('boop', () => {
            store.dispatch({
                type: 'RX_BOOP',
            })
            setTimeout(() => {
                store.dispatch({
                    type: 'RX_BOOP_OVER',
                })
            }, 300)
        })

        setInterval(() => {
            ws.emit('marco', {data: true})
            store.dispatch({
                type: 'TX_MARCO',
            })
            setTimeout(() => {
                store.dispatch({
                    type: 'TX_MARCO_OVER',
                })
            }, 300)
        }, 2370)
    })
}
