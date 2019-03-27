import GetVersionCommand from "./GetVersionCommand"
import OpenUiCommand from "./UI/OpenUiCommand"
import HelpCommand from "./HelpCommand"
import Command from "./Command"
import StartServerCommand from "./Server/StartServerCommand"
import OpenWebUiCommand from "./UI/OpenWebUiCommand"
import StopServerCommand from "./Server/StopServerCommand"
import TailServerLogsCommand from "./Server/TailServerLogsCommand"
import ServerStatusCommand from "./Server/ServerStatusCommand"
import RegisterProjectCommand from "./Projects/RegisterProjectCommand"
import DeregisterProjectCommand from "./Projects/DeregisterProjectCommand"
import InitializeProjectCommand from "./Projects/InitializeProjectCommand"

const commands: Command[] = [
    DeregisterProjectCommand,
    GetVersionCommand,
    HelpCommand,
    InitializeProjectCommand,
    OpenWebUiCommand,
    OpenUiCommand,
    RegisterProjectCommand,
    StartServerCommand,
    ServerStatusCommand,
    StopServerCommand,
    TailServerLogsCommand,
]

export default commands
