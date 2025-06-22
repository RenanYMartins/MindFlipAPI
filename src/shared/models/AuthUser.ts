import { ApiToken } from './ApiToken';

export type AuthUserConstructor = {
    id: number;
    name: string;
    email: string;
};

export class AuthUser {
    public id: number;
    public name: string;
    public email: string;

    public constructor(data: AuthUserConstructor) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
    }

    static fromToken(token: ApiToken): AuthUser {
        return new AuthUser({ id: token.id, name: token.name, email: token.email });
    }
}
