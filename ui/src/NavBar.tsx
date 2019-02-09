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
import {NavLink} from "react-router-dom"

type NavBarLinkProps = {
    path: string
    icon: IconName
    text: string
}

const NavBarLink = ({path, icon, text}: NavBarLinkProps) => (
    <NavLink to={path} activeClassName="selected"><Button className={Classes.MINIMAL} icon={icon} text={text} /></NavLink>
)

type Props = {
    request: boolean
    reply: boolean
    event: boolean
}

const NavBar = ({request, reply, event}: Props) => {
    return (
        <Navbar className={Classes.DARK}>
            <NavbarGroup align="left">
                <NavbarHeading className="logo"/>
                <NavBarLink path="/dashboard" icon="home" text="Dashboard" />
                <NavBarLink path="/services" icon="applications" text="Services" />
                <NavBarLink path="/assets" icon="compressed" text="Assets" />
                <NavBarLink path="/configuration" icon="code-block" text="Configuration" />
                <NavBarLink path="/docs" icon="list-detail-view" text="Docs" />
            </NavbarGroup>
            <NavbarGroup align="right">
                <NavBarLink path="/settings" icon="settings" text="Settings" />
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
}, null, null, { pure: false})(NavBar)
