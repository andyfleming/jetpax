import KeyValueStore from "./KeyValueStore"
import jetpaxHome from "../../Common/jetpaxHome"
import {registerShutdownTask} from "../Shutdown/runShutdownTasks"
const level = require('level')

export default class LevelStore implements KeyValueStore {
    private db: any

    constructor(private readonly location = `${jetpaxHome}/kv-db`) {}

    async connect() {
        this.db = await level(this.location)

        // On shutdown, close the db connection
        registerShutdownTask(async () => {
            await this.db.close()
        })
    }

    async get(key: string): Promise<any|undefined> {
        try {
            return await this.db.get(key).value
        } catch (err) {
            return undefined
        }
    }

    getAll(prefix: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            const items: any[] = []

            // Range from "example:!" to "example:~"
            const gt = prefix + '!'
            const lt = prefix + '~'

            this.db.createReadStream({gt, lt})
                .on('data', function(data: any) {
                    items.push(JSON.parse(data.value))
                })
                .on('error', (err: any) => {
                    reject(err)
                })
                .on('end', () => {
                    resolve(items)
                })
        })
    }

    async set(key: string, value: any): Promise<void> {
        await this.db.put(key, value, { valueEncoding: 'json' })
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
