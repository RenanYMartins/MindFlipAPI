import { Result } from '@shared/models/Result';

export interface IRepository<T extends { id: number }> {
    create(value: T): Promise<Result<T>>;
    deleteById(id: number): Promise<T>;
}
