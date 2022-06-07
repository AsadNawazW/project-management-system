import { config } from "dotenv";
import { initDb,closeConnection } from './database/init.js'
import { initAcl } from "./acl/init";
import { boot, registerRoutes } from "./app";

config();

// Load database
initDb()
// Load ACL 
initAcl()
// Load App
boot(registerRoutes())

