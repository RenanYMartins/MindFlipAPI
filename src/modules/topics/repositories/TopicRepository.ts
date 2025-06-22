import { DatabaseSingleton } from '@/src/config/DatabaseSingleton';
import { CreateTopic } from '../models/CreateTopic';
import { Result } from '@shared/models/Result';
import { TopicAdapter } from '@shared/adapters/TopicAdapter';
import { UserAdapter } from '@shared/adapters/UserAdapter';
import { Topic } from '@shared/models/Topic';

export class TopicRepository {
    private readonly db = DatabaseSingleton.getInstance();
    private readonly topicAdapter = new TopicAdapter();

    public async create(topic: CreateTopic): Promise<Result<Topic>> {
        const result = await this.db.execute(async (client) => {
            return await Promise.all([
                client.topic.create({
                    data: topic
                }),
                client.user.findUnique({
                    where: {
                        id: topic.userId
                    }
                })
            ]);
        });

        if (result.isError) {
            return Result.error(result.error!);
        }

        const user = new UserAdapter().fromEntity(result.value![1]!);
        return Result.ok(this.topicAdapter.fromEntity(result.value![0], user.summary()));
    }
}
