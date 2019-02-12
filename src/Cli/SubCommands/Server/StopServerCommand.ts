import Command from "../Command"
import serverIsOnline from "../../Telemetry/serverIsOnline"
import chalk from "chalk"
import getServerPid from "../../Telemetry/getServerPid"

const StopServerCommand: Command = {
    name: 'down',
    run: async () => {

        // Check that the server isn't already running
        if (!await serverIsOnline()) {
            console.log()
            console.log(chalk.yellow(' Server is already offline.'))
            console.log()
            return
        }

        try {
            const pid = await getServerPid()

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
