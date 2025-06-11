import { AuthUser } from '../../model/auth-user.model';

declare module 'express-serve-static-core' {
    interface Request {
        user?: AuthUser;
    }
}