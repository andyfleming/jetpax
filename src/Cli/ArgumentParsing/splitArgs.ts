
// Usage:
// const {flags, args} = splitArgs(argv)

function splitArgs(argv: string[]): {flags: string[], args: string[]} {
    const flags: string[] = []
    const args: string[] = []

    for (const rawArg of argv) {
        if (rawArg.startsWith('-')) {
            flags.push(rawArg)
        } else {
            args.push(rawArg)
        }
    }

    return {flags, args}
}

export default splitArgs
