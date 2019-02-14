import pino from 'pino'
import Dependencies from "./Dependencies"
import InMemoryStore from "../Persistence/InMemoryStore"
import collection from "../Persistence/collection"

export default async function getMockDependencies(): Promise<Dependencies> {
    return {
        logger: pino(),
        collection: collection(new InMemoryStore()),
    }
}
