import {
    Topic as TopicEntity,
    TopicAction as TopicActionEntity,
    Action as ActionEntity,
    User as UserEntity
} from '@/generated/prisma';
import { TopicAction } from '@shared/models/TopicAction';
import { TopicAdapter } from './TopicAdapter';
import { ActionAdapter } from './ActionAdapter';

export class TopicActionAdapter {
    private readonly topicAdapter = new TopicAdapter();
    private readonly actionAdapter = new ActionAdapter();

    public fromEntity(
        entity: TopicActionEntity & {
            topic: TopicEntity & { user: UserEntity };
            action: ActionEntity & { user: UserEntity };
        }
    ): TopicAction {
        return new TopicAction({
            action: this.actionAdapter.fromEntity(entity.action),
            topic: this.topicAdapter.fromEntity(entity.topic)
        });
    }
}
