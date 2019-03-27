import {AxiosInstance} from "axios"
import serverUrl from "../../Common/serverUrl"

export class ProjectAlreadyRegisteredError extends Error {}
export class ProjectNotFoundError extends Error {}

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

    async registerProject(path: string, name: string) {
        try {
            await this.http.post(`/projects`, {
                path,
                name,
            })
        } catch (err) {
            if (err.response && err.response.status && err.response.status === 409) {
                throw new ProjectAlreadyRegisteredError()
            } else if (err.response && err.response.data && err.response.data.message) {
                throw new Error(err.response.data.message)
            } else {
                throw new Error('Request failed')
            }
        }
    }

    async deregisterProject(path: string) {
        try {
            await this.http.post('/projects/delete-by-path', {
                path,
            })
        } catch (err) {
            if (err.response && err.response.status && err.response.status === 404) {
                throw new ProjectNotFoundError()
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
