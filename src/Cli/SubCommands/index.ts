import GetVersionCommand from "./GetVersionCommand"
import OpenUiCommand from "./OpenUiCommand"
import HelpCommand from "./HelpCommand"
import Command from "./Command"
import StartServerCommand from "./StartServerCommand"
import OpenWebUiCommand from "./OpenWebUiCommand"

const commands: Command[] = [
    GetVersionCommand,
    HelpCommand,
    OpenWebUiCommand,
    OpenUiCommand,
    StartServerCommand,
]

export default commands
