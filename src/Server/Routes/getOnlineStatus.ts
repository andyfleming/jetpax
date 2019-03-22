import RouteHandler from "./RouteHandler";

const getOnlineStatus: RouteHandler = (deps) => {
    return async (req, res) => {
        res.send('Jetpax Server API Online')
    }
}

export default getOnlineStatus
