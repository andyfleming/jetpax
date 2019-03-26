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
import {RootState, SelectedProject} from "./Store/makeStore"
import {NavLink, RouteComponentProps, withRouter} from "react-router-dom"

type NavBarLinkProps = {
    path: string
    icon: IconName
    text: string
}

const NavBarLink = ({path, icon, text}: NavBarLinkProps) => (
    <NavLink to={path} activeClassName="selected"><Button className={Classes.MINIMAL} icon={icon} text={text} /></NavLink>
)

type Props = RouteComponentProps & {
    selectedProjectId: SelectedProject,
    clearSelectedProject: () => void
}

class NavBar extends React.PureComponent<Props> {
    render() {
        const {clearSelectedProject, selectedProjectId} = this.props
        const projectIsSelected = (selectedProjectId !== null)

        return (
            <Navbar className={Classes.DARK}>
                <NavbarGroup align="left">
                    <NavbarHeading className="logo"/>
                    {!projectIsSelected && <NavBarLink path="/select-project" icon="folder-open" text="Select Project" />}
                    {/*{projectIsSelected && <NavBarLink path="/dashboard" icon="home" text="Dashboard" />}*/}
                    {/*{projectIsSelected && <NavBarLink path="/workspace" icon="control" text="Workspace" />}*/}
                    {projectIsSelected && <NavBarLink path="/services" icon="applications" text="Services"/>}
                    {/*{projectIsSelected && <NavBarLink path="/assets" icon="compressed" text="Assets" />}*/}
                    {projectIsSelected && <NavBarLink path="/configuration" icon="code-block" text="Configuration"/>}
                </NavbarGroup>
                <NavbarGroup align="right">
                    <NavBarLink path="/docs" icon="list-detail-view" text="Docs"/>
                    {selectedProjectId !== null &&
                    <NavLink to="/select-project" activeClassName="selected">
                        <Button className={Classes.MINIMAL} icon="random" text="Switch Project" onClick={clearSelectedProject} />
                    </NavLink>
                    }
                </NavbarGroup>
            </Navbar>
        )

    }
}

export default withRouter(connect((state: RootState) => {
    return {
        selectedProjectId: state.selectedProject,
    }
}, (dispatch) => {
    return {
        clearSelectedProject: () => {
            dispatch({
                type: 'CLEAR_SELECTED_PROJECT',
            })
        }
    }
})(NavBar))
