import jetpaxHome from "../../Common/jetpaxHome"
import fs from "fs"
import {execSync} from "child_process"
import Logger from "../Logging/Logger"
import FileLogger from "../Logging/FileLogger"
import ConsoleLogger from "../Logging/ConsoleLogger"

async function getFileLogger() {
    const logFilePath = `${jetpaxHome}/logs/server/server.log`

    // Start the log file if it doesn't already exists
    if (!fs.existsSync(logFilePath)) {

        console.log('log file not found, creating...')

        // Make sure the directory exists first too, to be safe
        execSync(`mkdir -p ${jetpaxHome}/logs/server`)

        fs.writeFileSync(logFilePath, '')
    }

    return new FileLogger(logFilePath)

}

export async function getLogger(): Promise<Logger> {
    if (process.env.RUN_CONTEXT === 'background') {
        return await getFileLogger()
    }

    return await new ConsoleLogger()
}
