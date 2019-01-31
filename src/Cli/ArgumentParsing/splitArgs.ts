import ArgsAndFlags from "./ArgsAndFlags"

function splitArgs(argv: string[]): ArgsAndFlags {
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
