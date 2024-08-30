import 'reflect-metadata';
import express from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { AppDataSource } from './config/dataSource';
// import { createUserIndex } from './config/elasticSearch';
import { swaggerOptions } from './config/swagger';
import userRoutes from './user/user.routes';

const app = express();
app.use(express.json());

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/users', userRoutes);

// Start the server
AppDataSource.initialize()
  .then(async () => {
    // await createUserIndex();
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
      console.log('Swagger Docs are available at http://localhost:3000/api-docs');
    });
  })
  .catch((error) => console.log(error));
