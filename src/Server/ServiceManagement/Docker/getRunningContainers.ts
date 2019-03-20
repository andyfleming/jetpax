// docker ps --no-trunc --format '{{ json . }}'
// docker ps --filter "label=color=blue"
// docker run -l my-label --label com.example.foo=bar
// docker run --label io.jetpax.managed=true


import execa, {ExecaReturns} from 'execa'

/**
 * Runs a command like docker run --rm --detach -p 3200:80 nginx:1.14-alpine
 */
export default async function getRunningContainers(): Promise<object> {

    // docker ps --no-trunc --format='{{ json . }}' --filter="label=io.jetpax.managed=true" | jq .
    const child = execa('docker', [
        'ps', // base sub-command "ps"
        '--all', // include stopped containers
        '--no-trunc', // don't truncate output
        '--format', // format as json
        "{{ json . }}",
        '-f', // filter to containers managed by jetpax
        'label=io.jetpax.managed',
    ])

    // Wait for the command to complete
    const result = await child
    const parsed = JSON.parse(result.stdout)

    return parsed
}

async function main() {
    console.log(await getRunningContainers())
}

main()
