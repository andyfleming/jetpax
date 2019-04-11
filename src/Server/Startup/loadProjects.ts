import Dependencies from "../Dependencies/Dependencies";
import Project from "../Persistence/Entities/Project";
import {promisify} from "util"
import fs from 'fs'

const exists = promisify(fs.access)

async function loadProject(project: Project, deps: Dependencies): Promise<void> {
    const projectState = {
        id: project.id,
        path: project.path,
        name: project.name,
        notFound: await exists(project.path, fs.constants.F_OK).then(() => false).catch(() => true),
        resources: {
            services: [],
            assets: [],
        },
    }

    // Add the project (Intentionally a stateful mutation)
    deps.psm.update(state => {
        state.projects[project.id] = projectState

        return state
    })
}

export default async function loadProjects(deps: Dependencies) {
    const projects = await deps.collection('projects').getAll()
    const loadAttempts = projects.map(project => loadProject(project, deps))

    for (const attempt of loadAttempts) {
        try {
            await attempt
        } catch (err) {
            deps.logger.error(err)
        }
    }
}
