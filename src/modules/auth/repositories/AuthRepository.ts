import { UserAdapter } from '@shared/adapters/UserAdapter';
import { DatabaseSingleton } from '@shared/database/DatabaseSingleton';
import { User } from '@shared/models/User';

export class AuthRepository {
    private db = DatabaseSingleton.getInstance();

    public async login(email: string, password: string): Promise<User | null> {
        const result = await this.db.execute((client) =>
            client.user.findUnique({
                where: {
                    email: email,
                    password: password
                }
            })
        );

        if (result.isError || result.value == null) {
            return null;
        }

        return new UserAdapter().fromEntity(result.value);
    }
}
