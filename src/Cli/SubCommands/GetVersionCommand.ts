import Command from "./Command"
import * as pkg from '../../../package.json'

const GetVersionCommand: Command = {
    name: 'version',
    aliases: ['--version'],
    run: async ({args, flags}) => {
        console.log(`Jetpax Version: ${pkg.version}`)
    }
}

export default GetVersionCommand
