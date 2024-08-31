import { User } from './entities/user.entity';
import { LoginDto } from './dto/login-dto';
import { AppDataSource } from '../config/dataSource';
import { CreateUserDto } from './dto/create-user';
import { UsersEnvelope } from './dto/users-envelope';
import { CreateProfileDto, UpdateProfileDto } from './dto/create-profile-dto';
import { NotFoundError } from '../errors/notFound';
import { UserProfile } from './entities/profile.entity';
const userRepository = AppDataSource.getRepository(User);
const profileRepository = AppDataSource.getRepository(UserProfile);

export class UserService {
    // static async getUsers(): Promise<User[]> {
    //     return await userRepository.find();
    // } 

    static async login({email, password}: LoginDto): Promise<User | null> {
        const user = await userRepository.findOneBy({email});    
        // if (await argon2.verify(user.password, password)) {
        //   return user;
        // }
        return user;
        // return null;
    }
    
    static async createUser({ username, password, email, firstname, lastname, bio }: CreateUserDto): Promise<User> {
        // const user = userRepository.create({ username, password, email, firstname, lastname, bio });
        const savedUser: User = await userRepository.save({ username, password, email, firstname, lastname, bio });
        console.log("New user", savedUser);
        return savedUser;
    }

    static async getUsers(): Promise<UsersEnvelope> {
        const [ users, count ] = await userRepository.findAndCount({ relations: { profile: true } });

        const response = new UsersEnvelope();
        response.data = users;
        response.totalCount = count;

        return response;
    }

    static async saveUserProfile({ userId, profileData }: CreateProfileDto ): Promise<any> {
        const user = await userRepository.findOneBy({ id: userId});

        if(!user) {
            throw new NotFoundError("No user found for provided ID");
        }

        const userProfile = new UserProfile();

        userProfile.bio = profileData?.bio;
        userProfile.nationality = profileData?.nationality;
        userProfile.gender = profileData?.gender;
        userProfile.occupation = profileData?.occupation;

        userProfile.user = user;

        const savedUser = await profileRepository.save(userProfile);
        return savedUser;
    }

    static async updateUserProfile({ profileId, profileData }: UpdateProfileDto ): Promise<any> {
        const profile = await profileRepository.findOneBy({ id: profileId});

        if(!profile) {
            throw new NotFoundError("No profile found for provided ID");
        }

        profile.bio = profileData.bio ?? profile.bio;
        profile.nationality = profileData.nationality ?? profile.nationality;
        profile.gender = profileData.gender ?? profile.gender;
        profile.occupation = profileData.occupation ?? profile.occupation;

        const modifiedProfile = await profileRepository.save(profile);
        return modifiedProfile;
    }
}  