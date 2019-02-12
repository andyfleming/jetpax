import chalk from 'chalk'
import stripAnsi from 'strip-ansi'

const WIDTH = 74

const logOnBlack = (message: string = '') => {
    const offset = message.length - stripAnsi(message).length
    console.log(chalk.bgHex('#000000')(message.padEnd(WIDTH + offset)))
}

export default logOnBlack
