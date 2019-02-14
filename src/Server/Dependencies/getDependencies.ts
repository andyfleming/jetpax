import {makeLogger} from "../Logging/makeLogger"
import {makeLevelStore} from "../Persistence/LevelStore"
import Dependencies from "./Dependencies"
import collection from "../Persistence/collection"


export default async function getDependencies(): Promise<Dependencies> {
    return {
        logger: await makeLogger(),
        collection: collection(await makeLevelStore()),
    }
}
