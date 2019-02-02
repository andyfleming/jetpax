import pino, {Logger} from 'pino'
import jetpaxHome from "../../Common/jetpaxHome"
import fs from "fs"
import {execSync} from "child_process"

async function makeFileLogger() {
    const logFilePath = `${jetpaxHome}/logs/server/server.log`

    // Start the log file if it doesn't already exists
    if (!fs.existsSync(logFilePath)) {

        console.log('log file not found, creating...')

        // Make sure the directory exists first too, to be safe
        execSync(`mkdir -p ${jetpaxHome}/logs/server`)

        fs.writeFileSync(logFilePath, '')
    }

    return pino({}, pino.destination(logFilePath))
}

export async function makeLogger(): Promise<Logger> {

    // If we are running in the background, use the file logger
    if (process.env.RUN_CONTEXT === 'background') {
        return await makeFileLogger()
    }

    // Otherwise, we'll print to stdout with the pretty print option/module
    return pino({
        prettyPrint: true,
    })
}
