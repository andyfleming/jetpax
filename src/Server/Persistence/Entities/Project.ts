import BaseEntity from "./BaseEntity"

type Project = BaseEntity & {
    path: string
    name: string
}

export default Project
