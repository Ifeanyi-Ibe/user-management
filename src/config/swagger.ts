export const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'User Management API',
        version: '1.0.0',
        description: 'API for managing users',
      },
    },
    apis: ['./src/server.ts'],
};
  