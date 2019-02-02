import jetpaxHome from "../../Common/jetpaxHome"
import fs from "fs"
import {execSync} from "child_process"
import runShutdownTasks from "../Shutdown/runShutdownTasks"

// Convert unhandled rejections to thrown errors
process.on('unhandledRejection', function(err) {
    throw err
})

// Register shutdown tasks
process.on('SIGTERM', async () => {
    await runShutdownTasks()
})

// Create the home folder if it hasn't already been created
if (!fs.existsSync(jetpaxHome)) {

    // Make sure the directory exists first too, to be safe
    execSync(`mkdir -p ${jetpaxHome}`)

}
