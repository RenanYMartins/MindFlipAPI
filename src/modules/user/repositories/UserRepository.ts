import { DatabaseSingleton } from "@/src/config/DatabaseSingleton";
import { UserAdapter } from "@shared/adapters/UserAdapter";
import { CreateUser } from "@/src/modules/user/models/CreateUser";
import { Result } from "@shared/models/Result";
import { User } from "@shared/models/User";

export class UserRepository {
    private readonly db = DatabaseSingleton.getInstance();

    public async create(user: CreateUser): Promise<Result<User>> {
        const adapter = new UserAdapter();

        const result = await this.db.execute((client) =>
            client.user.create({
                data: user
            })
        );

        if (result.isError) {
            return Result.error(result.error!);
        }

        return Result.ok(adapter.fromEntity(result.value!));
    }
}