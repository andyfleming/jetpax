import Dependencies from "../Dependencies/Dependencies"

export interface SocketIoActions {
    emitToAll: (event: string, data?: any) => void
    emitToOthers: (event: string, data?: any) => void
    emitBack: (event: string, data?: any) => void
}

export default abstract class WebSocketEventHandler {
    constructor(
        private readonly deps: Dependencies
    ) {}

    abstract handle(data: any, sio: SocketIoActions): any
}
