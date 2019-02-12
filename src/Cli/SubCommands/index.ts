import GetVersionCommand from "./GetVersionCommand"
import OpenUiCommand from "./UI/OpenUiCommand"
import HelpCommand from "./HelpCommand"
import Command from "./Command"
import StartServerCommand from "./Server/StartServerCommand"
import OpenWebUiCommand from "./UI/OpenWebUiCommand"
import StopServerCommand from "./Server/StopServerCommand"
import TailServerLogsCommand from "./Server/TailServerLogsCommand"
import ServerStatusCommand from "./Server/ServerStatusCommand"
import RegisterWorkspaceCommand from "./Workspaces/RegisterWorkspaceCommand"
import DeregisterWorkspaceCommand from "./Workspaces/DeregisterWorkspaceCommand"
import InitializeWorkspaceCommand from "./Workspaces/InitializeWorkspaceCommand"

const commands: Command[] = [
    DeregisterWorkspaceCommand,
    GetVersionCommand,
    HelpCommand,
    InitializeWorkspaceCommand,
    OpenWebUiCommand,
    OpenUiCommand,
    RegisterWorkspaceCommand,
    StartServerCommand,
    ServerStatusCommand,
    StopServerCommand,
    TailServerLogsCommand,
]

export default commands
