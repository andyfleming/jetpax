import BaseEntity from "./BaseEntity"

type Workspace = BaseEntity & {
    path: string
    name: string
}

export default Workspace
