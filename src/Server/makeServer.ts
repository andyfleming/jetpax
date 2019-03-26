import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import {Server} from 'http'
import socketIo from 'socket.io'
import cors from 'cors'
import Dependencies from "./Dependencies/Dependencies"
import requestLoggerMiddleware from "./Logging/requestLoggerMiddleware"
import WebSocketEventHandler from "./EventHandlers/WebSocketEventHandler"
import MarcoHandler from "./EventHandlers/MarcoHandler"
import getPid from "./Routes/getPid"
import getWorkspaces from "./Routes/getWorkspaces"
import getOnlineStatus from "./Routes/getOnlineStatus"
import getDbKeys from "./Routes/getDbKeys"
import getDbEntry from "./Routes/getDbEntry"
import createWorkspace from "./Routes/createWorkspace"
import deleteWorkspaceByPath from "./Routes/deleteWorkspaceByPath"

const makeServer = async (deps: Dependencies) => {
    const app = express()
    const server = new Server(app)
    const io = socketIo(server)

    // Handle CORS
    app.use(cors())
    app.options('*', cors())

    // Body parsing...
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))

    // Log API calls
    app.use('/api/*', requestLoggerMiddleware(deps.logger))

    // HTTP API Routes
    // ------------------------------------------------------------------------------------

    app.get('/api/online', getOnlineStatus(deps))
    app.get('/api/pid', getPid(deps))
    app.get('/api/workspaces', getWorkspaces(deps))
    app.get('/api/db/keys', getDbKeys(deps))
    app.get('/api/db/entry', getDbEntry(deps))
    app.post('/api/workspaces', createWorkspace(deps))
    app.post('/api/workspaces/delete-by-path', deleteWorkspaceByPath(deps))

    // Fall back to a 404 if we are in the /api path
    app.all('/api/*', (req, res) => { res.sendStatus(404) })

    // Web Socket Routes
    // ------------------------------------------------------------------------------------

    // REMINDERS
    // https://socket.io/docs/emit-cheatsheet/

    const emitToAll = (eventName: string, data: any) => {
        deps.logger.info(`WS to all: "${eventName}"`)
        io.emit(eventName, data)
    }

    function socketOn(socket: socketIo.Socket, eventName: string, handler: WebSocketEventHandler) {
        socket.on(eventName, (data: any) => {
            deps.logger.info(`WS from user: "${eventName}"`)
            handler.handle(data, {
                emitToAll,
                emitToOthers: (eventName: string, data: any) => {
                    deps.logger.info(`WS to others: "${eventName}"`)
                    socket.broadcast.emit(eventName, data)
                },
                emitBack: (eventName: string, data: any) => {
                    deps.logger.info(`WS to user: "${eventName}"`)
                    socket.emit(eventName, data)
                },
            })
        })
    }

    deps.psm.onUpdate((newState) => {
        emitToAll('platformStateUpdate', newState)
    })

    setInterval(() => {
        deps.psm.update(state => ({
            ...state,
            count: state.count + 1,
        }))
    }, 3000)

    io.on('connection', function(socket) {

        deps.logger.debug({
            'socketId': socket.id,
        }, `A user connected via websockets`)

        socket.on('disconnect', function() {
            deps.logger.debug({
                'socketId': socket.id,
            }, `A user disconnected via websockets`)
        })

        socketOn(socket, 'marco', new MarcoHandler(deps))

    })

    // Static and fallback Routes
    // ------------------------------------------------------------------------------------

    // Serve static files
    app.use(express.static(path.join(process.cwd(), 'ui/build')))

    // Fallback for rewrite to index.html
    app.get('*', (req, res) => {
        res.sendFile(path.join(process.cwd(), 'ui/build/index.html'))
    })

    return server
}

export default makeServer
