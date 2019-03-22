import _ from 'lodash'
import RouteHandler from "./RouteHandler"

const createWorkspace: RouteHandler = (deps) => {
    return async (req, res) => {

        const path = _.trimEnd(req.body.path, '/')
        const name = req.body.name
        const existingWorkspaces = await deps.collection('workspaces').getAll()
        const workspaceAlreadyRegistered = (existingWorkspaces.filter(workspace => workspace.path === path).length > 0)

        if (workspaceAlreadyRegistered) {
            res.status(409)
            res.json({
                message: 'Workspace already registered',
            })
            return
        }

        if (!path) {
            res.status(400)
            res.json({
                message: 'Workspace path cannot be blank',
            })
            return
        }

        if (!_.startsWith(path, '/')) {
            res.status(400)
            res.json({
                message: 'Workspace path must be an absolute path starting with "/"',
            })
            return
        }

        // TODO: consider validating that the workspace directory exists

        if (!name) {
            res.status(400)
            res.json({
                message: 'Workspace name cannot be blank',
            })
            return
        }

        await deps.collection('workspaces').insert({
            name,
            path,
        })

        res.json({
            message: 'Workspace successfully registered.',
        })
    }
}

export default createWorkspace
