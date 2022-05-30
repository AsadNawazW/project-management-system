//Load global imports
const express = require('express')
const http = require('http');


// Load ENV files
require('dotenv').config()

// Load database
require('./database/init');

// Boot application 
const app = express()
const host = process.env.SERVER_HOST
const port = process.env.SERVER_PORT
var server = http.createServer(app);
server.listen(port, host);

server.on('listening', function() {
    console.log(`Example app listening on port http:\/\/${server.address().address}:${port}`)
})

// Load API Routes
const router = express.Router()
const apiRoutes = require('./routes/api')(router, {});
app.use('/api', apiRoutes)
