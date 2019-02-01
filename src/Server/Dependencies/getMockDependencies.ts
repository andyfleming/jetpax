import {Dependencies} from "./getDependencies"
import MockLogger from "../Logging/MockLogger"

export default async function getMockDependencies(): Promise<Dependencies> {
    return {
        logger: new MockLogger()
    }
}
