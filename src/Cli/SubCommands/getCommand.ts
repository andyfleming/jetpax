import Command from "./Command"
import commands from "./index"

const map: Map<string, Command> = new Map()

for (const command of commands) {
    map.set(command.name, command)

    if (command.aliases) {
        for (const alias in command.aliases) {
            map.set(alias, command)
        }
    }
}

export default function getCommand(commandName: string) {
    return map.get(commandName)
}
