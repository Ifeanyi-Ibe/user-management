import 'reflect-metadata';
import express from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { AppDataSource } from './config/dataSource';
// import { createUserIndex } from './config/elasticSearch';
import { swaggerOptions } from './config/swagger';
import userRoutes from './user/user.routes';
import { errorHandler } from './middlewares/errorHandler';
import logger from './utils/logger';

const app = express();
app.use(express.json());

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/users', userRoutes);

app.use(errorHandler);

// Start the server
AppDataSource.initialize()
  .then(async () => {
    // await createUserIndex();
    const server = app.listen(3000, () => {
      console.log('Server is running on port 3000');
      console.log('Swagger Docs are available at http://localhost:3000/api-docs');
    });

    const gracefulShutdown = (signal: string) => {
      logger.info(`Received ${signal}. Shutting down gracefully...`);
      server.close(() => {
        logger.info('Closed out remaining connections.');
        process.exit(0);
      });
    
    // If still not shutting down after some time, force exit
    setTimeout(() => {
      logger.error('Could not close connections in time, forcefully shutting down.');
      process.exit(1);
    }, 10000); // 10 seconds

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    };
  })
  .catch((error) => console.log(error));

  
