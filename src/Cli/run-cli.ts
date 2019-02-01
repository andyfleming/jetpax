#! /usr/bin/env node

import chalk from 'chalk'
import splitArgs from "./ArgumentParsing/splitArgs"
import getCommand from "./SubCommands/getCommand"

async function runCli() {
    const [subCommand, ...args] = process.argv.slice(2)

    // If no argument is passed, it should run the default command
    if (!subCommand) {
        console.log()
        console.log(` ${chalk.green('Jetpax')}`)
        console.log()
        console.log(` Run ${chalk.yellow('jpx help')} to see a list of available commands`)
        console.log()
        return
    }

    const command = getCommand(subCommand)

    if (command === null || command === undefined) {
        console.log()
        console.log(chalk.red(`Command "${subCommand}" not found.`))
        console.log()
        console.log(`Run ${chalk.yellow('jpx help')} to see a list of available commands.`)
        console.log()
        return
    }

    await command.run(splitArgs(args))
}


runCli()
