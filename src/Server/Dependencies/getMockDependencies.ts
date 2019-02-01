import {Dependencies} from "./getDependencies"
import MockLogger from "../Logging/MockLogger"
import InMemoryStore from "../Persistence/InMemoryStore"

export default async function getMockDependencies(): Promise<Dependencies> {
    return {
        logger: new MockLogger(),
        kv: new InMemoryStore(),
    }
}
