import {Logger} from "pino"
import * as express from 'express'

const requestLoggerMiddleware = (logger: Logger) => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {

        const onResFinished = function() {
            // @ts-ignore
            this.removeListener('finish', onResFinished)
            // @ts-ignore
            if (res.statusCode > 500) {
                logger.error(`Response: ${res.statusCode} ${req.method}: ${req.url}`)
            } else if (res.statusCode >= 400) {
                logger.warn(`Response: ${res.statusCode} ${req.method}: ${req.url}`)
            } else {
                logger.info(`Response: ${res.statusCode} ${req.method}: ${req.url}`)
            }
        }

        const onResError = function() {
            // @ts-ignore
            this.removeListener('error', onResError)
            // @ts-ignore
            logger.warn(`Response Error: ${req.method}: ${req.url}`)
        }

        logger.info(`Request: ${req.method}: ${req.originalUrl}`)
        res.on('finish', onResFinished)
        res.on('error', onResError)
        next()
    }
}

export default requestLoggerMiddleware
