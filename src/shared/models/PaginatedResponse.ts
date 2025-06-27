export class PaginatedResponse<T> {
    private readonly _page?: number;
    private readonly _total?: number;
    private readonly _value?: T[];

    public constructor({ page, total, value }: { page?: number; total?: number; value?: T[] }) {
        this._page = page;
        this._total = total;
        this._value = value;
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
}
