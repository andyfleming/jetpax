#! /usr/bin/env node

const carlo = require('carlo')
const daemonizeProcess = require('daemonize-process')
const fs = require('fs')
const path = require('path')

console.log('Hello from Jetpax in TypeScript')

// TODO: we may want to make sure the server is running before we start the UI

daemonizeProcess()

async function run() {
    const icon = fs.readFileSync(path.join(__dirname, '../../ui/public/jetpax-app-icon.png'))
    const options = {
        channel: 'r626762', // ( Version 71.0.3578.98 looked up on http://omahaproxy.appspot.com/ )
        icon,
        title: 'Jetpax',
    }

    // Launch the browser.
    const app = await carlo.launch(options)

    // Terminate Node.js process on app window closing.
    app.on('exit', () => process.exit())

    // Navigate to the main page of your app.
    await app.load('http://localhost:8777')

}

run()
