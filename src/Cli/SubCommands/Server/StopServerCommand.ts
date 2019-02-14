import Command from "../Command"
import chalk from "chalk"
import api from "../../API/api"

const StopServerCommand: Command = {
    name: 'down',
    run: async () => {

        // Check that the server isn't already running
        if (!await api.serverIsOnline()) {
            console.log()
            console.log(chalk.yellow(' Server is already offline.'))
            console.log()
            return
        }

        try {
            const pid = await api.getServerPid()

            process.kill(pid)

            console.log()
            console.log(chalk.green(' Server shut down successfully.'))
            console.log()

        } catch (err) {
            console.log()
            console.log(chalk.red(' There was an error communicating to the server process'))
            console.log(` You can try running ${chalk.yellow('ps -ax | grep jetpax')} to see if it's still running.`)
            console.log()
        }

    }
}

export default StopServerCommand
