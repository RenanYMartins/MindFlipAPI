export class UpdateUser {
    public id: number;
    public name: string;
    public email: string;
    public password: string;

    public constructor(id: number, name: string, email: string, password: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
}
