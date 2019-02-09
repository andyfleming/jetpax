import * as React from 'react'
import './NavBar.scss'
import {
    Button,
    Classes, IconName,
    Navbar,
    NavbarGroup,
    NavbarHeading
} from "@blueprintjs/core"
import {connect} from "react-redux"
import {RootState} from "./App/Store/makeStore"
import {Link} from "react-router-dom"

type Props = {
    request: boolean
    reply: boolean
    event: boolean
}

function at(path: string) {
    return (window.location.pathname === path)
}

const NavLink = ({path, icon, text}: {path: string, icon: IconName, text: string}) => (
    <Link to={path}><Button className={`${Classes.MINIMAL} ${at(path) && 'selected'}`} icon={icon} text={text} /></Link>
)

const NavBar = ({request, reply, event}: Props) => {
    return (
        <Navbar className={Classes.DARK}>
            <NavbarGroup align="left">
                <NavbarHeading className="logo"/>
                <NavLink path="/dashboard" icon="home" text="Dashboard" />
                <NavLink path="/services" icon="applications" text="Services" />
                <NavLink path="/assets" icon="compressed" text="Assets" />
                <NavLink path="/configuration" icon="code-block" text="Configuration" />
                <NavLink path="/docs" icon="list-detail-view" text="Docs" />
            </NavbarGroup>
            <NavbarGroup align="right">
                <NavLink path="/settings" icon="settings" text="Settings" />
                <Button className={`${Classes.MINIMAL} ${request && 'selected'}`} icon="cloud-upload" />
                <Button className={`${Classes.MINIMAL} ${reply && 'selected'}`} icon="cloud-download" />
                <Button className={`${Classes.MINIMAL} ${event && 'selected'}`} icon="satellite" />
            </NavbarGroup>
        </Navbar>
    )
}

export default connect((state: RootState) => {
    return {
        request: state.webSocketActivity.request,
        reply: state.webSocketActivity.reply,
        event: state.webSocketActivity.event,
    }
})(NavBar)
