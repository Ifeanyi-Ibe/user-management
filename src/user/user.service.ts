import { User } from './user.entity';
import { LoginDto } from './dto/login-dto';
import { AppDataSource } from '../config/dataSource';
import { CreateUserDto } from './dto/create-user';
const userRepository = AppDataSource.getRepository(User);

export class UserService {
    static async getUsers(): Promise<User[]> {
        return await userRepository.find();
    } 

    static async login({email, password}: LoginDto): Promise<User | null> {
        const user = await userRepository.findOneBy({email});    
        // if (await argon2.verify(user.password, password)) {
        //   return user;
        // }
        return user;
        // return null;
    }
    
    static async createUser({ username, password, email, firstname, lastname, bio }: CreateUserDto): Promise<User> {
        const user = userRepository.create({ username, password, email, firstname, lastname, bio });
        await userRepository.save(user);

        return user;
    }
}  