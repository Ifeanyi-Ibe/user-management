export const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'User Management API',
        version: '1.0.0',
        description: 'API for managing users',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000', // Update with your server URL
      },
    ],
    apis: ["src/**/**.routes{.ts,.js}"],
};
  