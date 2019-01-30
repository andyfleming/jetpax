import express from 'express'
import path from 'path'

const server = express()

// Serve static files
server.use(express.static(path.join(process.cwd(), 'ui/build')))


// API Routes
// ------------------------------------------------------------------------------------

server.get('/api/online', (req, res) => {
    res.send('Jetpax Server API Online')
})

// ------------------------------------------------------------------------------------

// Fallback for rewrite to index.html
server.get('*', (req,res) =>{
    res.sendFile(path.join(process.cwd(), 'ui/build/index.html'))
})

export default server
