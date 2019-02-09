import * as React from 'react'
import './Doc.scss'
import DocsNav from "./DocsNav"
import {Redirect, RouterProps, withRouter} from "react-router"
import content from './content'
import ReactMarkdown from "react-markdown"
import {highlightAll} from "prismjs"

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
            return <Redirect to={"/docs"}/>
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
                            linkTarget={(url, text, title) => {
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
