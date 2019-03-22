import RouteHandler from "./RouteHandler";

const getPid: RouteHandler = () => {
    return async (req, res) => {
        res.send(`${process.pid}`)
    }
}

export default getPid
