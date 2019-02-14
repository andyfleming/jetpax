import chalk from "chalk"
import opn from 'opn'
import Command from "../Command"
import serverUrl from "../../../Common/serverUrl"
import api from "../../API/api"

const OpenWebUiCommand: Command = {
    name: 'web',
    run: async () => {
        // Make sure the server is running before we start the UI
        if (!await api.serverIsOnline()) {
            console.log()
            console.log(chalk.red(' Server offline!'))
            console.log(' Not starting UI.')
            console.log()
            console.log(` Run ${chalk.yellow('jpx up')} to start the server.`)
            console.log()

            process.exit(1)
            return
        }

        console.log()
        console.log(chalk.yellow(' Opening Jetpax UI in browser...'))
        console.log()

        await opn(serverUrl)

        console.log(`${chalk.green(' Dashboard site opened successfully.')} `)
        console.log()

    }
}

export default OpenWebUiCommand
