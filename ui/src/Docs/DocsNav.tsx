import * as React from 'react'
import {Link} from "react-router-dom"

const DocsNav = () => (
    <>
        <section>
            <h3>General</h3>
            <Link to="/docs/readme">Readme</Link>
            <Link to="/docs/changelog">Changelog</Link>
            <Link to="/docs/contributing">Contributing</Link>
        </section>
        <section>
            <h3>Command Line Interface</h3>
            <Link to="/docs/cli/overview">Overview</Link>
            {/*<Link to="/docs/cli/up"><code>jpx up</code></Link>*/}
        </section>
        {/*<section>*/}
            {/*<h3>Guides</h3>*/}
            {/*<Link to="/docs/guides/overview">Overview</Link>*/}
        {/*</section>*/}
        <section>
            <h3>Configuration Objects</h3>
            <Link to="/docs/configuration-objects/service">Service</Link>
        </section>
        <section>
            <h3>Additional Concepts</h3>
            <Link to="/docs/concepts/service-managers">Service Managers</Link>
        </section>
        <section>
            <h3>UI</h3>
            <Link to="/docs/ui/keyboard-shortcuts">Keyboard Shortcuts</Link>
        </section>
        <section>
            <h3>Internals</h3>
            <Link to="/docs/internals/architecture">Architecture</Link>
        </section>

    </>
)

export default DocsNav
