import * as React from 'react'
import {NavLink} from "react-router-dom"

const DocsNav = () => (
    <>
        <section>
            <h3>General</h3>
            <NavLink activeClassName="at" to="/docs/readme">Readme</NavLink>
            <NavLink activeClassName="at" to="/docs/changelog">Changelog</NavLink>
            <NavLink activeClassName="at" to="/docs/contributing">Contributing</NavLink>
        </section>
        <section>
            <h3>Command Line Interface</h3>
            <NavLink activeClassName="at" to="/docs/cli/overview">Overview</NavLink>
            {/*<NavLink activeClassName="at" to="/docs/cli/up"><code>jpx up</code></NavLink>*/}
        </section>
        {/*<section>*/}
            {/*<h3>Guides</h3>*/}
            {/*<NavLink activeClassName="at" to="/docs/guides/overview">Overview</NavLink>*/}
        {/*</section>*/}
        <section>
            <h3>Configuration Objects</h3>
            <NavLink activeClassName="at" to="/docs/configuration-objects/service">Service</NavLink>
        </section>
        <section>
            <h3>Additional Concepts</h3>
            <NavLink activeClassName="at" to="/docs/concepts/service-managers">Service Managers</NavLink>
        </section>
        <section>
            <h3>UI</h3>
            <NavLink activeClassName="at" to="/docs/ui/keyboard-shortcuts">Keyboard Shortcuts</NavLink>
        </section>
        <section>
            <h3>Internals</h3>
            <NavLink activeClassName="at" to="/docs/internals/architecture">Architecture</NavLink>
        </section>

    </>
)

export default DocsNav
