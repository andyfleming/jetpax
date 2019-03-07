import axios from 'axios'
import { AxiosInstance } from 'axios'

export default class ApiClient {
    constructor(
        private readonly http: AxiosInstance = axios.create({baseURL: 'http://localhost:8777/api'})
    ) {}

    async getDbKeys(): Promise<string[]> {
        const response = await this.http.get('/db/keys')

        return response.data.data
    }

    async getDbEntry(key: string): Promise<any> {
        const response = await this.http.get('/db/entry', {
            params: {
                key,
            },
        })

        return response.data.data
    }
}
