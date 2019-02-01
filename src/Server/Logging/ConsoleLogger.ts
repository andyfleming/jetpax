import Logger from "./Logger"

export default class ConsoleLogger implements Logger {
    log(message: string) {
        console.log(message)
    }
}
