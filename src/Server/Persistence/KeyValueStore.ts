type JsonEncodeableValue = string | object | number | boolean

export default interface  KeyValueStore {
    get(key: string): Promise<any|undefined>
    getAll(prefix: string): Promise<any[]>
    getAllKeys(): Promise<string[]>
    set(key: string, value: JsonEncodeableValue): Promise<void>
    delete(key: string): Promise<void>
}
