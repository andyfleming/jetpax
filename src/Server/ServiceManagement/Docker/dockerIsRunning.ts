import execa from 'execa'

export default async function dockerIsRunning(): Promise<boolean> {
    try {
        const child = execa('docker', ['info'])
        const result = await child

        return (!result.failed && result.code === 0)

    } catch (err) {
        return false
    }
}
