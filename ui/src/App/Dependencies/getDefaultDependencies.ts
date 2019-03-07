import openSocket from 'socket.io-client'
import Dependencies from "./Dependencies"

export default function getDefaultDependencies(): Dependencies {
    const socket = openSocket('http://localhost:8777')

    return {
        ws: socket,
        getDbKeys: () => Promise.resolve([
            'abc',
            'collection:workspaces_or_some_longer_name:91811be1-5854-4377-abef-42fe840ace68',
            'collection:workspaces_or_some_longer_name:fc7ab023-9d3b-4412-8794-ee088c02d679',
            'collection:workspaces_or_some_longer_name:d6e7fb1a-d479-42fc-9b7d-12330274c1b9',
            'collection:workspaces_or_some_longer_name:91811be1-5854-4377-abef-42fe840ace68',
            'collection:workspaces_or_some_longer_name:fc7ab023-9d3b-4412-8794-ee088c02d679',
            'collection:workspaces_or_some_longer_name:d6e7fb1a-d479-42fc-9b7d-12330274c1b9',
            'collection:workspaces_or_some_longer_name:91811be1-5854-4377-abef-42fe840ace68',
            'collection:workspaces_or_some_longer_name:fc7ab023-9d3b-4412-8794-ee088c02d679',
            'collection:workspaces_or_some_longer_name:d6e7fb1a-d479-42fc-9b7d-12330274c1b9',
            'collection:workspaces_or_some_longer_name:91811be1-5854-4377-abef-42fe840ace68',
            'collection:workspaces_or_some_longer_name:fc7ab023-9d3b-4412-8794-ee088c02d679',
            'collection:workspaces_or_some_longer_name:d6e7fb1a-d479-42fc-9b7d-12330274c1b9',
            'collection:workspaces_or_some_longer_name:91811be1-5854-4377-abef-42fe840ace68',
            'collection:workspaces_or_some_longer_name:fc7ab023-9d3b-4412-8794-ee088c02d679',
            'collection:workspaces_or_some_longer_name:d6e7fb1a-d479-42fc-9b7d-12330274c1b9',
            'collection:workspaces_or_some_longer_name:91811be1-5854-4377-abef-42fe840ace68',
            'collection:workspaces_or_some_longer_name:fc7ab023-9d3b-4412-8794-ee088c02d679',
            'collection:workspaces_or_some_longer_name:d6e7fb1a-d479-42fc-9b7d-12330274c1b9',
            'collection:workspaces_or_some_longer_name:91811be1-5854-4377-abef-42fe840ace68',
            'collection:workspaces_or_some_longer_name:fc7ab023-9d3b-4412-8794-ee088c02d679',
            'collection:workspaces_or_some_longer_name:d6e7fb1a-d479-42fc-9b7d-12330274c1b9',
            'collection:workspaces_or_some_longer_name:91811be1-5854-4377-abef-42fe840ace68',
            'collection:workspaces_or_some_longer_name:fc7ab023-9d3b-4412-8794-ee088c02d679',
            'collection:workspaces_or_some_longer_name:d6e7fb1a-d479-42fc-9b7d-12330274c1b9',
            'collection:workspaces_or_some_longer_name:91811be1-5854-4377-abef-42fe840ace68',
            'collection:workspaces_or_some_longer_name:fc7ab023-9d3b-4412-8794-ee088c02d679',
            'collection:workspaces_or_some_longer_name:d6e7fb1a-d479-42fc-9b7d-12330274c1b9',
            'collection:workspaces_or_some_longer_name:91811be1-5854-4377-abef-42fe840ace68',
            'collection:workspaces_or_some_longer_name:fc7ab023-9d3b-4412-8794-ee088c02d679',
            'collection:workspaces_or_some_longer_name:d6e7fb1a-d479-42fc-9b7d-12330274c1b9',
            'collection:workspaces_or_some_longer_name:91811be1-5854-4377-abef-42fe840ace68',
            'collection:workspaces_or_some_longer_name:fc7ab023-9d3b-4412-8794-ee088c02d679',
            'collection:workspaces_or_some_longer_name:d6e7fb1a-d479-42fc-9b7d-12330274c1b9',
            'collection:workspaces_or_some_longer_name:91811be1-5854-4377-abef-42fe840ace68',
            'collection:workspaces_or_some_longer_name:fc7ab023-9d3b-4412-8794-ee088c02d679',
            'collection:workspaces_or_some_longer_name:d6e7fb1a-d479-42fc-9b7d-12330274c1b9',
            'collection:workspaces_or_some_longer_name:91811be1-5854-4377-abef-42fe840ace68',
            'collection:workspaces_or_some_longer_name:fc7ab023-9d3b-4412-8794-ee088c02d679',
            'collection:workspaces_or_some_longer_name:d6e7fb1a-d479-42fc-9b7d-12330274c1b9',
            'collection:workspaces_or_some_longer_name:91811be1-5854-4377-abef-42fe840ace68',
            'collection:workspaces_or_some_longer_name:fc7ab023-9d3b-4412-8794-ee088c02d679',
            'collection:workspaces_or_some_longer_name:d6e7fb1a-d479-42fc-9b7d-12330274c1b9',
            'collection:workspaces_or_some_longer_name:91811be1-5854-4377-abef-42fe840ace68',
            'collection:workspaces_or_some_longer_name:fc7ab023-9d3b-4412-8794-ee088c02d679',
            'collection:workspaces_or_some_longer_name:d6e7fb1a-d479-42fc-9b7d-12330274c1b9',

        ])
    }
}
