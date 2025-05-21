import { AuthRepository } from "../repositories/AuthRepository";

export class AuthService {
    private repository: AuthRepository;

    public constructor() {
        this.repository = new AuthRepository();
    }

    public async login(email: string, password: string): Promise<void> {

    }
}