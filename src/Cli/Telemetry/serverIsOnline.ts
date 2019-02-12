import axios from "axios"
import serverUrl from "../../Common/serverUrl"

export default async function serverIsOnline() {
    try {
        const response = await axios.get(`${serverUrl}/api/online`, {
            timeout: 500,
        })

        return (response.data === 'Jetpax Server API Online')
    } catch (err) {
        return false
    }
}
