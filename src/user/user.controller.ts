import { Request, Response } from 'express';
import { AppDataSource } from '../config/dataSource';
import { User } from './user.entity';
// import { esClient } from '../config/elasticSearch';

const userRepository = AppDataSource.getRepository(User);

export class UserController {
  static async createUser(req: Request, res: Response) {
    try {
      const { username, password, email, firstname, lastname, bio } = req.body;
      const user = userRepository.create({ username, password, email, firstname, lastname, bio });
      await userRepository.save(user);
      
      // Index user in Elasticsearch
      // await esClient.index({
      //   index: 'users',
      //   id: user.id.toString(),
      //   body: { id: user.id, username: user.username, email: user.email, isActive: user.isActive },
      // });

      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating user', error });
    }
  }

  static async getUsers(req: Request, res: Response) {
    try {
      const users = await userRepository.find();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching users', error });
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await userRepository.findOneBy({ id: parseInt(id) });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      userRepository.merge(user, req.body);
      await userRepository.save(user);

      // Update Elasticsearch index
      // await esClient.update({
      //   index: 'users',
      //   id: id,
      //   body: { doc: req.body },
      // });

      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating user', error });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await userRepository.findOneBy({ id: parseInt(id) });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      await userRepository.remove(user);

      // Remove from Elasticsearch index
      // await esClient.delete({ index: 'users', id: id });

      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting user', error });
    }
  }
}
