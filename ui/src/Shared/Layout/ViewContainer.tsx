import * as React from 'react'
import { ReactNode } from 'react'
import './ViewContainer.scss'

const ViewContainer = ({children}: {children: ReactNode}) => (
    <div className="view-container">
        {children}
    </div>
)

export default ViewContainer
