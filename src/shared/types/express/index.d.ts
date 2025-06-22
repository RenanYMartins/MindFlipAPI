import { AuthUser } from '@shared/models/AuthUser';

declare module 'express-serve-static-core' {
    interface Request {
        user?: AuthUser;
    }
}
