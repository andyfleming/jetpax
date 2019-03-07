import * as React from 'react'
import { Button, HTMLTable } from "@blueprintjs/core"
import ViewContainer from '../Shared/Layout/ViewContainer'
import './Db.scss'
import Dependencies from '../App/Dependencies/Dependencies'
import { withDeps } from '../App/Dependencies/DependencyContext'
import CenteredSpinner from '../Shared/CenteredSpinner'

interface Props {
    deps: Dependencies
}

interface State {
    keysLoading: boolean
    entryLoading: boolean
    keys: string []
    entryData: string
    selectedKey: string
}

export class Db extends React.Component<Props, State> {
    state: State = {
        keysLoading: false,
        entryLoading: false,
        keys: [],
        entryData: '',
        selectedKey: '',
    }

    componentDidMount(): void {
        this.refreshKeys()
    }

    async refreshKeys() {
        this.setState({
            keysLoading: true,
        })

        // get keys
        setTimeout(async () => {
            this.setState({
                keysLoading: false,
                keys: await this.props.deps.getDbKeys()
            })
        }, 200)
    }

    async loadEntry(key: string) {
        this.setState({
            entryLoading: true,
        })

        setTimeout(() => {
            this.setState({
                entryLoading: false,
                entryData: 'wow',
            })
        }, 200)
    }

    handleRefreshButtonClicked = () => {
        this.refreshKeys()
    }

    handleClickEntry(key: string) {
        return () => {
            this.setState({
                selectedKey: key
            })
            this.loadEntry(key)
        }
    }

    render() {
        const {
            keysLoading,
            entryLoading,
            keys,
            entryData,
            selectedKey,
        } = this.state

        return (
            <ViewContainer id="db-gui">
                <div className="key-list">
                    <HTMLTable striped style={{width: '100%', maxWidth: '1024px'}} interactive>
                        <thead>
                        <tr>
                            <th>
                                <Button
                                    icon="refresh"
                                    onClick={this.handleRefreshButtonClicked}
                                    style={{float: 'right'}}
                                />
                                Key</th>
                        </tr>
                        </thead>
                        <tbody>
                        {keysLoading && <CenteredSpinner />}
                        {!keysLoading && keys.map(key => (
                            <tr key={key} onClick={this.handleClickEntry(key)} className={key === selectedKey ? 'selected': ''}>
                                <td>{key}</td>
                            </tr>
                        ))}
                        </tbody>
                    </HTMLTable>
                </div>
                <div className="entry-value">
                    {entryLoading && <CenteredSpinner />}
                    {!entryLoading && entryData}
                </div>
            </ViewContainer>
        )
    }
}

export default withDeps(Db)
