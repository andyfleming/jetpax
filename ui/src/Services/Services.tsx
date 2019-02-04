import * as React from 'react'
import {HTMLSelect, HTMLTable} from "@blueprintjs/core"

const Services = () => (
    <div>
        <HTMLTable striped style={{width: '100%', maxWidth: '1024px'}}>
            <thead>
            <tr>
                <th>Service</th>
                <th>Profile</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>A</td>
                <td>
                    <HTMLSelect options={[
                        {
                            value: 1,
                            label: 'One',
                        },
                        {
                            value: 2,
                            label: 'Two',
                        },
                        {
                            value: 3,
                            label: 'Three',
                        },
                    ]} />
                </td>
                <td>C</td>
            </tr>
            <tr>
                <td>A</td>
                <td>B</td>
                <td>C</td>
            </tr>
            </tbody>
        </HTMLTable>
    </div>
)

export default Services

