const Enquirer = require('enquirer')
import * as crypto from 'crypto'

async function getInput(question: string, defaultAnswer?: string) {
    const enquirer = new Enquirer()
    const questionName = crypto.createHash('md5').update(question).digest("hex")
    const opts: {[key: string]: any} = {
        name: questionName,
        message: question,
    }

    if (typeof defaultAnswer === typeof '') {
        opts['default'] = defaultAnswer
    }

    enquirer.question(opts)

    // Ask the question
    const response = await enquirer.ask(questionName)

    // Return the answer
    return response[questionName]
}

export default getInput
