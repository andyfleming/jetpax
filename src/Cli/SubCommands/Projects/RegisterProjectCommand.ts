import Command from "../Command"
import * as fs from "fs"
import api from "../../API/api"
import chalk from "chalk"
import {ProjectAlreadyRegisteredError} from "../../API/ServerApiHttp"

const RegisterProjectCommand: Command = {
    name: 'register',
    requiresServer: true,
    run: async () => {
        console.log()

        if (!fs.existsSync('./project.jpx.json')) {
            console.log(chalk.red('project.jpx.json not found'))
            console.log()
            console.log(`run ${chalk.yellow('jpx init')} to generate one`)
            console.log()
            return
        }

        const projectConfig = JSON.parse(fs.readFileSync('./project.jpx.json').toString())

        try {
            await api.registerProject(process.cwd(), projectConfig.name)

            console.log(chalk.green('project registered'))

        } catch (err) {
            if (err instanceof ProjectAlreadyRegisteredError) {
                console.log(chalk.yellow('project already registered'))
            } else {
                console.log(chalk.red('project could not be registered'))
                console.log(err.message)
            }
        }

        console.log()
    },
}

export default RegisterProjectCommand
