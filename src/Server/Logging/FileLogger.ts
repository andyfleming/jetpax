import Logger from "./Logger"
import {createWriteStream, openSync, WriteStream} from 'fs'

export default class FileLogger implements Logger {
    private stream: WriteStream

    constructor(absoluteFilePath: string) {
        this.stream = createWriteStream(absoluteFilePath, {'flags': 'a'})
    }

    log(message: string) {
        this.stream.write(message + '\n')
    }
}
