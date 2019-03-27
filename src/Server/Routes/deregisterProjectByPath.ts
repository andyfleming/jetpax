import RouteHandler from "./RouteHandler";

const deregisterProjectByPath: RouteHandler = (deps) => {
    return async (req, res) => {
        // Attempt to get the ID of the project
        const existingProjects = await deps.collection('projects').getAll()

        // If not found, return a 404
        const project = existingProjects.filter(project => project.path === req.body.path)

        if (project.length === 0) {
            res.status(404)
            res.json({
                message: 'Project not found.'
            })
            return
        }

        // Otherwise, delete it
        await deps.collection('projects').delete(project[0].id)

        res.json({
            message: 'Project successfully deleted.'
        })

    }
}

export default deregisterProjectByPath
