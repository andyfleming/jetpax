import Command from "./Command"
import chalk from "chalk"
import logOnBlack from "../Output/logOnBlack"

const HelpCommand: Command = {
    name: 'help',
    aliases: ['--help'],
    run: async () => {
        console.log()
        logOnBlack()
        logOnBlack(`    ${chalk.hex('#FEC908')('J E ')}${chalk.hex('#F9A619')('T P ')}${chalk.hex('#F25822')('A X ')}`)
        logOnBlack(chalk.hex('#FFFFFF')(`    C O M M A N D S`))
        logOnBlack()
        logOnBlack(`    ${chalk.hex('#FEC908')('up')}           ${chalk.hex('#F9A619')(`Starts the Jetpax server`)}`)
        logOnBlack(`    ${chalk.hex('#FEC908')('down')}         ${chalk.hex('#F9A619')(`Stops the Jetpax server`)}`)
        logOnBlack(`    ${chalk.hex('#FEC908')('status')}       ${chalk.hex('#F9A619')(`Displays the status of the Jetpax server`)}`)
        logOnBlack(`    ${chalk.hex('#FEC908')('logs')}         ${chalk.hex('#F9A619')(`Tails the Jetpax server logs`)}`)
        logOnBlack()
        logOnBlack(`    ${chalk.hex('#FEC908')('init')}         ${chalk.hex('#F9A619')(`Initializes a project (in the current directory)`)}`)
        logOnBlack(`    ${chalk.hex('#FEC908')('register')}     ${chalk.hex('#F9A619')(`Registers a project `)}`)
        logOnBlack(`    ${chalk.hex('#FEC908')('deregister')}   ${chalk.hex('#F9A619')(`Deregisters a project`)}`)
        logOnBlack()
        logOnBlack(`    ${chalk.hex('#FEC908')('ui')}           ${chalk.hex('#F9A619')(`Opens the Jetpax dashboard`)}`)
        logOnBlack(`    ${chalk.hex('#FEC908')('web')}          ${chalk.hex('#F9A619')(`Opens the Jetpax dashboard in a browser`)}`)
        logOnBlack()
        logOnBlack(`    ${chalk.hex('#FEC908')('help')}         ${chalk.hex('#F9A619')(`Displays a list of commands`)}`)
        logOnBlack()
        console.log()
    },
}

export default HelpCommand
