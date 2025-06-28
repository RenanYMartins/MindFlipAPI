import { Result } from '@shared/models/Result';

export interface ICommand<T> {
    execute(value: T): Promise<Result<T>>;
}
