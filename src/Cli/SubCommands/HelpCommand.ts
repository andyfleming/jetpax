import Command from "./Command"
import chalk from "chalk"

const HelpCommand: Command = {
    name: 'help',
    aliases: ['--help'],
    run: async () => {
        console.log()
        console.log(`Available commands: `)
        console.log()
        console.log(`  ${chalk.yellow('up')}           Starts the Jetpax server`)
        console.log(`  ${chalk.yellow('down')}         Stops the Jetpax server`)
        console.log(`  ${chalk.yellow('ui')}           Opens the Jetpax dashboard`)
        console.log(`  ${chalk.yellow('web')}          Opens the Jetpax dashboard in a browser`)
        console.log(`  ${chalk.yellow('logs')}         Tails the Jetpax server logs`)
        console.log(`  ${chalk.yellow('help')}         Displays a list of commands`)
        console.log()
    }
}

export default HelpCommand
