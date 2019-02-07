import Dependencies from "./Dependencies"

export default function getMockDependencies(): Dependencies {
    return {
        ws: {
            on: () => {},
            emit: () => {},
        } as any
    }
}
