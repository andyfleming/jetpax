import express from 'express'
import path from 'path'
import {Server} from 'http'
import socketIo from 'socket.io'
import Dependencies from "./Dependencies/Dependencies"

const makeServer = async (deps: Dependencies) => {
    const app = express()
    const server = new Server(app)
    const io = socketIo(server)

    // HTTP API Routes
    // ------------------------------------------------------------------------------------

    // Log API calls
    app.use('/api/*', (req, res, next) => {

        const onResFinished = function() {
            // @ts-ignore
            this.removeListener('finish', onResFinished)
            // @ts-ignore
            if (res.statusCode > 500) {
                deps.logger.error(`Response: ${res.statusCode} ${req.method}: ${req.url}`)
            } else if (res.statusCode >= 400) {
                deps.logger.warn(`Response: ${res.statusCode} ${req.method}: ${req.url}`)
            } else {
                deps.logger.info(`Response: ${res.statusCode} ${req.method}: ${req.url}`)
            }
        }

        const onResError = function() {
            // @ts-ignore
            this.removeListener('error', onResError)
            // @ts-ignore
            deps.logger.warn(`Response Error: ${req.method}: ${req.url}`)
        }

        deps.logger.info(`Request: ${req.method}: ${req.originalUrl}`)
        res.on('finish', onResFinished)
        res.on('error', onResError)
        next()
    })

    app.get('/api/online', (req, res) => {
        res.send('Jetpax Server API Online')
    })

    app.get('/api/pid', (req, res) => {
        res.send(`${process.pid}`)
    })

    app.all('/api/*', (req, res) => {
        res.sendStatus(404)
    })

    // Web Socket Routes
    // ------------------------------------------------------------------------------------

    // REMINDERS
    // https://socket.io/docs/emit-cheatsheet/

    setInterval(() => {
        deps.logger.info('emitting boop')
        io.emit('boop', { boop: 'yeah' })
    }, 970)

    io.on('connection', function(socket) {

        deps.logger.info({
            'socket.id': socket.id,
        }, `A user connected via websockets`)

        socket.on('disconnect', function(){
            deps.logger.info({
                'socket.id': socket.id,
            }, `A user disconnected via websockets`)
        })

        socket.on('marco', () => {
            deps.logger.info(`WS Event: marco`)
            setTimeout(() => {
                socket.emit('polo')
            }, 200)
        })

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
