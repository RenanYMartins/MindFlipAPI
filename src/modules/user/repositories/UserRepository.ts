import { DatabaseSingleton } from '@config/DatabaseSingleton';
import { UserAdapter } from '@shared/adapters/UserAdapter';
import { Result } from '@shared/models/Result';
import { User } from '@shared/models/User';
import { CreateUser } from '../models/CreateUser';
import { UpdateUser } from '../models/UpdateUser';

export class UserRepository {
    private readonly db = DatabaseSingleton.getInstance();
    private readonly adapter = new UserAdapter();

    public async create(user: CreateUser): Promise<Result<User>> {
        const result = await this.db.execute((client) =>
            client.user.create({
                data: user
            })
        );

        if (result.isError) {
            return Result.error(result.error!);
        }

        return Result.ok(this.adapter.fromEntity(result.value!));
    }

    public async update(user: UpdateUser): Promise<Result<User>> {
        const result = await this.db.execute((client) =>
            client.user.update({
                data: { name: user.name, email: user.email, password: user.password },
                where: { id: user.id }
            })
        );

        return result.map((user) => this.adapter.fromEntity(user));
    }

    public async getById(userId: number): Promise<Result<User | null>> {
        const result = await this.db.execute((client) => client.user.findUnique({ where: { id: userId } }));

        if (result.isError) {
            return Result.error(result.error!);
        }

        return Result.ok(this.adapter.fromEntity(result.value!));
    }
}
