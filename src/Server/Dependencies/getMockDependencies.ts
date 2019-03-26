import pino from 'pino'
import Dependencies from "./Dependencies"
import InMemoryStore from "../Persistence/InMemoryStore"
import collection from "../Persistence/collection"
import PlatformStateManager from "./PlatformStateManager";

export default async function getMockDependencies(): Promise<Dependencies> {
    const kv = new InMemoryStore()

    return {
        kv,
        logger: pino(),
        collection: collection(kv),
        psm: new PlatformStateManager()
    }
}
