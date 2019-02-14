import KeyValueStore from "./KeyValueStore"
import uuid = require("uuid/v4")
import Workspace from "./Entities/Workspace"
import BaseEntity from "./Entities/BaseEntity"

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

function isoDate() {
    return (new Date()).toISOString()
}

export interface CollectionFactory {
    (collectionName: 'workspaces'): Collection<Workspace>
}

class Collection<T extends BaseEntity> {
    private readonly collectionPrefix: string

    constructor(
        private readonly db: KeyValueStore,
        private readonly collectionName: string,
    ) {
        this.collectionPrefix = `collection:${this.collectionName}:`
    }

    private key(id: string) {
        return `${this.collectionPrefix}${id}`
    }

    async insert(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>|Omit<T, 'id'>[]) {
        const entries: object[] = (Array.isArray(data)) ? data : [data]

        // TODO: optimization: use batch set
        for (const entry of entries) {
            const id = uuid()
            await this.db.set(this.key(id), {
                ...entry,
                id,
                createdAt: isoDate(),
                updatedAt: isoDate(),
            })
        }
    }

    async get(id: string): Promise<T | undefined> {
        return await this.db.get(this.key(id))
    }

    async getAll(): Promise<T[]> {
       return await this.db.getAll(this.collectionPrefix)
    }

    async update(id: string, updates: Partial<T>) {
        const existing = await this.get(this.key(id))

        return await this.db.set(this.key(id),{
            ...existing,
            ...updates,
            updatedAt: isoDate(),
        })
    }

    async delete(id: string) {
        await this.db.delete(this.key(id))
    }
}

export default function(db: KeyValueStore): CollectionFactory {
    return function collection(collectionName: string) {
        return new Collection(db, collectionName)
    }
}
