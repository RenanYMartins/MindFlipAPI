export class PaginatedResult<T, E extends Error> {
    private readonly _success: boolean;
    private readonly _page?: number;
    private readonly _total?: number;
    private readonly _value?: T[];
    private readonly _error?: E;

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
        error?: E;
    }) {
        this._success = success;
        this._page = page;
        this._total = total;
        this._value = value;
        this._error = error;
    }

    static ok<T>(data: { page: number; total: number; value: T[] }): PaginatedResult<T, never> {
        return new PaginatedResult<T, never>({
            success: true,
            page: data.page,
            total: data.total,
            value: data.value
        });
    }

    static error<E extends Error>(error: E): PaginatedResult<never, E> {
        return new PaginatedResult<never, E>({ success: false, error: error });
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

    get value(): T[] {
        return this._value as T[];
    }

    get error(): E {
        return this._error as E;
    }

    map<U>(fn: (value: T[]) => U[]): PaginatedResult<U, E> {
        return this._success
            ? PaginatedResult.ok({
                page: this._page as number,
                total: this._total as number,
                value: fn(this._value as T[])
            })
            : PaginatedResult.error(this._error as E);
    }
}
