import chalk from "chalk"
import opn from 'opn'
import Command from "../Command"
import serverIsOnline from "../../Telemetry/serverIsOnline"

const OpenWebUiCommand: Command = {
    name: 'web',
    run: async () => {
        // Make sure the server is running before we start the UI
        if (!await serverIsOnline()) {
            console.log()
            console.log(chalk.red(' Server offline!'))
            console.log(' Not starting UI.')
            console.log()
            console.log(` Run ${chalk.yellow('jpx up')} to start the server.`)
            console.log()
            return
        }

        console.log()
        console.log(chalk.yellow(' Opening Jetpax UI in browser...'))
        console.log()

        await opn('http://localhost:8777')

        console.log(`${chalk.green(' Dashboard site opened successfully.')} `)
        console.log()

    }
}

export default OpenWebUiCommand
