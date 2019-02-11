import retry from "./retry"

it('should resolve upon success on first call', async () => {
    let callCount = 0
    const result = await retry(async () => {
        callCount += 1
        return 'hello'
    }, 5)

    expect(result).toBe('hello')
    expect(callCount).toBe(1)
})

it('should call a function to calculate interval length', async () => {
    const calculateInterval = jest.fn(() => 5)
    const result = await retry(async ({attemptNum}) => {
        if (attemptNum === 1) {
            throw new Error()
        }
        return 'hello'
    }, calculateInterval)

    expect(result).toBe('hello')
    expect(calculateInterval).toHaveBeenCalledTimes(1)
})

it('should resolve upon success on 3rd call', async () => {
    let callCount = 0

    const result = await retry(async ({attemptNum}) => {
        callCount += 1
        if (attemptNum !== 3) {
            throw new Error('This failed. It should be retried')
        }

        return 'hello'
    }, 5, {maxAttempts: 5})

    expect(result).toBe('hello')
    expect(callCount).toBe(3)
})

it('should throw an error after hitting max attempts', async () => {
    let error

    try {
        await retry(async () => {
            throw new Error('This failed. It should be retried')
        }, 5, {maxAttempts: 3})
    } catch (e) {
        error = e
    }

    expect(error).toEqual(new Error('Function did not succeeded after 3 attempts'))
})

it.skip('should not accept a maxAttempts of 0', () => {})
it.skip('should not accept a maxAttempts of less than 0', () => {})
it.skip('should accept a retry delay length of 0', () => {})
it.skip('should not accept a retry delay length that is not greater than or equal to zero', () => {})
it.skip('should not accept a function argument that is not a function', () => {})
it.skip('should delay correctly between attempts', () => {})

