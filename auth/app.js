//Load global imports
const express = require('express')
const bodyParser = require('body-parser')
const http = require('http');
const AuthRoutes = require('./routes/Auth')
const RolesRoutes = require('./routes/Roles')
const PermissionsRoutes = require('./routes/Permissions')
const UsersRoutes = require('./routes/Users')


function boot(app)
{
    // Boot application 
    // const app = express()
    const host = process.env.SERVER_HOST
    const port = process.env.SERVER_PORT
    // var server = http.createServer(app);
    // server.listen(port, host);
    let server = app.listen(port,host);


    server.on('listening', function() {
        console.log(`Example app listening on port http:\/\/${server.address().address}:${port}`)
    })



    return app    
}

function registerRoutes()
{
    
    const app = express();


    // Load json parser
    app.use(bodyParser.json())
    
    // Load API Routes
    const router = express.Router()
    const apiAuthRoutes = AuthRoutes(router, {});
    app.use('/api/auth', apiAuthRoutes)


    const apiUserRoutes = UsersRoutes(router, {});
    app.use('/api', apiUserRoutes)
    

    const apiRoleRoutes = RolesRoutes(router, {});
    app.use('/api', apiRoleRoutes)


    const apiPermissionRoutes = PermissionsRoutes(router, {});
    app.use('/api', apiPermissionRoutes)
    
    // const apiPermissionRoutes = PermissionsRoutes(router, {});
    // app.use('/api/permission', apiPermissionRoutes)

    app.get('*', function(req, res){
        res.status(404).send('not found');
    });
    app.post('*', function(req, res){
        res.status(404).send('not found');
    });

    return app
}


module.exports =  { boot , registerRoutes }