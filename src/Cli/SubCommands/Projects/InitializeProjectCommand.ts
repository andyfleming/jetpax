import Command from "../Command"
import * as fs from "fs"
import * as path from 'path'
import getInput from "../../Input/getInput"
import chalk from "chalk"
import confirm from "../../Input/getConfirmation"
import {ProjectAlreadyRegisteredError} from "../../API/ServerApiHttp"
import api from "../../API/api"

const InitializeProjectCommand: Command = {
    name: 'init',
    run: async () => {
        console.log()

        // Check if project.jpx.json already exists
        if (fs.existsSync('./project.jpx.json')) {
            console.log(chalk.yellow('project.jpx.json already exists'))
        } else {

            // If not, prompt for a name
            // Default to the directory (like how npm init does)
            const parentDirectory = path.basename(process.cwd())
            const name = await getInput('What would you like to name your project?', parentDirectory)

            fs.writeFileSync('./project.jpx.json', JSON.stringify({
                name,
            }))

            console.log()
            console.log(chalk.green('project.jpx.json created'))
        }

        console.log()

        const projectConfig = JSON.parse(fs.readFileSync('./project.jpx.json').toString())

        if (await confirm('Register project?')) {
            console.log()

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
        }

    },
}

export default InitializeProjectCommand
