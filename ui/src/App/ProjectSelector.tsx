import * as React from 'react'
import {connect} from "react-redux";
import {RootState} from "./Store/makeStore";
import {Icon, NonIdealState} from "@blueprintjs/core";
import {Link} from "react-router-dom";

interface SimpleProjectListing {
    id: string
    name: string
}

interface Props {
    projects: SimpleProjectListing[]
    selectProject: (id: string) => () => void
}

const ProjectSelector = ({projects, selectProject}: Props) => {
    return <div>
        {projects.length === 0 &&
            <NonIdealState
                icon="folder-open"
                title="No projects registered."
                description={<div>
                    <p>Helpful docs:</p>
                    <p><Link to="/docs/guides/creating-a-project"><Icon icon="document" /> Creating a project</Link></p>
                    <p><Link to="/docs/guides/registering-a-project"><Icon icon="document" /> Registering a project</Link></p>
                </div>}
            />
        }
        {projects.map(project => (
                <div onClick={selectProject(project.id)}>{project.name}</div>
        ))}
    </div>
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
