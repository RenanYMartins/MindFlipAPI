import { Topic } from '@shared/models/Topic';
import { Topic as TopicEntity, User as UserEntity } from '@/generated/prisma';
import { UserAdapter } from './UserAdapter';

export class TopicAdapter {
    public fromEntity(
        entity: TopicEntity & { user: UserEntity; subTopics?: (TopicEntity & { user: UserEntity })[] }
    ): Topic {
        const user = new UserAdapter().fromEntity(entity.user);

        return new Topic({
            id: entity.id,
            name: entity.name,
            color: entity.color,
            user: user.summary(),
            subTopics:
                entity.subTopics != undefined ? entity.subTopics!.map((topic) => this.fromEntity(topic)) : undefined
        });
    }
}
