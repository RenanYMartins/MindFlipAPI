export class LoginResponseDTO {
    public token: string;

    public constructor(token: string) {
        this.token = token;
    }
}
