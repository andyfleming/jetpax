import Command from "../Command"

const RegisterWorkspaceCommand: Command = {
    name: 'register',
    requiresServer: true,
    run: async () => {
        console.log()
        console.log('process.cwd()', process.cwd())
        console.log('TODO')
        console.log()
    },
}

export default RegisterWorkspaceCommand
