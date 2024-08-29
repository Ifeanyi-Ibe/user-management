import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import dotenv from 'dotenv';

dotenv.config();

const { 
  DB_HOST: host,
  DB_PORT: port,
  DB_USER: username,
  DB_PASSWORD: password,
  DB_NAME: database
 } = process.env;

export const AppDataSource = new DataSource({
  type: 'postgres',
  host,
  port: parseInt(port || '5432', 100),
  username,
  password,
  database,
  synchronize: true, // Optional: Use with caution in production
  entities: [User],
});

AppDataSource.initialize()
  .then(() => console.log('Data Source has been initialized!'))
  .catch(err => console.error('Error during Data Source initialization\n', err));

