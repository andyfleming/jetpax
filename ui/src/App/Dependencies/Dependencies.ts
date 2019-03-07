import ApiClient from './ApiClient'

export default interface Dependencies {
    ws: SocketIOClient.Socket
    api: ApiClient
}
