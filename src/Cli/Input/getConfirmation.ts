const Confirm = require('prompt-confirm')

type YesNo = 'y'|false

async function confirm(question: string, defaultAnswer: YesNo = 'y') {
    const prompt = new Confirm({
        message: question,
        default: defaultAnswer,
    })

    return await prompt.run()
}

export default confirm
