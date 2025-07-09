import { PrismaClient } from '@prisma/client';
import { DatabaseSingleton } from '@config/DatabaseSingleton';
import { ActionAdapter } from '@shared/adapters/ActionAdapter';
import { Action } from '@shared/models/Action';
import { Result } from '@shared/models/Result';

export class ActionRepository {
    private readonly db = DatabaseSingleton.getInstance();
    private readonly adapter = new ActionAdapter();

    public async register(
        client: PrismaClient,
        method: string,
        target: string,
        userId: number
    ): Promise<Result<Action>> {
        const result = await this.db.execute(
            (client) =>
                client.action.create({
                    data: { method: method, target: target, userId: userId },
                    include: { user: true }
                }),
            client
        );

        if (result.isError) {
            return Result.error(result.error!);
        }

        return Result.ok(this.adapter.fromEntity(result.value!));
    }

    public async getLast(userId: number): Promise<Result<Action | null>> {
        const result = await this.db.execute((client) =>
            client.action.findFirst({
                include: {
                    user: true,
                    FlashcardAction: { include: { flashcard: true } },
                    TopicAction: { include: { topic: true } }
                },
                where: { userId: userId },
                orderBy: { id: 'desc' }
            })
        );

        if (result.isError) {
            return Result.error(result.error!);
        }

        if (result.value == null) {
            return Result.ok(null);
        }

        return Result.ok(this.adapter.fromEntity(result.value));
    }
}
