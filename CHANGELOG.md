# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
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

## [0.0.1] - 2019-01-13
### Added
- Initial repository contents
