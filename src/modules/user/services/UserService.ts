import { User } from '@shared/models/User';
import { UserRepository } from '../repositories/UserRepository';
import { Result } from '@shared/models/Result';
import { CreateUser } from '../models/CreateUser';
import { BaseException } from '@shared/enums/BaseExceptionEnum';
import { UpdateUser } from '../models/UpdateUser';

export class UserService {
    public constructor(private readonly repository: UserRepository) {}

    public async registerUser(user: CreateUser): Promise<Result<User>> {
        return await this.repository.create(user);
    }

    public async updateUser(user: UpdateUser): Promise<Result<User>> {
        return await this.repository.update(user);
    }

    public async getById(userId: number): Promise<Result<User>> {
        const user = await this.repository.getById(userId);

        if (user.isError) {
            return Result.error(user.error!);
        }

        if (user.value == null) {
            return BaseException.notFound('usuário');
        }

        return user as Result<User>;
    }
}
