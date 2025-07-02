import { IActionRepository } from '@shared/interfaces/IActionRepository';
import { ICommand } from '../interfaces/ICommand';
import { Result } from '@shared/models/Result';
import { DatabaseSingleton } from '@/src/config/DatabaseSingleton';
import { ActionRepository } from '@shared/repositories/ActionRepository';
import { PrismaClient } from '@prisma/client';
import { HttpException } from '@shared/exceptions/HttpException';
import { HttpStatus } from '@shared/enums/HttpStatusEnum';
import { CommandTarget } from '@shared/enums/CommandTargetEnum';

export class SaveCommand<T> implements ICommand<T> {
    private readonly action = new ActionRepository();
    private readonly repository: IActionRepository<T>;
    private readonly db = DatabaseSingleton.getInstance();

    public constructor(repository: IActionRepository<T>) {
        this.repository = repository;
    }

    public async execute(value: unknown, target: CommandTarget, userId: number): Promise<Result<T>> {
        try {
            const transaction = await this.db.client.$transaction(async (tx: PrismaClient) => {
                const result = await this.repository.create(value, tx);
                if (result.isError) {
                    throw new Error();
                }

                const newAction = await this.action.register(tx, 'save', target, userId);
                if (newAction.isError) {
                    throw new Error();
                }

                const relation = await this.repository.registerAction(tx, newAction.value!, result.value!);
                if (relation.isError) {
                    throw new Error();
                }

                return result.value!;
            });

            return Result.ok(transaction);
        } catch (error) {
            console.error(error);
            return Result.error(new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, 'Ocorreu um erro inesperado'));
        }
    }
}
