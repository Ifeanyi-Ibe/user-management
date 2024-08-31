import { User } from "../entities/user.entity"

export class UsersEnvelope
{
    totalCount: number;
    data: User[];
}