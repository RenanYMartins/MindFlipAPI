import { JwtService } from '@shared/services/JwtService';
import { AuthRepository } from '../repositories/AuthRepository';
import { AuthUser } from '@shared/models/AuthUser';
import { Result } from '@shared/models/Result';
import { HttpException } from '@shared/exceptions/HttpException';
import { HttpStatus } from '@shared/enums/HttpStatusEnum';

export class AuthService {
    private repository: AuthRepository;
    private jwt: JwtService;

    public constructor() {
        this.repository = new AuthRepository();
        this.jwt = new JwtService();
    }

    public async login(email: string, password: string): Promise<Result<string>> {
        const user = await this.repository.login(email, password);

        if (user.isError) {
            return Result.error(user.error!);
        }

        if (user.value == null) {
            return Result.error(
                new HttpException(HttpStatus.UNAUTHORIZED, 'Email e/ou senha inválidos')
            );
        }

        return Result.ok(
            this.jwt.generate(
                new AuthUser({
                    id: user.value!.id,
                    name: user.value!.name,
                    email: user.value!.email
                })
            )
        );
    }
}
