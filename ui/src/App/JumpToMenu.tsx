import * as React from 'react'
import {Menu, MenuItem} from "@blueprintjs/core"
import {RouteComponentProps, withRouter} from "react-router"
import { ItemPredicate, ItemRenderer, Omnibar } from "@blueprintjs/select"
import {GlobalHotKeys} from "react-hotkeys"

/*
 * This file is heavily influenced from blueprint example:
 * https://github.com/palantir/blueprint/blob/develop/packages/docs-app/src/examples/select-examples/omnibarExample.tsx
 */

interface JumpToOption {
    title: string
    path: string
}

const options: JumpToOption[] = [
    {
        title: 'Dashboard',
        path: '/dashboard',
    },
    {
        title: 'Workspace',
        path: '/services',
    },
    {
        title: 'Assets',
        path: '/assets',
    },
    {
        title: 'Docs',
        path: '/docs',
    },
]

function escapeRegExpChars(text: string) {
    return text.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")
}

function highlightText(text: string, query: string) {
    let lastIndex = 0
    const words = query
        .split(/\s+/)
        .filter(word => word.length > 0)
        .map(escapeRegExpChars)
    if (words.length === 0) {
        return [text]
    }
    const regexp = new RegExp(words.join("|"), "gi")
    const tokens: React.ReactNode[] = []
    while (true) {
        const match = regexp.exec(text)
        if (!match) {
            break
        }
        const length = match[0].length
        const before = text.slice(lastIndex, regexp.lastIndex - length)
        if (before.length > 0) {
            tokens.push(before)
        }
        lastIndex = regexp.lastIndex
        tokens.push(<strong key={lastIndex}>{match[0]}</strong>)
    }
    const rest = text.slice(lastIndex)
    if (rest.length > 0) {
        tokens.push(rest)
    }
    return tokens
}

export const filterOption: ItemPredicate<JumpToOption> = (query, option: JumpToOption) => {
    return (option.title.toLowerCase().indexOf(query.toLowerCase()) >= 0)
}

export const renderOption: ItemRenderer<JumpToOption> = (option: JumpToOption, { handleClick, modifiers, query }) => {
    if (!modifiers.matchesPredicate) {
        return null
    }
    return (
        <MenuItem
            active={modifiers.active}
            disabled={modifiers.disabled}
            label={option.path}
            key={option.path}
            onClick={handleClick}
            text={highlightText(option.title, query)}
        />
    )
}

const JumpToOmnibar = Omnibar.ofType<JumpToOption>()

type Props = RouteComponentProps<any> & {}

type State = {
    isOpen: boolean
}

class JumpToMenu extends React.Component<Props, State> {
    state: State = {
        isOpen: false
    }

    handleToggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    private renderItemList = (props: any) => {
        if (props.filteredItems.length === 0) {
            return <Menu ulRef={props.itemsParentRef}>
                <MenuItem disabled={true} text="No results." />
            </Menu>
        }
        return <Menu ulRef={props.itemsParentRef}>
            {props.items.map(props.renderItem)}
        </Menu>
    }

    private handleClose = () => this.setState({ isOpen: false })

    private handleItemSelect = (option: JumpToOption) => {
        this.setState({ isOpen: false })
        this.props.history.push(option.path)
    }

    render() {
        const { isOpen } = this.state
        return (
            <GlobalHotKeys handlers={{TOGGLE_JUMP_TO_MENU: this.handleToggle}}>
                <JumpToOmnibar
                    itemPredicate={filterOption}
                    itemRenderer={renderOption}
                    itemListRenderer={this.renderItemList}
                    items={options}
                    isOpen={isOpen}
                    onItemSelect={this.handleItemSelect}
                    onClose={this.handleClose}
                    resetOnSelect={true}
                    overlayProps={{
                        transitionDuration: 0,
                    }}
                />
            </GlobalHotKeys>
        )

    }
}

export default withRouter(JumpToMenu)
