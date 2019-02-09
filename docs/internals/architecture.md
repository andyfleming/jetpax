# Architecture

## Components

* CLI `jpx`
* Server
* UI
    * Access via web ( http://localhost:8777 )
    * Access via app wrapper ( http://localhost:8777 )

## Server Startup

* Preflight
    * Checks that file structure is as expected (in `~/.jetpax`)
    * Sets up dependencies object / "di container"
    * Initial State scaffolding
        * Load registered workspaces from database
* Initiate File Watchers (for config changes)
* Initiate Checks on Intervals
    * Docker status
    * PM2 status
* HTTP/WebSocket Server Start
