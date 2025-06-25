import { Topic } from '@shared/models/Topic';
import { Topic as TopicEntity, User as UserEntity } from '@/generated/prisma';
import { UserSummary } from '@shared/models/UserSummary';
import { UserAdapter } from './UserAdapter';

export class TopicAdapter {
    public fromEntity(entity: { topic: TopicEntity; user: UserEntity; subTopics?: TopicEntity[] }): Topic {
        const user = new UserAdapter().fromEntity(entity.user);

        return new Topic({
            id: entity.topic.id,
            name: entity.topic.name,
            color: entity.topic.color,
            user: user.summary()
            subTopics: entity.subTopics != null ? entity.subTopics!.map((topic) => this.fromEntity({ topic: topic })) : undefined
        });
    }
}
