import * as path from "path"
import Command from "../Command"
import {spawn} from "child_process"
import serverLogFilePath from "../../../Common/serverLogFilePath"

const TailServerLogsCommand: Command = {
    name: 'logs',
    run: async () => {
        const command = `tail -f -n 50 ${serverLogFilePath} | ./node_modules/.bin/pino-pretty`
        const projectRootPath = path.join(__dirname, '../../../')

        const child = spawn('sh', ['-c', command], {
            cwd: projectRootPath,
            stdio: 'inherit',
        })
    }
}

export default TailServerLogsCommand
