import React, {Component} from 'react'
import NavBar from "../NavBar"
import {Redirect, Route, Switch} from "react-router"
import PageNotFound from "./PageNotFound"
import Dashboard from "../Dashboard/Dashboard"
import Services from "../Services/Services"

import './App.css'
import JumpToMenu from "./JumpToMenu"

class App extends Component {
    render() {
        return (
            <div id="app">
                <NavBar/>
                <div id="view">
                    <Switch>
                        <Redirect exact from="/" to="/dashboard"/>
                        <Route path="/dashboard" component={Dashboard}/>
                        <Route path="/services" component={Services}/>
                        {/*<Route path="/tasks" component={Dashboard}/>*/}
                        {/*<Route path="/sources" component={Dashboard}/>*/}
                        {/*<Route path="/assets" component={Dashboard}/>*/}
                        <Route component={PageNotFound}/>
                    </Switch>
                </div>
                <JumpToMenu />
            </div>
        )
    }
}

export default App
