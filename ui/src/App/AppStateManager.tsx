import React, {Component, ReactNode} from "react";

interface AppState {
    clearSelectedProject: () => void
    selectedProject: string | null
    selectProject: (projectKey: string) => void
}

const initialAppState: AppState = {
    clearSelectedProject: () => {},
    selectedProject: null,
    selectProject: (projectKey: string) => {}
}

const AppStateContext = React.createContext<AppState>(initialAppState)
export const AppStateConsumer = AppStateContext.Consumer

interface Props {}

class AppStateManager extends Component<Props, AppState> {
    constructor(props: Props) {
        super(props)

        this.state = {
            ...initialAppState,
            clearSelectedProject: this.clearSelectedProject,
            selectProject: this.selectProject,
        }
    }

    clearSelectedProject = () => {
        this.setState({
            selectedProject: null,
        })
    }

    selectProject = (projectKey: string) => {
        this.setState({
            selectedProject: projectKey
        })
    }

    render() {
        return (
            <AppStateContext.Provider value={this.state}>
                {this.props.children}
            </AppStateContext.Provider>
        )
    }
}

export default AppStateManager
