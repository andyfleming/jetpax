import RouteHandler from "./RouteHandler";

const getDbEntry: RouteHandler = (deps) => {
    return async (req, res) => {
        const data = await deps.kv.get(req.query.key)

        res.json({
            data,
        })
    }
}

export default getDbEntry
