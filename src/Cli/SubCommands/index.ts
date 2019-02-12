import GetVersionCommand from "./GetVersionCommand"
import OpenUiCommand from "./UI/OpenUiCommand"
import HelpCommand from "./HelpCommand"
import Command from "./Command"
import StartServerCommand from "./Server/StartServerCommand"
import OpenWebUiCommand from "./UI/OpenWebUiCommand"
import StopServerCommand from "./Server/StopServerCommand"
import TailServerLogsCommand from "./Server/TailServerLogsCommand"
import ServerStatusCommand from "./Server/ServerStatusCommand"

const commands: Command[] = [
    GetVersionCommand,
    HelpCommand,
    OpenWebUiCommand,
    OpenUiCommand,
    StartServerCommand,
    ServerStatusCommand,
    StopServerCommand,
    TailServerLogsCommand,
]

export default commands
