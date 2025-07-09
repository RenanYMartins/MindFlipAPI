import { User } from '@shared/models/User';
import { UserRepository } from '../repositories/UserRepository';
import { Result } from '@shared/models/Result';
import { CreateUser } from '../models/CreateUser';

export class UserService {
    public constructor(private readonly repository: UserRepository) {}

    public async registerUser(user: CreateUser): Promise<Result<User>> {
        return await this.repository.create(user);
    }
}
