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

    async getAll(prefix: string): Promise<any[]> {
        const results = []

        for (const [key, value] of this.db.entries()) {
            if (key.startsWith(prefix)) {
                results.push(value)
            }
        }

        return results
    }

    async getAllKeys(): Promise<string[]> {
        return Array.from(this.db.entries()).map(([key, value]) => key)
    }
}
