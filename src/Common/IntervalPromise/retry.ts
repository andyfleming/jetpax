import wait from "./wait"

interface FuncParams {
    attemptNum: number
}

interface Func {
    (params: FuncParams): Promise<any>
}

interface CalculateRetryDelayFunc {
    (attemptNum: number): number
}

type RetryDelayOption = number | CalculateRetryDelayFunc

interface RetryConfig {
    maxAttempts: number
}

interface RetryOptions {
    maxAttempts?: number
}

const defaults: RetryConfig = {
    maxAttempts: Infinity
}

export class MaxAttemptsReachedError extends Error {}

export default async function retry(func: Func, retryDelay: RetryDelayOption, options: RetryOptions = {}) {
    const config = {
        ...defaults,
        ...options,
    }

    let attemptNum = 0

    do {
        attemptNum += 1

        // Attempt the function and if it resolves, return the value
        try {
            return await func({
                attemptNum,
            })
        } catch (err) {

        }

        if (attemptNum === config.maxAttempts) {
            throw new MaxAttemptsReachedError(`Function did not succeeded after ${attemptNum} attempts`)
        }

        const delay = (typeof retryDelay === 'function') ? retryDelay(attemptNum) : retryDelay
        await wait(delay)
    } while (true)
}
