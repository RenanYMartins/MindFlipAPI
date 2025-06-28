import { sign, verify } from 'jsonwebtoken';
import { HttpException } from '@shared/exceptions/HttpException';
import { Result } from '@shared/models/Result';
import { HttpStatus } from '@shared/enums/HttpStatusEnum';
import { AuthUser } from '@shared/models/AuthUser';
import { ApiToken } from '@shared/models/ApiToken';

export class JwtFacade {
    public validate(token: string): Result<AuthUser> {
        try {
            const payload = verify(token, process.env.AUTH_KEY!) as unknown as ApiToken;
            return Result.ok(AuthUser.fromToken(payload));
        } catch (error) {
            return Result.error(new HttpException(HttpStatus.UNAUTHORIZED, 'Acesso não autorizado'));
        }
    }

    public generate(user: AuthUser): string {
        return sign({ ...user }, process.env.AUTH_KEY!);
    }
}
