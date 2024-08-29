import 'reflect-metadata';
import express from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { AppDataSource } from './config/dataSource';
import { UserController } from './controllers/User';
// import { createUserIndex } from './config/elasticSearch';
import { swaggerOptions } from './config/swagger';

const app = express();
app.use(express.json());

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users.
 */
app.get('/users', UserController.getUsers);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully.
 */
app.post('/users', UserController.createUser);

app.put('/users/:id', UserController.updateUser);
app.delete('/users/:id', UserController.deleteUser);

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
