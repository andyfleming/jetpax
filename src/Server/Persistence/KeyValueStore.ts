export default interface  KeyValueStore {
    get(key: string): Promise<any|undefined>
    getAll(prefix: string): Promise<any[]>
    set(key: string, value: any): Promise<void>
    delete(key: string): Promise<void>
}
