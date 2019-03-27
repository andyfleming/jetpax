import _ from 'lodash'
import RouteHandler from "./RouteHandler"

const registerProject: RouteHandler = (deps) => {
    return async (req, res) => {

        const path = _.trimEnd(req.body.path, '/')
        const name = req.body.name
        const existingProjects = await deps.collection('projects').getAll()
        const projectAlreadyRegistered = (existingProjects.filter(project => project.path === path).length > 0)

        if (projectAlreadyRegistered) {
            res.status(409)
            res.json({
                message: 'Project already registered',
            })
            return
        }

        if (!path) {
            res.status(400)
            res.json({
                message: 'Project path cannot be blank',
            })
            return
        }

        if (!_.startsWith(path, '/')) {
            res.status(400)
            res.json({
                message: 'Project path must be an absolute path starting with "/"',
            })
            return
        }

        // TODO: consider validating that the project directory exists

        if (!name) {
            res.status(400)
            res.json({
                message: 'Project name cannot be blank',
            })
            return
        }

        await deps.collection('projects').insert({
            name,
            path,
        })

        res.json({
            message: 'Project successfully registered.',
        })
    }
}

export default registerProject
