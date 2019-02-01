import Logger from "../Logging/Logger"
import {getLogger} from "./getLogger"
import KeyValueStore from "../Persistence/KeyValueStore"
import LevelStore from "../Persistence/LevelStore"

export interface Dependencies {
    logger: Logger
    kv: KeyValueStore
}

export default async function getDependencies(): Promise<Dependencies> {
    return {
        logger: await getLogger(),
        kv: new LevelStore(),
    }
}
