import * as React from 'react'
import './NavBar.css'
import {
    Button,
    Classes,
    Navbar,
    NavbarGroup,
    NavbarHeading
} from "@blueprintjs/core"

const NavBar = () => {
    return (
        <Navbar className={Classes.DARK}>
            <div className="bp3-navbar-group bp3-align-left">
                <NavbarGroup align="left">
                    <NavbarHeading className=" logo"/>
                    <Button className={Classes.MINIMAL} icon="home" text="Home" />
                    <Button className={Classes.MINIMAL} icon="document" text="Files" />
                </NavbarGroup>
            </div>
        </Navbar>
    )
}

export default NavBar
