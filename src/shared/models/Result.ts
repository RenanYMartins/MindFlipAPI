import { HttpException } from "@shared/exceptions/HttpException";

export class Result<T> {
    private readonly _success: boolean;
    private readonly _value?: T;
    private readonly _error?: HttpException;

    private constructor({ success, value, error }: { success: boolean; value?: T; error?: HttpException }) {
        this._success = success;
        this._value = value;
        this._error = error;
    }

    static ok<T>(value: T): Result<T> {
        return new Result<T>({ success: true, value: value });
    }

    static error(error: HttpException): Result<never> {
        return new Result<never>({ success: false, error: error });
    }

    get isSuccess(): boolean {
        return this._success;
    }

    get isError(): boolean {
        return !this._success;
    }

    get value(): T | undefined {
        return this._value;
    }

    get error(): HttpException | undefined {
        return this._error;
    }

    map<U>(fn: (value: T) => U): Result<U> {
        return this._success ? Result.ok(fn(this._value as T)) : Result.error(this._error!);
    }
}
