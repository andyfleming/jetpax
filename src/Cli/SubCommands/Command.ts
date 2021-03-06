import ArgsAndFlags from "../ArgumentParsing/ArgsAndFlags"

export default interface Command {
    name: string
    requiresServer?: true
    aliases?: string[]
    run({args, flags}: ArgsAndFlags): Promise<any>
}
