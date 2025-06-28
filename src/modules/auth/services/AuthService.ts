import { JwtFacade } from '@shared/facades/JwtFacade';
import { AuthRepository } from '../repositories/AuthRepository';
import { AuthUser } from '@shared/models/AuthUser';
import { Result } from '@shared/models/Result';
import { HttpException } from '@shared/exceptions/HttpException';
import { HttpStatus } from '@shared/enums/HttpStatusEnum';

export class AuthService {
    private repository: AuthRepository;
    private jwt: JwtFacade;

    public constructor() {
        this.repository = new AuthRepository();
        this.jwt = new JwtFacade();
    }

    public async login(email: string, password: string): Promise<Result<string>> {
        const user = await this.repository.login(email, password);

        if (user.isError) {
            return Result.error(user.error!);
        }

        if (user.value == null) {
            return Result.error(new HttpException(HttpStatus.UNAUTHORIZED, 'Email e/ou senha inválidos'));
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
