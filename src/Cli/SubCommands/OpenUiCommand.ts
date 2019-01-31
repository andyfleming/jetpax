import axios from 'axios'
const daemonizeProcess = require('daemonize-process')
import Command from "./Command"
import fs from "fs"
import path from "path"
import chalk from "chalk"
const carlo = require('carlo')


async function serverIsOnline() {
    try {
        const response = await axios.get("http://localhost:8777/api/online")

        return (response.data === 'Jetpax Server API Online')
    } catch (err) {
        return false
    }
}

const OpenUiCommand: Command = {
    name: 'ui',
    run: async () => {
        // Make sure the server is running before we start the UI
        if (!serverIsOnline()) {
            console.log()
            console.log('Server is not online! Not starting UI.')
            console.log()
            console.log('Run "jpx up" to start the server.')
            console.log()
            return
        }

        console.log()
        console.log(chalk.yellow(' Opening Jetpax UI...'))
        console.log()

        const icon = fs.readFileSync(path.join(__dirname, '../../../ui/public/jetpax-app-icon.png'))
        const options = {
            channel: 'r626762', // ( Version 71.0.3578.98 looked up on http://omahaproxy.appspot.com/ )
            icon,
            title: 'Jetpax',
        }

        // Launch the browser.
        const app = await carlo.launch(options)

        // Terminate Node.js process on app window closing.
        app.on('exit', () => process.exit())

        // Navigate to the Jetpax App/API server
        await app.load('http://localhost:8777')

        console.log(`${chalk.green(' Dashboard app opened successfully.')} `)
        console.log(' Close the app window or end this process to close.')
        console.log()

    }
}

export default OpenUiCommand
