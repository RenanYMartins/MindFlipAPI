import { Prisma, PrismaClient } from '@prisma/client';
import { HttpStatus } from '@shared/enums/HttpStatusEnum';
import { HttpException } from '@shared/exceptions/HttpException';
import { Result } from '@shared/models/Result';

export class DatabaseSingleton {
    private static _instance: DatabaseSingleton;
    private _client: PrismaClient;

    private constructor() {
        this._client = new PrismaClient();
    }

    public static getInstance(): DatabaseSingleton {
        return (DatabaseSingleton._instance ??= new DatabaseSingleton());
    }

    public get client(): PrismaClient {
        return this._client;
    }

    public async execute<T>(cb: (client: PrismaClient) => Promise<T>, client?: PrismaClient): Promise<Result<T>> {
        try {
            return Result.ok(await cb(client ?? this._client));
        } catch (error) {
            console.error(error);
            return Result.error(new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, 'Ocorreu um erro inesperado'));
        }
    }

    public async transaction<T>(cb: (client: PrismaClient) => Promise<T>): Promise<Result<T>> {
        try {
            return Result.ok(await this._client.$transaction(cb as (client: Prisma.TransactionClient) => Promise<T>));
        } catch (error) {
            console.error(error);
            return Result.error(new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, 'Ocorreu um erro inesperado'));
        }
    }
}
