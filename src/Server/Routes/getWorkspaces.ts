import RouteHandler from "./RouteHandler";

const getWorkspaces: RouteHandler = (deps) => {
    return async (req, res) => {
        const workspaces = await deps.collection('workspaces').getAll()

        res.json({
            data: workspaces,
        })
    }
}

export default getWorkspaces
