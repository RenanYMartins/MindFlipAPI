export type AuthUserConstructor = {
    id: number;
    name: string;
    email: string;
}

export class AuthUser {
    public id: number;
    public name: string;
    public email: string;

    public constructor(data: AuthUserConstructor) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
    }
}