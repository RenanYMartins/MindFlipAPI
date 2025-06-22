import { Topic } from '@shared/models/Topic';
import { Topic as TopicEntity } from '@/generated/prisma';
import { UserSummary } from '@shared/models/UserSummary';

export class TopicAdapter {
    public fromEntity(entity: TopicEntity, user: UserSummary): Topic {
        return new Topic({ id: entity.id, name: entity.name, color: entity.color, user: user });
    }
}
