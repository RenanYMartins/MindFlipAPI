import { IRepository } from '@shared/interfaces/IRepository';
import { ICommand } from './ICommand';
import { Result } from '@shared/models/Result';

export class SaveFlashcardCommand<T extends { id: number }> implements ICommand<T> {
    private repository: IRepository<T>;

    public constructor(repository: IRepository<T>) {
        this.repository = repository;
    }

    async execute(value: T): Promise<Result<T>> {
        const result = await this.repository.create(value);

        if (result.isError) {
            return result;
        }

        // result.value!.
    }
}
