export default interface Dependencies {
    ws: SocketIOClient.Socket
    getDbKeys: () => Promise<string[]>
}
