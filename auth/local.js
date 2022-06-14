import { initDb } from './database/init';
import initAcl from './acl/init';
import { boot, registerRoutes } from './app';
import initListeners from './listeners/init';

require('dotenv').config({ path: '.env.local', debug: true });

// Load database
initDb();
// Load ACL
initAcl();
// Init Listeners
initListeners();
// Load App
boot(registerRoutes());
