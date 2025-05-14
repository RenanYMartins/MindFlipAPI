export class User {
    public id: number;
    public name: string;
    public email: string;
    public password: string;
    public createdAt: Date;

    public constructor(id: number, name: string, email: string, password: string, createdAt: Date) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.createdAt = createdAt;
    }

}