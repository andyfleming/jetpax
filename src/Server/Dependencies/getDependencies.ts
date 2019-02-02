import {makeLogger} from "../Logging/makeLogger"
import {makeLevelStore} from "../Persistence/LevelStore"
import Dependencies from "./Dependencies"


export default async function getDependencies(): Promise<Dependencies> {
    return {
        logger: await makeLogger(),
        kv: await makeLevelStore(),
    }
}
