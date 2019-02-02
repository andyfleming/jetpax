import express from 'express'
import path from 'path'
import Dependencies from "./Dependencies/Dependencies"

const makeServer = async (deps: Dependencies) => {
    const server = express()

    // API Routes
    // ------------------------------------------------------------------------------------

    // Log API calls
    server.use('/api/*', (req, res, next) => {

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

    server.get('/api/online', (req, res) => {
        res.send('Jetpax Server API Online')
    })

    server.get('/api/pid', (req, res) => {
        res.send(`${process.pid}`)
    })

    server.all('/api/*', (req, res) => {
        res.sendStatus(404)
    })

    // ------------------------------------------------------------------------------------

    // Serve static files
    server.use(express.static(path.join(process.cwd(), 'ui/build')))

    // Fallback for rewrite to index.html
    server.get('*', (req, res) =>{
        res.sendFile(path.join(process.cwd(), 'ui/build/index.html'))
    })

    return server
}

export default makeServer
