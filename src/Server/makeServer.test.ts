import makeServer from './makeServer'
import getMockDependencies from "./Dependencies/getMockDependencies"

describe('server', () => {
    it('should be truthy', async () => {
        const deps = await getMockDependencies()
        const server = await makeServer(deps)
        expect(server).toBeTruthy()
    })
})
