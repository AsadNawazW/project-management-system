import { initDb } from './database/init';
import initAcl from './acl/init';
import { boot, registerRoutes } from './app';
import initListeners from './listeners/init';
import initRedis from './redis/init';

require('dotenv').config({ path: '.env.local', debug: true });

// Load database
initDb();
// Load ACL
initAcl();
// Init Listeners
initListeners();
// Init Redis
initRedis();
// Load App
boot(registerRoutes());
