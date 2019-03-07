import Dependencies from "./Dependencies"
import ApiClient from './ApiClient'

export default function getMockDependencies(): Dependencies {
    return {
        ws: {
            on: () => {},
            emit: () => {},
        } as any,
        api: {

        } as ApiClient
    }
}
