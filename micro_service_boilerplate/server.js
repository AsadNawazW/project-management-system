import cluster from 'cluster';
import { config } from 'dotenv';
import { initDb } from './database/init';
import { boot, registerRoutes } from './app';
import initListeners from './listeners/init';

config();

if (cluster.isPrimary) {
  const threads = process.CLUSTER_THREADS || 4;

  for (let i = 0; i < threads; i += 1) {
    cluster.fork();
  }
} else {
  // Load database
  initDb();
  // Load Listeners
  initListeners();
  // Load App
  boot(registerRoutes());
}
