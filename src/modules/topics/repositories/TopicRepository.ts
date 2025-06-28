import { DatabaseSingleton } from '@/src/config/DatabaseSingleton';
import { CreateTopic } from '../models/CreateTopic';
import { Result } from '@shared/models/Result';
import { TopicAdapter } from '@shared/adapters/TopicAdapter';
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

    public async getById(topicId: number): Promise<Result<Topic | null>> {
        const result = await this.db.execute((client) =>
            client.topic.findUnique({
                include: {
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

        return Result.ok(result.value != null ? this.topicAdapter.fromEntity(result.value) : null);
    }

    public async getSubTopicsById(topicId: number, skip: number, take: number): Promise<Result<Topic[]>> {
        const result = await this.db.execute((client) =>
            client.topic.findUnique({
                select: {
                    subTopics: {
                        include: {
                            user: true
                        },
                        skip: skip,
                        take: take
                    }
                },
                where: {
                    id: topicId
                }
            })
        );

        if (result.isError) {
            return Result.error(result.error!);
        }

        return Result.ok(result.value!.subTopics.map((topic) => this.topicAdapter.fromEntity(topic)));
    }

    public async getSubTopicsTotal(topicId: number): Promise<Result<{ total: number }>> {
        const result = await this.db.execute((client) =>
            client.topic.findUnique({
                select: {
                    _count: {
                        select: {
                            subTopics: true
                        }
                    }
                },
                where: {
                    id: topicId
                }
            })
        );

        if (result.isError) {
            return Result.error(result.error!);
        }

        return Result.ok({ total: result.value!._count.subTopics });
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

    public async getTotal(userId: number): Promise<Result<{ total: number }>> {
        const result = await this.db.execute((client) =>
            client.topic.count({ where: { parentTopic: null, userId: userId } })
        );

        if (result.isError) {
            return Result.error(result.error!);
        }

        return Result.ok({ total: result.value! });
    }
}
