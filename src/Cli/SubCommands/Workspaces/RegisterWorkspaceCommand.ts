import Command from "../Command"
import * as fs from "fs"
import api from "../../API/api"
import chalk from "chalk"
import {WorkspaceAlreadyRegisteredError} from "../../API/ServerApiHttp"

const RegisterWorkspaceCommand: Command = {
    name: 'register',
    requiresServer: true,
    run: async () => {
        console.log()

        if (!fs.existsSync('./workspace.jpx.json')) {
            console.log(chalk.red('workspace.jpx.json not found'))
            console.log()
            console.log(`run ${chalk.yellow('jpx init')} to generate one`)
            console.log()
            return
        }

        const workspaceConfig = JSON.parse(fs.readFileSync('./workspace.jpx.json').toString())

        try {
            await api.registerWorkspace(process.cwd(), workspaceConfig.name)

            console.log(chalk.green('workspace registered'))

        } catch (err) {
            if (err instanceof WorkspaceAlreadyRegisteredError) {
                console.log(chalk.yellow('workspace already registered'))
            } else {
                console.log(chalk.red('workspace could not be registered'))
                console.log(err.message)
            }
        }

        console.log()
    },
}

export default RegisterWorkspaceCommand
