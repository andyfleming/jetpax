import {spawn} from 'child_process'
import Command from "../Command"
import chalk from "chalk"
import path from "path"
import api from "../../API/api"

const StartServerCommand: Command = {
    name: 'up',
    run: async () => {

        // Check that the server isn't already running
        if (await api.serverIsOnline()) {
            console.log()
            console.log(chalk.yellow(' Server is already online.'))
            console.log()
            return
        }

        // Detect if we are in the dev environment (running via ts-node)
        const inDev = (process.env.NODE_ENV === 'development')

        // If we are in ts-node we'll want to use the ts file under development
        const extension = (inDev) ? 'ts' : 'js'
        const script = path.join(__dirname, `../../Server/run-server.${extension}`)

        // If we are running with ts-node, we'll need to spawn the ts script with ts-node as well
        const args = (inDev) ? ['-r', 'ts-node/register', script] : [script]

        // Spawn in background and pipe output to log file
        spawn(process.execPath, args, {
            cwd: path.join(__dirname, '../../../'),
            detached: true,
            stdio: 'ignore',
            env: {
                ...process.env,
                NODE_ENV: (inDev) ? 'development' : 'production',
                RUN_CONTEXT: 'background',
            }
        })

        console.log()
        console.log(chalk.yellow(' Starting server in background...'))
        console.log()
        console.log(' (This may take a few moments, even after this command exits)')
        console.log()

        process.exit(0)

    }
}

export default StartServerCommand
