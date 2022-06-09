import { initDb,closeConnection } from './database/init.js'
import { initAcl } from "./acl/init";
import { boot, registerRoutes } from "./app";

require("dotenv").config({ path: ".env.local", debug: true });

// Load database
initDb()
// Load ACL 
initAcl()
// Load App
boot(registerRoutes())

