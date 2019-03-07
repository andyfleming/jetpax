import {Logger} from "pino"
import {CollectionFactory} from "../Persistence/collection"
import KeyValueStore from '../Persistence/KeyValueStore'

export default interface Dependencies {
    kv: KeyValueStore
    logger: Logger
    collection: CollectionFactory
}
