import { DatabaseSingleton } from '@/src/config/DatabaseSingleton';
import { CreateTopic } from '../models/CreateTopic';
import { Result } from '@shared/models/Result';
import { TopicAdapter } from '@shared/adapters/TopicAdapter';
import { Topic as TopicEntity } from '@/generated/prisma';
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

        return Result.ok(this.topicAdapter.fromEntity({ ...result.value![0], user: result.value![1]! }));
    }

    public async getById(topicId: number): Promise<Result<Topic>> {
        const result = await this.db.execute((client) =>
            client.topic.findUnique({
                include: {
                    subTopics: {
                        include: {
                            user: true
                        }
                    },
                    user: true
                },
                where: {
                    id: topicId
                }
            })
        );

        if (result.isError) {
            return Result.error(result.error!);
        }

        return Result.ok(this.topicAdapter.fromEntity(result.value!));
    }

    public async getAll(userId: number, skip: number, take: number): Promise<Result<Topic[]>> {
        const result = await this.db.execute((client) =>
            client.topic.findMany({
                include: {
                    user: true
                },
                where: {
                    userId: userId,
                    parentTopic: null
                },
                skip: skip,
                take: take
            })
        );

        if (result.isError) {
            return Result.error(result.error!);
        }

        return Result.ok(result.value!.map((topic) => this.topicAdapter.fromEntity(topic)));
    }

    public async getTotal(userId: number): Promise<Result<{ _count: number }>> {
        const result = await this.db.execute((client) => client.topic.aggregate({ _count: true }));

        if (result.isError) {
            return Result.error(result.error!);
        }

        return result;
    }
}
