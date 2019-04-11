import startTimer from "../Common/Timing/startTimer"

const getDuration = startTimer()
import './Startup/preflight'
import makeServer from './makeServer'
import getDependencies from "./Dependencies/getDependencies"
import serverPort from "../Common/serverPort"
import loadProjects from "./Startup/loadProjects";

process.on('unhandledRejection', (err) => {
    throw err
})

async function runServer() {

    // Construct the dependencies
    const deps = await getDependencies()

    // Configure the server
    const server = await makeServer(deps)

    // Load/calculate the initial platform state (Asynchronously)
    loadProjects(deps)

    // TODO: start intervals

    // Start listening
    server.listen(serverPort, () => {
        deps.logger.debug(`Server started in ${getDuration()} ms`)
        deps.logger.info(`Listening on ${serverPort}`)
    })

}

runServer()
