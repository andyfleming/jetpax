import express from 'express'

const server = express()

server.get('/api/online', (req, res) => {
    res.send('Jetpax Server API Online')
})

export default server
