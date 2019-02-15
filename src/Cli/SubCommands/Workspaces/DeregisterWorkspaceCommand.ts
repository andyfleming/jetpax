import Command from "../Command"
import * as fs from "fs"
import chalk from "chalk"
import api from "../../API/api"
import {WorkspaceNotFoundError} from "../../API/ServerApiHttp"

const DeregisterWorkspaceCommand: Command = {
    name: 'deregister',
    run: async () => {
        console.log()

        if (!fs.existsSync('./workspace.jpx.json')) {
            console.log(chalk.red('Must be ran from a directory with a workspace.jpx.json file.'))
            console.log()
            return
        }

        try {
            await api.deregisterWorkspace(process.cwd())

            console.log(chalk.green('workspace deregistered'))

        } catch (err) {
            if (err instanceof WorkspaceNotFoundError) {
                console.log(chalk.yellow('workspace not found'))
            } else {
                console.log(chalk.red('workspace could not be deregistered'))
                console.log(err.message)
            }
        }

        console.log()
    },
}

export default DeregisterWorkspaceCommand
