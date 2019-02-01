import KeyValueStore from "./KeyValueStore"
import jetpaxHome from "../../Common/jetpaxHome"
const level = require('level')

export default class LevelStore implements KeyValueStore {
    private db: any

    constructor(location = `${jetpaxHome}/kv-db`) {
        this.db = level(location)

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
