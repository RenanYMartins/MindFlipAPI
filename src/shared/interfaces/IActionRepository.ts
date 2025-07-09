import { PrismaClient } from '@prisma/client';
import { Action } from '@shared/models/Action';
import { Result } from '@shared/models/Result';

export interface IActionRepository<T> {
    create(value: unknown, client?: PrismaClient): Promise<Result<T>>;
    registerAction(client: PrismaClient, action: Action, value: T): Promise<Result<unknown>>;
}
