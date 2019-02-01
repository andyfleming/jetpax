import axios from "axios"

export default async function serverIsOnline() {
    try {
        const response = await axios.get("http://localhost:8777/api/online", {
            timeout: 500,
        })

        return (response.data === 'Jetpax Server API Online')
    } catch (err) {
        return false
    }
}
