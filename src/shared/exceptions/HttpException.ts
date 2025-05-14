import { HttpStatus } from '../enums/HttpStatusEnum';

export class HttpException extends Error {
    private _status: HttpStatus;
    private _message?: string;

    constructor(status: HttpStatus, message?: string) {
        super();

        this._status = status;
        this._message = message;
    }

    public get status(): HttpStatus {
        return this._status;
    }

    public get message(): string {
        return this._message ?? 'Um erro inesperado ocorreu'
    }
}
