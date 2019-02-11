import interval from "./interval"

describe('interval-promise 1.0', () => {

    describe('argument validation', () => {
        it.skip('should throw an error if something other than function is passed', () => {})
        it.skip('should throw an error if something other than function is passed', () => {})
        it.skip('should throw an error if no arguments are passed', () => {})
        it.skip('should throw an error if a negative number is passed as the interval', () => {})
        it.skip('should NOT throw an error if zero is passed as the interval', () => {})
        it.skip('should NOT throw an error if 1 is passed as the interval', () => {})
        it.skip('should throw an error if a float is passed as the interval', () => {})
        it.skip('should throw an error if neither a function nor number is passed for "intervalLength"', () => {})
        it.skip('should throw an error if the options argument is not an object', () => {})
        it.skip('should throw an error if an invalid option is passed', () => {})
        it.skip('should throw an error if iterations is a negative number', () => {})
        it.skip('should throw an error if iterations is 0', () => {})
        it.skip('should throw an error if iterations is a float', () => {})
        it.skip('should throw an error if stopOnError is not a boolean', () => {})
    })

    describe('interval calculation', () => {
        it.skip('should accept a function for interval length', () => {})
        it.skip('should call a function for interval length', () => {})
    })

    describe('execution', () => {
        it.skip('should call the user function', () => {})
        it.skip('should call the user function exactly the number of times requested', () => {})
    })

    describe('runtime validation', () => {
        it.skip('should ensure the user function provided returns a promise', () => {})
        it.skip('should ensure that if the interval length function returns a negative number, it throws an error', () => {})
        it.skip('should ensure that if the interval length function returns a non-integer number, it throws an error', () => {})
    })
})

it.skip('should stop executing after the next loop when clear interval was called', () => {})

it.skip('should have the expected iteration number upon each call', () => {})

it.skip('should throw an error if the number of iterations is negative', () => {})

it('should accept 0 as the number of iterations but not execute', (done) => {
    const func = jest.fn(() => Promise.resolve())
    interval(func, 1000, {iterations: 0})

    setTimeout(() => {
        expect(func).not.toHaveBeenCalled()
        done()
    }, 30)

})

it('should execute on an interval once immediately', (done) => {
    const func = jest.fn(() => Promise.resolve())
    interval(func, 1000, {iterations: 1})

    setTimeout(() => {
        expect(func).toHaveBeenCalledTimes(1)
        done()
    }, 10)
})

it('should execute on an interval 2 times', (done) => {
    const func = jest.fn(() => Promise.resolve())
    interval(func, 500, {iterations: 2})

    setTimeout(() => {
        expect(func).toHaveBeenCalledTimes(1)
    }, 50)

    setTimeout(() => {
        expect(func).toHaveBeenCalledTimes(2)
        done()
    }, 550)
})

it('should call the calculate interval function if provided', (done) => {
    const func = jest.fn(() => Promise.resolve())
    const calculateIntervalLength = jest.fn(() => 10)
    interval(func, calculateIntervalLength, {iterations: 2})

    setTimeout(() => {
        expect(func).toHaveBeenCalledTimes(2)
        expect(calculateIntervalLength).toHaveBeenCalledTimes(1)
        done()
    }, 50)
})

it('should execute on an interval 3 times', (done) => {
    const func = jest.fn(() => Promise.resolve())
    interval(func, 10, {iterations: 3})

    setTimeout(() => {
        expect(func).toHaveBeenCalledTimes(3)
        done()
    }, 40)
})

it('should provide the iteration number to the executed function', (done) => {
    const iterationValues: number[] = []
    const func = jest.fn(async ({iteration}) => {
        iterationValues.push(iteration)
    })
    interval(func, 5, {iterations: 5})

    setTimeout(() => {
        expect(func).toHaveBeenCalledTimes(5)
        expect(iterationValues).toEqual([1, 2, 3, 4, 5])
        done()
    }, 30)
})

it('should stop executing after clearInterval is called', (done) => {
    const func = jest.fn()
    const clearInterval = interval(func, 100)

    setTimeout(() => {
        expect(func).toHaveBeenCalledTimes(1)
    }, 10)

    setTimeout(() => {
        clearInterval()
    }, 150)

    setTimeout(() => {
        expect(func).toHaveBeenCalledTimes(2)
        done()
    }, 400)
})
