import cluster from 'cluster';
import { config } from 'dotenv';
import { initDb } from './database/init';
import initAcl from './acl/init';
import { boot, registerRoutes } from './app';
import initListeners from './listeners/init';
import initRedis from './redis/init';

if (process.env.LOCAL_MODE) {
  config({ path: '.env.local', debug: true });
} else {
  config();
}

if (cluster.isPrimary && !process.env.NO_CLUSTERING) {
  const threads = process.CLUSTER_THREADS || 4;

  for (let i = 0; i < threads; i += 1) {
    cluster.fork();
  }
} else {
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
}
