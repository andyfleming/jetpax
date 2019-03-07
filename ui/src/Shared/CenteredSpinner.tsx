import * as React from 'react'
import { ISpinnerProps, Spinner } from '@blueprintjs/core'
import './CenteredSpinner.scss'

const CenteredSpinner = (props: Partial<ISpinnerProps>) => (
    <div className="centered-spinner">
        <Spinner
            {...props}
        />
    </div>
)

export default CenteredSpinner
