import GetVersionCommand from "./GetVersionCommand"
import OpenUiCommand from "./OpenUiCommand"
import HelpCommand from "./HelpCommand"
import Command from "./Command"
import StartServerCommand from "./StartServerCommand"

const commands: Command[] = [
    GetVersionCommand,
    HelpCommand,
    OpenUiCommand,
    StartServerCommand,
]

export default commands
