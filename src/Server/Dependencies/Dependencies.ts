import {Logger} from "pino"
import KeyValueStore from "../Persistence/KeyValueStore"

export default interface Dependencies {
    logger: Logger
    kv: KeyValueStore
}
