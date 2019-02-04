import React, {Component} from 'react'
import NavBar from "../NavBar"
import {Redirect, Route, Switch} from "react-router"
import PageNotFound from "./PageNotFound"
import Dashboard from "../Dashboard/Dashboard"
import Services from "../Services/Services"

import './App.css'

class App extends Component {
    render() {
        console.log('app props', this.props)
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
            </div>
        )
    }
}

export default App
