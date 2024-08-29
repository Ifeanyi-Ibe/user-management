import { User } from './user.entity';
import { LoginDto } from './dto/login-dto';
import { AppDataSource } from '../config/dataSource';

export class UserService {
    async findAll(): Promise<User[]> {
        return await AppDataSource.getRepository(User).find();
    }

    async findOne({email, password}: LoginDto): Promise<User | null> {
        const user = await AppDataSource.getRepository(User).findOneBy({email});
        if (!user) {
          return null;
        }
    
        // if (await argon2.verify(user.password, password)) {
        //   return user;
        // }
        return user;
        // return null;
    }
    
    
}  