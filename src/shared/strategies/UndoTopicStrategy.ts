import { DatabaseSingleton } from '@/src/config/DatabaseSingleton';
import { TopicAdapter } from '@shared/adapters/TopicAdapter';
import { BaseException } from '@shared/enums/BaseExceptionEnum';
import { CommandTarget } from '@shared/enums/CommandTargetEnum';
import { IUndoStrategy } from '@shared/interfaces/IUndoStrategy';
import { Action } from '@shared/models/Action';
import { Result } from '@shared/models/Result';
import { Topic } from '@shared/models/Topic';

export class UndoTopicStrategy implements IUndoStrategy<Topic> {
    private readonly db = DatabaseSingleton.getInstance();
    private readonly adapter = new TopicAdapter();

    public async undo(action: Action): Promise<Result<Topic>> {
        if (action.target != CommandTarget.topic) {
            return BaseException.default;
        }

        const topicAction = await this.db.execute((client) =>
            client.topicAction.findUnique({ where: { actionId: action.id } })
        );

        if (topicAction.isError) {
            return Result.error(topicAction.error!);
        }

        const topic = await this.db.transaction(async (client) => {
            await client.action.delete({ where: { id: action.id } });
            return client.topic.delete({ where: { id: topicAction.value!.topicId }, include: { user: true } });
        });

        if (topic.isError) {
            return Result.error(topic.error!);
        }

        return Result.ok(this.adapter.fromEntity(topic.value!));
    }
}
