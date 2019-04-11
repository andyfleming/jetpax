import * as React from 'react'
import {Button, ButtonGroup, HTMLSelect, HTMLTable, Switch, Tag} from "@blueprintjs/core"
import ViewContainer from '../Shared/Layout/ViewContainer'
import './Services.scss'
import {Intent} from "@blueprintjs/core/src/common/intent"

type ServiceStatus = 'running' | 'stopped' | 'starting' | 'stopping' | 'crashed'

interface ServiceStatusDetails {
    name: string
    modeSelected: string
    modesAvailable: string[]
    manager: string
    status: 'running' | 'stopped' | 'starting' | 'stopping' | 'crashed'
    statusText: string
}

const serviceExamples: ServiceStatusDetails[] = [
    {
        name: 'Email Engine » Message Producer',
        modeSelected: 'Master Build',
        modesAvailable: ['Local Development', 'Master Build'],
        manager: 'Docker',
        status: 'running',
        statusText: 'Running',
    },
    {
        name: 'Email Engine » Worker',
        modeSelected: 'Master Build',
        modesAvailable: ['Local Development', 'Master Build'],
        manager: 'Docker',
        status: 'stopped',
        statusText: 'Stopped',
    },
]

const getStatusTagIntent = (status: ServiceStatus): Intent => {
    switch (status) {
        case 'running':
            return 'success'
        case 'crashed':
            return 'danger'
        case 'starting':
        case 'stopping':
            return 'warning'
        case 'stopped':
        default:
            return 'none'
    }
}

const getStatusTag = (status: ServiceStatus, statusText: string) => {
    return <Tag intent={getStatusTagIntent(status)} large>{statusText}</Tag>
}

const Services = () => (
    <ViewContainer>
        <HTMLTable striped className="service-status-table">
            <thead>
            <tr>
                <th style={{width: '100px'}}>Enabled</th>
                <th style={{width: '100px'}}>Status</th>
                <th>Service</th>
                <th>Mode</th>
                <th style={{width: '100px'}}>Manager</th>
                <th style={{width: '200px'}}>Actions</th>
                {/*<th style={{width: '140px'}}>Logs</th>*/}
            </tr>
            </thead>
            <tbody>
            {serviceExamples.map((service, index) => {
                const startable = ['crashed', 'stopped'].includes(service.status)
                const stoppable = ['running'].includes(service.status)
                const restartable = stoppable

                return (
                <tr key={index}>
                    <td style={{textAlign: 'center'}}><Switch inline checked={true} onChange={(e) => {}} disabled={!startable} /></td>
                    <td>{getStatusTag(service.status, service.statusText)}</td>
                    <td>{service.name}</td>
                    <td>
                        <HTMLSelect
                            disabled={!['crashed', 'stopped'].includes(service.status)}
                            value={service.modeSelected}
                            onChange={(e) => {}}
                            options={service.modesAvailable.map(mode => ({
                                value: mode,
                                label: mode,
                            }))}
                        />
                    </td>
                    <td>{service.manager}</td>
                    <td>
                        <ButtonGroup>
                            {startable && <Button icon="play">Start</Button>}
                            {stoppable && <Button icon="stop">Stop</Button>}
                            {restartable && <Button icon="refresh">Restart</Button>}
                        </ButtonGroup>
                    </td>
                    {/*<td><Button icon="application" minimal>View Logs</Button></td>*/}
                </tr>
                )
            })}
            <tr>
                <td style={{textAlign: 'center'}}><Switch inline /></td>
                <td><Tag className="bp3-intent-disabled" large>Disabled</Tag></td>
                <td>Example Service</td>
                <td/>
                <td/>
                <td/>
                {/*<td/>*/}
            </tr>

            </tbody>
        </HTMLTable>
    </ViewContainer>
)

export default Services

