#! /usr/bin/env node

import chalk from 'chalk'
import splitArgs from "./ArgumentParsing/splitArgs"
import getCommand from "./SubCommands/getCommand"
import ServerApiHttp from "./API/ServerApiHttp"
import api from "./API/api"

async function runCli() {
    const [subCommand, ...args] = process.argv.slice(2)

    // If no argument is passed, it should run the default command
    if (!subCommand) {
        console.log()
        console.log(` ${chalk.hex('#FEC908')('J E ')}${chalk.hex('#F9A619')('T P ')}${chalk.hex('#F25822')('A X ')}`)
        console.log()
        console.log(` Run ${chalk.yellow('jpx help')} to see a list of available commands`)
        console.log()
        return
    }

    const command = getCommand(subCommand)

    if (command === null || command === undefined) {
        console.log()
        console.log(chalk.red(` Command "${subCommand}" not found.`))
        console.log()
        console.log(` Run ${chalk.yellow('jpx help')} to see a list of available commands.`)
        console.log()

        process.exit(127)
        return
    }

    if (command.requiresServer) {
        if (!await api.serverIsOnline()) {
            console.log()
            console.log(chalk.red(' This command requires the server to be running.'))
            console.log()
            console.log(` Run ${chalk.yellow('jpx up')} to start the server.`)
            console.log()

            process.exit(1)
            return
        }
    }

    await command.run(splitArgs(args))
}

runCli()
