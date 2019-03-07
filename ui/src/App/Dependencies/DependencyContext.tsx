import * as React from 'react'
import { Component, ComponentType } from 'react'
import Dependencies from './Dependencies'

type DependencyContextState = Dependencies | null

const DependencyContext = React.createContext<DependencyContextState>(null)

export function withDeps<P extends object>(WrappedComponent: ComponentType<P>): ComponentType<P> {
    return class ComponentWithDeps extends Component<P> {
        public render() {
            return (
                <DependencyContext.Consumer>
                    {(deps) => <WrappedComponent deps={deps} {...this.props} />}
                </DependencyContext.Consumer>
            )
        }
    }
}

/*

Alternate (functioning) implementation below for if we want to provide additional options at a higher level (like
mapping specific dependencies in a mapDepsToProps type of fashion)

 */

// export function withDeps(): <P extends object>(WrappedComponent: ComponentType<P>) => ComponentType<P> {
//     return <P extends object>(WrappedComponent: ComponentType<P>) =>
//         class ComponentWithDeps extends Component<P> {
//             public render() {
//                 return (
//                     <DependencyContext.Consumer>
//                         {(deps) => <WrappedComponent deps={deps} {...this.props} />}
//                     </DependencyContext.Consumer>
//                 )
//             }
//         }
// }


export const DependencyProvider = DependencyContext.Provider
