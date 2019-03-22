import RouteHandler from "./RouteHandler";

const getDbKeys: RouteHandler = (deps) => {
    return async (req, res) => {
        res.json({
            data: await deps.kv.getAllKeys()
        })
    }
}

export default getDbKeys
