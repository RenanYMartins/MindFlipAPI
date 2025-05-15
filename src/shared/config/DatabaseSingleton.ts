import { PrismaClient } from '@/generated/prisma/client';
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

    public async execute<T>(cb: (client: PrismaClient) => Promise<T>): Promise<Result<T>> {
        try {
            return Result.ok(await cb(this._client));
        } catch (error) {
            console.error(error);
            return Result.error(
                new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, 'Ocorreu um erro inesperado')
            );
        }
    }
}
