if (!process.env.HOME) {
    throw new Error('Expected ENV var "HOME".')
}

const jetpaxHome = `${process.env.HOME}/.jetpax`

export default jetpaxHome
