const PasswordPrompt = require('prompt-password')

async function getPassword(message: string) {
    const prompt = new PasswordPrompt({
        type: 'password',
        message,
    })

    return await prompt.run()
}

export default getPassword
