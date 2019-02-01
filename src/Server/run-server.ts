import './Startup/preflight'
import makeServer from './makeServer'
import getDependencies from "./Dependencies/getDependencies"

async function runServer() {
    const deps = await getDependencies()
    const server = await makeServer(deps)

    server.listen(8777, () => {
        console.log('Listening on 8777')
    })

}

runServer()
