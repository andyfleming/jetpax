import splitArgs from "./splitArgs"

it('should handle no arguments', () => {
    const {flags, args} = splitArgs([])

    expect(flags).toEqual([])
    expect(args).toEqual([])
})

it('should handle flags', () => {
    const {flags, args} = splitArgs(['--version', '-t'])

    expect(flags).toEqual(['--version', '-t'])
    expect(args).toEqual([])
})

it('should handle args', () => {
    const {flags, args} = splitArgs(['example.ts', 'wow'])

    expect(flags).toEqual([])
    expect(args).toEqual(['example.ts', 'wow'])
})

it('should handle a flag with a value and args', () => {
    const {flags, args} = splitArgs(['--search="yeah"', '-t', 'something', 'another'])

    expect(flags).toEqual(['--search="yeah"', '-t'])
    expect(args).toEqual(['something', 'another'])
})
