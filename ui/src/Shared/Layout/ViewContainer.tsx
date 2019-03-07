import * as React from 'react'
import { ReactNode } from 'react'
import './ViewContainer.scss'

interface Props {
    children: ReactNode,
    id?: string
}

const ViewContainer = ({children, ...others}: Props) => (
    <div className="view-container" {...others}>
        {children}
    </div>
)

export default ViewContainer
