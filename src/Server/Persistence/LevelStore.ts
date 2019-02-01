import KeyValueStore from "./KeyValueStore"
import jetpaxHome from "../../Common/jetpaxHome"
const level = require('level')

export default class LevelStore implements KeyValueStore {
    private db: any

    constructor(private readonly location = `${jetpaxHome}/kv-db`) {}

    async connect() {
        this.db = await level(this.location)

        // On shutdown, close the db connection
        process.on('SIGTERM', () => {
            this.db.close()
        })
    }

    async get(key: string): Promise<any|undefined> {
        try {
            return await this.db.get(key)
        } catch (err) {
            return undefined
        }
    }

    async set(key: string, value: any): Promise<void> {
        await this.db.put(key, value)
    }

    async delete(key: string): Promise<void> {
        this.db.del(key)
    }

}

export async function makeLevelStore(location?: string) {
    const store = new LevelStore(location)

    await store.connect()

    return store
}
