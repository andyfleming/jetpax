import Command from "../Command"
import * as fs from "fs"
import chalk from "chalk"
import api from "../../API/api"
import {ProjectNotFoundError} from "../../API/ServerApiHttp"

const DeregisterProjectCommand: Command = {
    name: 'deregister',
    run: async () => {
        console.log()

        if (!fs.existsSync('./project.jpx.json')) {
            console.log(chalk.red('Must be ran from a directory with a project.jpx.json file.'))
            console.log()
            return
        }

        try {
            await api.deregisterProject(process.cwd())

            console.log(chalk.green('project deregistered'))

        } catch (err) {
            if (err instanceof ProjectNotFoundError) {
                console.log(chalk.yellow('project not found'))
            } else {
                console.log(chalk.red('project could not be deregistered'))
                console.log(err.message)
            }
        }

        console.log()
    },
}

export default DeregisterProjectCommand
