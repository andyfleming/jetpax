import pino from 'pino'
import Dependencies from "./Dependencies"
import InMemoryStore from "../Persistence/InMemoryStore"

export default async function getMockDependencies(): Promise<Dependencies> {
    return {
        logger: pino(),
        kv: new InMemoryStore(),
    }
}
