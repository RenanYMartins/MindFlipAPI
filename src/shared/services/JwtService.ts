import { sign, verify } from 'jsonwebtoken';
import { HttpException } from '@shared/exceptions/HttpException';
import { Result } from '@shared/models/Result';
import { HttpStatus } from '@shared/enums/HttpStatusEnum';
import { AuthUser } from '@shared/models/AuthUser';

export class JwtService {
    public validate(token: string) {
        try {
            console.log(verify(token, process.env.AUTH_KEY!));
            return Result.ok(true);
        } catch (error) {
            return Result.error(
                new HttpException(HttpStatus.UNAUTHORIZED, 'Acesso não autorizado')
            );
        }
    }

    public generate(user: AuthUser): string {
        return sign({ ...user }, process.env.AUTH_KEY!);
    }
}
