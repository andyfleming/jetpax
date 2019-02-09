# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- `jpx status` commands to see Jetpax server status (online/offline)
- Docs section

### Changed
- "Jump To" menu animation transition removed (to be more responsive)
- Project internals
    - CSS -> SCSS

### Fixed
- Nav links delayed update issue

## [0.4.0] - 2019-02-06
### Added
- UI Scaffolding
- Implementing logging to file (`~/.jetpax/logs/server/server.log`) for Jetpax internals
- `jpx logs` command for tailing Jetpax server logs
- some simple docs (mostly as placeholders)
- "Jump To" menu to switch between views in the UI
- Shortcut (<kbd>command</kbd>/<kbd>control</kbd> + <kbd>K</kbd>) to open "Jump To" menu
- Project internals
    - `pino` logger with pretty-print enabled for developing
    - `socket.io` for WebSocket communication
    - Routing with `react-router-dom`
    - State management with `redux`

## [0.3.0] - 2019-02-01
### Added
- Compare links in `CHANGELOG.md`
- Implementation of `jpx down` command to shut down server
### Changed
- Output of spacing for various messages to improve readability
### Fixed
- Shutdown behavior of server

## [0.2.1] - 2019-02-01
### Fixed
- Included files in published build

## [0.2.0] - 2019-02-01
### Added
- `jpx up` command to start server
- `jpx ui` command to open UI in app
- `jpx web` command to open UI in browser
- `jpx help` command to list commands
- Project internals
    - LevelDB for persistent storage
    - Logging for server
    - Coverage for root project (excluding UI)
    - Arg parsing
    - Utilities for parsing CLI input
    - Startup pre-flight script for server
    - DI container with mock equivalent

## [0.1.1] - 2019-01-30
### Fixes
- Missing files for running UI (in published version of package)

## [0.1.0] - 2019-01-30
### Added
- Linking of `jpx` as global command
- User interface (as future home for service statuses, etc)
- User interface application wrapper
- Icon
- Contributor Tools
    - `CONTRIBUTING.md` to document development and releasing workflow
    - `start` command at top level for running and watching server (for development)
    - More robust `release.sh` script
    - `cli.sh` script for dynamically running CLI TypeScript source
- Project internals
    - Custom .npmignore
    - Shebang for CLI entrypoint
    - Server with test API endpoint
    - UI foundation (from `create-react-app` with `--typescript`)
    - Typescript to base project
    - Proxying for API for UI in development mode (via `proxy` option in `package.json` of UI)


## [0.0.2] - 2019-01-13
### Added
- First actual npm publish

## 0.0.1 - 2019-01-13
### Added
- Initial repository contents

[Unreleased]: https://github.com/andyfleming/jetpax/compare/v0.4.0...HEAD
[0.4.0]: https://github.com/andyfleming/jetpax/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/andyfleming/jetpax/compare/v0.2.1...v0.3.0
[0.2.1]: https://github.com/andyfleming/jetpax/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/andyfleming/jetpax/compare/v0.1.1...v0.2.0
[0.1.1]: https://github.com/andyfleming/jetpax/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/andyfleming/jetpax/compare/v0.0.2...v0.1.0
[0.0.2]: https://github.com/andyfleming/jetpax/compare/d9eb4b6...v0.0.2
