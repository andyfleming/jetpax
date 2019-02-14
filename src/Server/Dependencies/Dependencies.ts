import {Logger} from "pino"
import {CollectionFactory} from "../Persistence/collection"

export default interface Dependencies {
    logger: Logger
    collection: CollectionFactory
}
