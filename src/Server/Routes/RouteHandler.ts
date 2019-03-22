import express from 'express'
import Dependencies from "../Dependencies/Dependencies";

export default interface RouteHandler {
    (deps: Dependencies): (req: express.Request, res: express.Response) => void
}
