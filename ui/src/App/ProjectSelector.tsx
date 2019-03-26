import * as React from 'react'
import {connect} from "react-redux"
import {RootState} from "./Store/makeStore"
import {Button, ButtonGroup, Icon, NonIdealState} from "@blueprintjs/core"
import {Link} from "react-router-dom"
import ViewContainer from "../Shared/Layout/ViewContainer";

interface SimpleProjectListing {
    id: string
    name: string
}

interface Props {
    projects: SimpleProjectListing[]
    selectProject: (id: string) => () => void
}

const ProjectSelector = ({projects, selectProject}: Props) => {
    return <ViewContainer>
        {projects.length === 0 &&
            <div style={{marginTop: 40}}>
                <NonIdealState
                    icon="folder-open"
                    title="No projects registered."
                    description={<div>
                        <p>Helpful docs:</p>
                        <p><Link to="/docs/guides/creating-a-project"><Icon icon="document" /> Creating a project</Link></p>
                        <p><Link to="/docs/guides/registering-a-project"><Icon icon="document" /> Registering a project</Link></p>
                    </div>}
                />
            </div>
        }
        <ButtonGroup vertical minimal={false} alignText="left" large>
        {projects.map(project => (
            <Button onClick={selectProject(project.id)} icon="circle-arrow-right">{project.name}</Button>
        ))}
        </ButtonGroup>
    </ViewContainer>
}

export default connect((state: RootState) => {
    return {
        projects: Object.values(state.platformState.projects).reduce((list, project) => {
            return [
                ...list,
                {
                    id: project.name,
                    name: project.name,
                }
            ]
        }, [] as SimpleProjectListing[])
    }
}, dispatch => {
    return {
        selectProject: (id: string) => {
            return () => {
                dispatch({
                    type: 'SELECT_PROJECT',
                    id,
                })
            }
        },
    }
})(ProjectSelector)
