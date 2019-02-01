import KeyValueStore from "./KeyValueStore"

export default class InMemoryStore implements KeyValueStore {
    private db: Map<string, any>

    constructor() {
        this.db = new Map()
    }

    async get(key: string): Promise<any | undefined> {
        return this.db.get(key)
    }

    async set(key: string, value: any): Promise<void> {
        this.db.set(key, value)
    }

    async delete(key: string): Promise<void> {
        this.db.delete(key)
    }
}
