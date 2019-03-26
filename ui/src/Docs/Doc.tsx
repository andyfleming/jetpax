import * as React from 'react'
import './Doc.scss'
import DocsNav from "./DocsNav"
import {RouterProps, withRouter} from "react-router"
import content from './content'
import ReactMarkdown from "react-markdown"
import {highlightAll} from "prismjs"
import {Icon} from "@blueprintjs/core"

type Props = RouterProps & {}

class Doc extends React.Component<any, Props> {

    componentDidMount() {
        highlightAll()
    }

    componentDidUpdate() {
        highlightAll()
    }

    render() {
        const {history} = this.props
        const path = history.location.pathname.replace(/^\/docs\//, "")

        if (!content.hasOwnProperty(path)) {
            // TODO: abstract wrapper so it always remains consistent with the below section
            return (
                <div id="doc">
                    <div className="column sidebar">
                        <DocsNav/>
                    </div>
                    <div className="column body">
                        <article>
                            <h1><Icon icon="warning-sign" iconSize={28} style={{verticalAlign: '-4px'}}/> Doc not found</h1>
                            <p>Check out the links on the left or consider <a href={`https://github.com/andyfleming/jetpax/issues/new?labels=docs&title=${encodeURIComponent(`Doc not found: /docs/${path}`)}`} target="_blank">opening an issue on GitHub</a>.</p>
                        </article>
                    </div>
                </div>
            )
        }

        // Get the markdown out of the object and replace some values
        const markdown = content[path]

        // Strip the image from the README
            .replace('<img src="ui/public/jetpax-app-icon.png" alt="Jetpax App icon" width="180" />', '')


        return (
            <div id="doc">
                <div className="column sidebar">
                    <DocsNav/>
                </div>
                <div className="column body">
                    <article>
                        <ReactMarkdown
                            source={markdown}
                            escapeHtml={false}
                            linkTarget={(url) => {
                                return (url.startsWith('/')) ? '' : '_blank'
                            }}
                        />
                    </article>
                </div>
            </div>
        )
    }
}

export default withRouter(Doc)
