import Command from "./Command"
import path from 'path'
import {readFileSync} from "fs"

const GetVersionCommand: Command = {
    name: 'version',
    aliases: ['--version'],
    run: async ({args, flags}) => {
        const packageFile = readFileSync(path.join(__dirname, '../../../package.json'), {
            encoding: 'utf-8'
        })
        const parsed = JSON.parse(packageFile)

        console.log(`Jetpax Version: ${parsed.version}`)
    }
}

export default GetVersionCommand
