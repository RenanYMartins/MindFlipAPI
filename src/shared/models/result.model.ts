export class Result<T, E extends Error> {
    private readonly _success: boolean;
    private readonly _value?: T;
    private readonly _error?: E;

    private constructor({ success, value, error }: { success: boolean; value?: T; error?: E }) {
        this._success = success;
        this._value = value;
        this._error = error;
    }

    static ok<T>(value: T): Result<T, never> {
        return new Result<T, never>({ success: true, value: value });
    }

    static error<E extends Error>(error: E): Result<never, E> {
        return new Result<never, E>({ success: false, error: error });
    }

    get isSuccess(): boolean {
        return this._success;
    }

    get isError(): boolean {
        return !this._success;
    }

    get value(): T {
        return this._value as T;
    }

    get error(): E {
        return this._error as E;
    }

    map<U>(fn: (value: T) => U): Result<U, E> {
        return this._success ? Result.ok(fn(this._value as T)) : Result.error(this._error as E);
    }
}
