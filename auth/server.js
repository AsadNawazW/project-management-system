// Load ENV files
import { config } from "dotenv";
config();

// Load database
import { initDb,closeConnection } from './database/init.js'
initDb()

// Load ACL
import { initAcl } from "./acl/init";
initAcl()

// Load App
import { boot, registerRoutes } from "./app";
boot(registerRoutes())