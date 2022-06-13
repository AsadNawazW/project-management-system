import { initDb } from './database/init';
import { boot, registerRoutes } from './app';

require('dotenv').config({ path: '.env.local', debug: true });

// Load database
initDb();
// Load App
boot(registerRoutes());
