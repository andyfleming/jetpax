import Command from "./Command"
import path from 'path'
import {readFileSync} from "fs"
import chalk from "chalk"
import logOnBlack from "../Output/logOnBlack"

const GetVersionCommand: Command = {
    name: 'version',
    aliases: ['--version'],
    run: async ({args, flags}) => {
        const packageFile = readFileSync(path.join(__dirname, '../../../package.json'), {
            encoding: 'utf-8'
        })
        const parsed = JSON.parse(packageFile)

        console.log()
        logOnBlack()
        logOnBlack(`    ${chalk.hex('#FEC908')('J E ')}${chalk.hex('#F9A619')('T P ')}${chalk.hex('#F25822')('A X')}`)
        logOnBlack(chalk.hex('#FFFFFF')(`    ${parsed.version}`))
        logOnBlack()
        console.log()
    }
}

export default GetVersionCommand
