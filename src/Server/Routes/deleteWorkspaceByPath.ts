import RouteHandler from "./RouteHandler";

const deleteWorkspaceByPath: RouteHandler = (deps) => {
    return async (req, res) => {
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

    }
}

export default deleteWorkspaceByPath
