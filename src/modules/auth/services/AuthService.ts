import { JwtService } from '@shared/services/JwtService';
import { AuthRepository } from '../repositories/AuthRepository';
import { AuthUser } from '@shared/models/AuthUser';

export class AuthService {
    private repository: AuthRepository;
    private jwt: JwtService;

    public constructor() {
        this.repository = new AuthRepository();
        this.jwt = new JwtService();
    }

    public login(email: string, password: string): string {
        return this.jwt.generate(
            new AuthUser({
                id: 1,
                name: 'Nome',
                email: email
            })
        );
    }
}
