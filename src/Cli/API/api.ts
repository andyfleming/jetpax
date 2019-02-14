import axios from "axios"
import serverUrl from "../../Common/serverUrl"
import ServerApiHttp from "./ServerApiHttp"

const api = new ServerApiHttp(
    axios.create({
        baseURL: `${serverUrl}/api`,
    })
)

export default api
