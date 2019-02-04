import * as React from 'react'
import './NavBar.css'
import {
    Button,
    Classes,
    Navbar,
    NavbarGroup,
    NavbarHeading
} from "@blueprintjs/core"
import {connect} from "react-redux"
import {RootState} from "./App/Store/makeStore"

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
                <Button className={Classes.MINIMAL} icon="home" text="Home" />
                <Button className={Classes.MINIMAL} icon="document" text="Files" />
            </NavbarGroup>
            <NavbarGroup align="right">
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
