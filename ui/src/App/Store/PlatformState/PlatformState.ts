interface Project {
    id: string // md5 hash
    path: string
    name: string
    notFound: boolean
    errors: []
    warnings: []
    services: []
}

export interface PlatformState {
    count: number
    projects: {
        [hash: string]: Project
    }
}
