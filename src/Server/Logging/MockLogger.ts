import Logger from "./Logger"

export default class MockLogger implements Logger {
    public calls: number = 0

    log(message: string) {
        this.calls += 1
    }
}
