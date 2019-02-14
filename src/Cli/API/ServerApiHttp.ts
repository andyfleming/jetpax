import {AxiosInstance} from "axios"
import serverUrl from "../../Common/serverUrl"

export class WorkspaceAlreadyRegisteredError extends Error {}

class ServerApiHttp {
    constructor(
        private readonly http: AxiosInstance
    ) {}

    async serverIsOnline() {
        try {
            const response = await this.http.get(`/online`, {
                timeout: 500,
            })

            return (response.data === 'Jetpax Server API Online')
        } catch (err) {
            return false
        }
    }

    async registerWorkspace(path: string, name: string) {
        try {
            this.http.post(`/workspaces`, {
                path,
                name,
            })
        } catch (err) {
            if (err.response && err.response.status && err.response.status >= 400 && err.response.status < 500) {
                throw new WorkspaceAlreadyRegisteredError()
            } else if (err.response && err.response.data && err.response.data.message) {
                throw new Error(err.response.data.message)
            } else {
                throw new Error('Request failed')
            }
        }
    }

    async getServerPid() {
        const response = await this.http.get(`${serverUrl}/api/pid`, {
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

}

export default ServerApiHttp
