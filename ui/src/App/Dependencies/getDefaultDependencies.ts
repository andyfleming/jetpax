import openSocket from 'socket.io-client'
import Dependencies from "./Dependencies"

export default function getDefaultDependencies(): Dependencies {
    const socket = openSocket('http://localhost:8777')

    return {
        ws: socket,
    }
}
