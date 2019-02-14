import Command from "../Command"
import * as fs from "fs"
import * as path from 'path'
import getInput from "../../Input/getInput"
import chalk from "chalk"
import confirm from "../../Input/getConfirmation"
import {WorkspaceAlreadyRegisteredError} from "../../API/ServerApiHttp"
import api from "../../API/api"

const InitializeWorkspaceCommand: Command = {
    name: 'init',
    run: async () => {
        console.log()

        // Check if workspace.jpx.json already exists
        if (fs.existsSync('./workspace.jpx.json')) {
            console.log(chalk.yellow('workspace.jpx.json already exists'))
        } else {

            // If not, prompt for a name
            // Default to the directory (like how npm init does)
            const parentDirectory = path.basename(process.cwd())
            const name = await getInput('What would you like to name your workspace?', parentDirectory)

            fs.writeFileSync('./workspace.jpx.json', JSON.stringify({
                name,
            }))

            console.log()
            console.log(chalk.green('workspace.jpx.json created'))
        }

        console.log()

        const workspaceConfig = JSON.parse(fs.readFileSync('./workspace.jpx.json').toString())

        if (await confirm('Register workspace?')) {
            console.log()

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
        }

    },
}

export default InitializeWorkspaceCommand
