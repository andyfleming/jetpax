import Logger from "../Logging/Logger"
import {getLogger} from "./getLogger"

export interface Dependencies {
    logger: Logger
}

export default async function getDependencies(): Promise<Dependencies> {
    return {
        logger: await getLogger(),
    }
}
