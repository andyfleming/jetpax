import WebSocketEventHandler, {SocketIoActions} from "./WebSocketEventHandler"

export default class MarcoHandler extends WebSocketEventHandler {
    handle(data: any, {emitBack}: SocketIoActions): any {
        setTimeout(() => {
            emitBack('polo')
        }, 200)
    }
}
