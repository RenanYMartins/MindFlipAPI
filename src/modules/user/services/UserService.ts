import { User } from "@shared/models/User";
import { UserRepository } from "../repositories/UserRepository";
import { Result } from "@shared/models/Result";
import { CreateUser } from "@/src/modules/user/models/CreateUser";

export class UserService {
    private readonly repository = new UserRepository();

    public async registerUser(user: CreateUser): Promise<Result<User>> {
        return await this.repository.create(user);
    }
}