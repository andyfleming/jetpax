import RouteHandler from "./RouteHandler";

const getProjects: RouteHandler = (deps) => {
    return async (req, res) => {
        const projects = await deps.collection('projects').getAll()

        res.json({
            data: projects,
        })
    }
}

export default getProjects
