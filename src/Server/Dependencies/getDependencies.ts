import {makeLogger} from "../Logging/makeLogger"
import {makeLevelStore} from "../Persistence/LevelStore"
import Dependencies from "./Dependencies"
import collection from "../Persistence/collection"
import PlatformStateManager from "./PlatformStateManager";


export default async function getDependencies(): Promise<Dependencies> {
    const logger = await makeLogger()
    const kv = await makeLevelStore(logger)

    return {
        kv,
        logger,
        collection: collection(kv),
        psm: new PlatformStateManager()
    }
}
