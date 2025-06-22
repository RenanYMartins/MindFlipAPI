import { UserAdapter } from '@shared/adapters/UserAdapter';
import { DatabaseSingleton } from '@/src/config/DatabaseSingleton';
import { User } from '@shared/models/User';
import { Result } from '@shared/models/Result';

export class AuthRepository {
    private readonly db = DatabaseSingleton.getInstance();

    public async login(email: string, password: string): Promise<Result<User | null>> {
        const result = await this.db.execute((client) =>
            client.user.findUnique({
                where: {
                    email: email,
                    password: password
                }
            })
        );

        if (result.isError) {
            return Result.error(result.error!);
        }

        if (result.value == null) {
            return Result.ok(null);
        }

        return Result.ok(new UserAdapter().fromEntity(result.value!));
    }
}
