// import cliOverview from './Content/cli/overview.md'
const raw = require('raw.macro')

// This should contain everything from /docs
const content: {[key: string]: string} = {
    'changelog': raw('./Content/changelog.md') as string,
    'contributing': raw('./Content/contributing.md') as string,
    'readme': raw('./Content/readme.md') as string,
    'cli/overview': raw('./Content/cli/overview.md') as string,
    'configuration-objects/service': raw('./Content/configuration-objects/service.md') as string,
    'concepts/service-managers': raw('./Content/concepts/service-managers.md') as string,
    'guides/getting-started': raw('./Content/guides/getting-started.md') as string,
    'internals/architecture': raw('./Content/internals/architecture.md') as string,
    'ui/keyboard-shortcuts': raw('./Content/ui/keyboard-shortcuts.md') as string,
}

export default content
