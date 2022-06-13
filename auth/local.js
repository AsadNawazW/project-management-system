import { initDb } from './database/init';
import initAcl from './acl/init';
import { boot, registerRoutes } from './app';
import AuthListener from './listeners/AuthListener';

require('dotenv').config({ path: '.env.local', debug: true });

// Load database
initDb();
// Load ACL
initAcl();
// Load App
boot(registerRoutes());


let authListener = new AuthListener();