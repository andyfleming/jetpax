import Command from "../Command"
import chalk from "chalk"
import api from "../../API/api"

const ServerStatusCommand: Command = {
    name: 'status',
    run: async () => {
        const status = (await api.serverIsOnline()) ? chalk.green('ONLINE') : chalk.red('OFFLINE')

        console.log()
        console.log(` Jetpax server status: ${status}`)
        console.log()

    }
}

export default ServerStatusCommand
