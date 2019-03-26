import * as React from 'react'
import {connect} from "react-redux";
import {RootState} from "./Store/makeStore";

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
        select proj
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
