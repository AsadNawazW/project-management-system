import cluster from 'cluster';
import { config } from 'dotenv';
import { initDb } from './database/init';
import initAcl from './acl/init';
import { boot, registerRoutes } from './app';

config();

if (cluster.isPrimary) {
  const threads = process.CLUSTER_THREADS || 4;

  for (let i = 0; i < threads; i += 1) {
    cluster.fork();
  }
} else {
  // Load database
  initDb();
  // Load ACL
  initAcl();
  // Load App
  boot(registerRoutes());
}
