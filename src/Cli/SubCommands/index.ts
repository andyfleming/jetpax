import GetVersionCommand from "./GetVersionCommand"
import OpenUiCommand from "./OpenUiCommand"
import HelpCommand from "./HelpCommand"
import Command from "./Command"
import StartServerCommand from "./StartServerCommand"
import OpenWebUiCommand from "./OpenWebUiCommand"
import StopServerCommand from "./StopServerCommand"
import TailServerLogsCommand from "./TailServerLogsCommand"

const commands: Command[] = [
    GetVersionCommand,
    HelpCommand,
    OpenWebUiCommand,
    OpenUiCommand,
    StartServerCommand,
    StopServerCommand,
    TailServerLogsCommand,
]

export default commands
