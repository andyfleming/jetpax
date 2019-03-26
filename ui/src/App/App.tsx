import React, {Component} from 'react'
import NavBar from "./NavBar"
import {Redirect, Route, RouteComponentProps, Switch, withRouter} from "react-router"

import './App.scss'
import JumpToMenu from "./JumpToMenu"
import {GlobalHotKeys} from "react-hotkeys"
import Doc from "../Docs/Doc"
import Db from '../Dev/Db'
import Services from "../Services/Services";
import {connect} from "react-redux";
import {RootState, SelectedProject} from "./Store/makeStore";
import ProjectSelector from "./ProjectSelector";

const keyMap = {
    TOGGLE_JUMP_TO_MENU: ["command+k", "control+k"],
}

type Props = RouteComponentProps & {
    selectedProject: SelectedProject
}

class App extends Component<Props> {
    render() {
        const {selectedProject} = this.props
        const projectIsSelected = selectedProject !== null

        return (
            <GlobalHotKeys keyMap={keyMap}>
                    <div id="app">
                    <NavBar/>
                    <div id="view">
                        <Switch>
                            <Redirect exact from="" to="/" />
                            {!projectIsSelected && <Redirect exact from="/" to="/select-project"/>}
                            {projectIsSelected && <Redirect exact from="/" to="/services"/>}
                            {!projectIsSelected && <Route path="/select-project" component={ProjectSelector} />}
                            {projectIsSelected && <Redirect path="/select-project" to="/services" />}
                            {/*<Route path="/dashboard" component={Dashboard}/>*/}
                            {/*<Route path="/workspace" component={Workspace}/>*/}
                            {projectIsSelected && <Route path="/services" component={Services}/>}
                            {/*<Route path="/tasks" component={Dashboard}/>*/}
                            {/*<Route path="/sources" component={Dashboard}/>*/}
                            {/*<Route path="/assets" component={Dashboard}/>*/}
                            <Route path="/dev/db" component={Db}/>
                            <Redirect exact from="/docs" to="/docs/readme"/>
                            <Route path="/docs/*" component={Doc}/>
                            <Redirect to="/" />
                        </Switch>
                    </div>
                    <JumpToMenu />
                </div>
            </GlobalHotKeys>
        )
    }
}

export default withRouter(connect(({selectedProject}: RootState) => {
    return {
        selectedProject,
    }
})(App))
