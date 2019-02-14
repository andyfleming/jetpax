import {prompt} from 'enquirer'
import crypto from 'crypto'

async function getInput(question: string, defaultAnswer?: string) {
    const questionName = crypto.createHash('md5').update(question).digest("hex")

    const responses = await prompt({
        type: 'input',
        name: questionName,
        message: question,
        initial: (typeof defaultAnswer === 'string') ? defaultAnswer : undefined,
    }) as any

    return responses[questionName]
}

export default getInput
