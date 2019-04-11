type ConfiguredResource<C> = {
    config: {
        loaded: C
        available: C
        match: boolean
    }
}

type StatefulResource<S> = {
    status: S
}


interface ServiceStatus {

}

interface ServiceConfig {

}

type Service = StatefulResource<ServiceStatus> & ConfiguredResource<ServiceConfig>

interface Project {
    id: string // md5 hash
    path: string
    name: string
    notFound: boolean
    resources: {
        services: Service[]
        assets: []
    }
}

interface ProjectRegisteredButNotFound {
    id: string
    path: string
    name: string
    notFound: boolean
}

export interface PlatformState {
    count: number
    projects: {
        [id: string]: Project | ProjectRegisteredButNotFound
    }
}

interface AlternatePlatformState {
    count: number
    projects: {
        id: string
        path: string
        name: string
    }[]
    projectResources: {
        [projectId: string]: {
            [serviceRef: string]: {
                loadedConfig: {}
                configSource: {}
            }
        }
    }
    serviceStates: {
        [projectId: string]: {

        }
    }
}
