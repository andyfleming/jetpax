import {Logger} from "pino"
import {CollectionFactory} from "../Persistence/collection"
import KeyValueStore from '../Persistence/KeyValueStore'
import PlatformStateManager from "./PlatformStateManager";

export default interface Dependencies {
    collection: CollectionFactory
    kv: KeyValueStore
    logger: Logger
    psm: PlatformStateManager
}
