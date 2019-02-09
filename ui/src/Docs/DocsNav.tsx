import * as React from 'react'
import {Link} from "react-router-dom"
/*
{
  "sections": [
    {
      "title": "Overview",
      "pages": [
        {
          "title": "README",
          "path": "",
          "source": "../README"
        },
        {
          "title": "CHANGELOG",
          "path": "../CHANGELOG"
        }
      ]
    },
    {
      "title": "Guides",
      "pages": []
    },
    {
      "title": "Configuration Objects",
      "pages": [
        {
          "title": "Service",
          "path": "objects/services"
        }
      ]
    },
    {
      "title": "Additional Concepts",
      "pages": [
        {
          "title": "Service Managers",
          "path": "concepts/service-managers"
        }
      ]
    },
    {
      "title": "UI",
      "pages": [
        {
          "title": "Keyboard Shortcuts",
          "path": "ui/keyboard-shortcuts"
        }
      ]
    },
    {
      "title": "CLI",
      "pages": []
    },
    {
      "title": "Internals",
      "pages": []
    }
  ]
}

 */

/*
    'changelog': raw('./Content/changelog.md') as string,
    'contributing': raw('./Content/contributing.md') as string,
    'readme': raw('./Content/readme.md') as string,
    'cli/overview': raw('./Content/cli/overview.md') as string,
    'concepts/service-managers': raw('./Content/concepts/service-managers.md') as string,
    'guides/getting-started': raw('./Content/guides/getting-started.md') as string,
    'internals/architecture': raw('./Content/internals/architecture.md') as string,
    'ui/keyboard-shortcuts': raw('./Content/ui/keyboard-shortcuts.md') as string,

 */

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
            <Link to="/docs/cli/up"><code>jpx up</code></Link>
        </section>
        <section>
            <h3>Guides</h3>
            <Link to="/docs/guides/overview">Overview</Link>
        </section>
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
