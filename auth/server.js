import os from 'os'
import cluster from 'cluster'
import { config } from "dotenv";
import { initDb,closeConnection } from './database/init.js'
import { initAcl } from "./acl/init";
import { boot, registerRoutes } from "./app";
import { spawn } from 'child_process'
config();

if(cluster.isPrimary)
{
    let threads = process.CLUSTER_THREADS || 4

    for(let i=0;i < threads;i++)
    {
        cluster.fork()
    }
}
else{    
  
    // Load database
    initDb()
    // Load ACL 
    initAcl()
    // Load App
    boot(registerRoutes())
}

