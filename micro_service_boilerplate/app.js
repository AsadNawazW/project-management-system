// Load global imports
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import ModelRoutes from './routes/Models';
import swaggerDocument from './swagger.json';

export function boot(app) {
  // Boot application
  // const app = express()
  const host = process.env.SERVER_HOST;
  const port = process.env.SERVER_PORT;
  const server = app.listen(port, host);

  server.on('listening', () => {
    console.log(`Example app listening on port http:\/\/${server.address().address}:${port}`)
  });

  // Load Security Headers
  app.use(helmet.contentSecurityPolicy());
  app.use(helmet.crossOriginEmbedderPolicy());
  app.use(helmet.crossOriginOpenerPolicy());
  app.use(helmet.crossOriginResourcePolicy());
  app.use(helmet.dnsPrefetchControl());
  app.use(helmet.expectCt());
  app.use(helmet.frameguard());
  app.use(helmet.hidePoweredBy());
  app.use(helmet.hsts());
  app.use(helmet.ieNoOpen());
  app.use(helmet.noSniff());
  app.use(helmet.originAgentCluster());
  app.use(helmet.permittedCrossDomainPolicies());
  app.use(helmet.referrerPolicy());
  app.use(helmet.xssFilter());

  // Allow Nginx X-Forwarded headers to work
  app.enable('trust proxy');

  return app;
}

export function registerRoutes() {
  const app = express();

  // Load json parser
  app.use(bodyParser.json());

  // Load API Routes
  const router = express.Router();
  const modelRoutes = ModelRoutes(router, {});
  app.use('/api', modelRoutes);

  app.use('/api-docs', (req, res, next) => {
    swaggerDocument.host = `${req.get('host')}/api`;
    req.swaggerDoc = swaggerDocument;
    next();
  }, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.get('*', (req, res) => { 
    res.status(404).send('not found');
  });
  app.post('*', (req, res) => {
    res.status(404).send('not found');
  });

  return app;
}
