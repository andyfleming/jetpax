import axios from "axios"

export default async function getServerPid(): Promise<number> {
    const response = await axios.get("http://localhost:8777/api/pid", {
        timeout: 500,
    })

    if (isNaN(response.data)) {
        throw new Error('PID could not be retrieved')
    }

    const pid = Number(response.data)

    if (!Number.isInteger(pid) || pid <= 0) {
        throw new Error('An invalid PID was returned by the server')
    }

    return pid
}
