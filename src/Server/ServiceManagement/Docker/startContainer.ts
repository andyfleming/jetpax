import execa, {ExecaReturns} from 'execa'

interface StartContainerOptions {
    portsToPublish?: string[]
}

/**
 * Runs a command like docker run --rm --detach -p 3200:80 nginx:1.14-alpine
 */
export default async function startContainer(image: string, options: StartContainerOptions): Promise<ExecaReturns> {
    let args = [
        'run', // base sub-command
        '--rm', // remove after stopping
        '-d',// run in background
        '--label=io.jetpax.managed', // mark as managed by jetpax
    ]

    // TODO: Other options to consider:
    // --cidfile string                 Write the container ID to the file
    // -e, --env list                   Set environment variables
    // --env-file list                  Read in a file of environment variables
    // --expose list                    Expose a port or a range of ports

    // TODO: consider adding labels so we can query by these later
    // -l, --label list                     Set meta data on a container
    // --label-file list                Read in a line delimited file of labels

    // TODO: consider linking/networking to other containers
    // --link list                      Add link to another container
    // --network string                 Connect a container to a network (default "default")
    // --network-alias list             Add network-scoped alias for the container
    // -h, --hostname string                Container host name

    // TODO: consider how we'll centralize / organize logs
    // --log-driver string              Logging driver for the container
    // --log-opt list                   Log driver options

    // TODO: consider naming the container:
    // --name string                    Assign a name to the container

    // TODO: consider readonly loading of a volume
    // --read-only                      Mount the container's root filesystem as read only

    // TODO: add support for volumes
    // --volume-driver string           Optional volume driver for the container
    // --volumes-from list              Mount volumes from the specified container(s)

    // TODO: consider setting a stop timeout
    // --stop-timeout int               Timeout (in seconds) to stop a container

    // If there are ports to publish, append an arg for them
    if (options.portsToPublish) {
        for (const portMapping of options.portsToPublish) {
            args.push(`--publish=${portMapping}`)
        }
    }

    // Push the image on as the last arg
    args.push(image)

    // Capture the child process variable (which is _also_ a promise)
    const child = execa('docker', args)

    // TODO: consider catching "image not found locally" and status of pulling

    // Wait for the command to complete
    const result = await child

    // TODO: consider handling service already running
    // TODO: consider similarly handling port in use
    // (both have the same commmand result):
    // "Bind for 0.0.0.0:3200 failed: port is already allocated."
    // Could search for "port is already allocated" and throw "PortInUseError"

    // TODO: consider handling image not found
    // TODO: consider handling tag not found

    // TODO: rather than returning a result, we may just want to emit events for this service
    // That would make this function more of a knowledgeable "start service" than a agnostic start container
    // Although, there's not any plans to start containers outside of that a "service" context

    return result
}

// Test code
async function main() {
    try {
        const result = await startContainer('nginx:1.14-alpine', {
            portsToPublish: [
                '3200:80',
            ]
        })

        console.log('command succeeded')
        console.log(result)
    } catch (err) {
        console.log('Command failed')
        console.log(err)
    }
}

main()
