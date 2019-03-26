import React, {Component} from 'react'
import NavBar from "./NavBar"
import {Redirect, Route, Switch} from "react-router"
import PageNotFound from "./PageNotFound"

import './App.scss'
import JumpToMenu from "./JumpToMenu"
import {GlobalHotKeys} from "react-hotkeys"
import Doc from "../Docs/Doc"
import Db from '../Dev/Db'
import Services from "../Services/Services";
import AppStateManager, {AppStateConsumer} from "./AppStateManager";

const keyMap = {
    TOGGLE_JUMP_TO_MENU: ["command+k", "control+k"],
}

class App extends Component {
    render() {
        return (
            <GlobalHotKeys keyMap={keyMap}>
                <AppStateManager>
                    <div id="app">
                        <NavBar/>
                        <div id="view">
                            <AppStateConsumer>
                                {({selectedProject}) => {

                                    if (selectedProject === null) {
                                        return 'No selected project'
                                    }

                                {/* TODO: If no project selected, render project selection view instead */}
                                return (
                                    <Switch>
                                        <Redirect exact from="/" to="/dashboard"/>
                                        {/*<Route path="/dashboard" component={Dashboard}/>*/}
                                        {/*<Route path="/workspace" component={Workspace}/>*/}
                                        <Route path="/services" component={Services}/>
                                        {/*<Route path="/tasks" component={Dashboard}/>*/}
                                        {/*<Route path="/sources" component={Dashboard}/>*/}
                                        {/*<Route path="/assets" component={Dashboard}/>*/}
                                        <Route path="/dev/db" component={Db}/>
                                        <Redirect exact from="/docs" to="/docs/readme" />
                                        <Route path="/docs/*" component={Doc} />
                                        <Route component={PageNotFound}/>
                                    </Switch>
                                )
                                }}
                            </AppStateConsumer>
                        </div>
                        <JumpToMenu />
                    </div>
                </AppStateManager>
            </GlobalHotKeys>
        )
    }
}

export default App
