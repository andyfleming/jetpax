import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import {Server} from 'http'
import socketIo from 'socket.io'
import Dependencies from "./Dependencies/Dependencies"
import requestLoggerMiddleware from "./Logging/requestLoggerMiddleware"
import WebSocketEventHandler from "./EventHandlers/WebSocketEventHandler"
import MarcoHandler from "./EventHandlers/MarcoHandler"

const makeServer = async (deps: Dependencies) => {
    const app = express()
    const server = new Server(app)
    const io = socketIo(server)

    app.use(bodyParser.json())
    // app.use(bodyParser.urlencoded({ extended: false }))

    // HTTP API Routes
    // ------------------------------------------------------------------------------------

    // Log API calls
    app.use('/api/*', requestLoggerMiddleware(deps.logger))

    app.get('/api/online', (req, res) => {
        res.send('Jetpax Server API Online')
    })

    app.get('/api/pid', (req, res) => {
        res.send(`${process.pid}`)
    })

    app.get('/api/workspaces', async (req, res) => {
        const workspaces = await deps.collection('workspaces').getAll()

        res.json({
            data: workspaces,
        })
    })

    app.post('/api/workspaces', async (req, res) => {

        const existingWorkspaces = await deps.collection('workspaces').getAll()
        const workspaceAlreadyRegistered = (existingWorkspaces.filter(workspace => workspace.path === req.body.path).length > 0)

        if (workspaceAlreadyRegistered) {
            res.status(409)
            res.json({
                message: 'Workspace already registered'
            })
            return
        }

        await deps.collection('workspaces').insert({
            name: req.body.name,
            path: req.body.path,
        })

        res.json({
            message: 'Workspace successfully registered.',
        })
    })

    app.post('/api/workspaces/delete-by-path', async (req, res) => {
        // Attempt to get the ID of the workspace
        const existingWorkspaces = await deps.collection('workspaces').getAll()

        // If not found, return a 404
        const workspace = existingWorkspaces.filter(workspace => workspace.path === req.body.path)

        if (workspace.length === 0) {
            res.status(404)
            res.json({
                message: 'Workspace not found.'
            })
            return
        }

        // Otherwise, delete it
        await deps.collection('workspaces').delete(workspace[0].id)

        res.json({
            message: 'Workspace successfully deleted.'
        })

    })

    app.all('/api/*', (req, res) => {
        res.sendStatus(404)
    })

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

    setInterval(() => {
        emitToAll('boop', { boop: 'yeah' })
    }, 3710)


    io.on('connection', function(socket) {

        deps.logger.debug({
            'socketId': socket.id,
        }, `A user connected via websockets`)

        socket.on('disconnect', function(){
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
    app.get('*', (req, res) =>{
        res.sendFile(path.join(process.cwd(), 'ui/build/index.html'))
    })

    return server
}

export default makeServer
