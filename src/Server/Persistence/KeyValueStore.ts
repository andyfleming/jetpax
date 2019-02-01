export default interface  KeyValueStore {
    get(key: string): Promise<any|undefined>
    set(key: string, value: any): Promise<void>
    delete(key: string): Promise<void>
}
