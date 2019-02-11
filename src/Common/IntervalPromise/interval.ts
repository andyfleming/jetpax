import wait from "./wait"

interface FuncParams {
    iteration: number
    clearInterval: ClearIntervalPromse
}

interface Func {
    (params: FuncParams): Promise<any>
}

interface ClearIntervalPromse {
    (): void
}

interface CalculateIntervalLengthFunc {
    (iteration: number): number
}

type IntervalLengthOption = number | CalculateIntervalLengthFunc

interface IntervalConfig {
    iterations: number
}

interface IntervalOptions {
    iterations?: number
}

const defaults: IntervalConfig = {
    iterations: Infinity
}

export default function interval(func: Func, intervalLength: IntervalLengthOption, options: IntervalOptions = {}): ClearIntervalPromse {
    const config = {
        ...defaults,
        ...options,
    }

    let clearCalled = false

    const clearInterval = () => {
        clearCalled = true
    }

    const run = async () => {
        let iteration = 0

        do {

            iteration += 1

            await func({
                iteration,
                clearInterval,
            })

            // If we've completed all of the desired iterations, don't execute any more loops.
            if (iteration === config.iterations) {
                break
            }

            const length = (typeof intervalLength === 'function') ? intervalLength(iteration) : intervalLength
            await wait(length)
        } while (!clearCalled)
    }

    if (config.iterations !== 0) {
        run()
    }

    return clearInterval
}
