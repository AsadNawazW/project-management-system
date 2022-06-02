// Load ENV files
require('dotenv').config()

// Load database
let { initDb,closeConnection } = require('./database/init');
initDb()

// Load ACL
let { initAcl } = require('./acl/init');
initAcl()

// Load App
let { boot,registerRoutes } = require('./app');
boot(registerRoutes())