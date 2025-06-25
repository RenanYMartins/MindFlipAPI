import { HttpException } from '@shared/exceptions/HttpException';

export class PaginatedResult<T> {
    private readonly _success: boolean;
    private readonly _page?: number;
    private readonly _total?: number;
    private readonly _value?: T[];
    private readonly _error?: HttpException;

    private constructor({
        success,
        page,
        total,
        value,
        error
    }: {
        success: boolean;
        page?: number;
        total?: number;
        value?: T[];
        error?: HttpException;
    }) {
        this._success = success;
        this._page = page;
        this._total = total;
        this._value = value;
        this._error = error;
    }

    static ok<T>(data: { page: number; total: number; value: T[] }): PaginatedResult<T> {
        return new PaginatedResult<T>({
            success: true,
            page: data.page,
            total: data.total,
            value: data.value
        });
    }

    static error(error: HttpException): PaginatedResult<never> {
        return new PaginatedResult<never>({ success: false, error: error });
    }

    get isSuccess(): boolean {
        return this._success;
    }

    get isError(): boolean {
        return !this._success;
    }

    get page(): number {
        return this._page as number;
    }

    get total(): number {
        return this._total as number;
    }

    get value(): T[] | undefined {
        return this._value as T[];
    }

    get error(): HttpException | undefined {
        return this._error;
    }

    map<U>(fn: (value: T[]) => U[]): PaginatedResult<U> {
        return this._success
            ? PaginatedResult.ok({
                  page: this._page as number,
                  total: this._total as number,
                  value: fn(this._value as T[])
              })
            : PaginatedResult.error(this._error!);
    }
}
