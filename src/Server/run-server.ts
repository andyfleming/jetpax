import './Startup/preflight'
import makeServer from './makeServer'
import getDependencies from "./Dependencies/getDependencies"
import serverPort from "../Common/serverPort"

async function runServer() {
    const deps = await getDependencies()
    const server = await makeServer(deps)

    server.listen(serverPort, () => {
        deps.logger.info(`Listening on ${serverPort}`)
    })

}

runServer()
