export class CreateUser {
    public name: string;
    public email: string;
    public password: string;

    public constructor(name: string, email: string, password: string) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

}