//Load global imports
const express = require('express')
const bodyParser = require('body-parser')
const http = require('http');


// Load ENV files
require('dotenv').config()

// Load database
require('./database/init');

// Load ACL
require('./acl/init');

// Boot application 
const app = express()
const host = process.env.SERVER_HOST
const port = process.env.SERVER_PORT
var server = http.createServer(app);
server.listen(port, host);

server.on('listening', function() {
    console.log(`Example app listening on port http:\/\/${server.address().address}:${port}`)
})


// Load json parser
app.use(bodyParser.json())

// Load API Routes
const router = express.Router()
const apiAuthRoutes = require('./routes/Auth')(router, {});
app.use('/api/auth', apiAuthRoutes)


const apiUserRoutes = require('./routes/Users')(router, {});
app.use('/api', apiUserRoutes)
 

const apiRoleRoutes = require('./routes/Roles')(router, {});
app.use('/api', apiRoleRoutes)
 
// const apiPermissionRoutes = require('./routes/Permission')(router, {});
// app.use('/api/permission', apiPermissionRoutes)

app.get('*', function(req, res){
    res.status(404).send('not found');
});
app.post('*', function(req, res){
    res.status(404).send('not found');
});

module.exports = app