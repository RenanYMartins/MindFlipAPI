import { Result } from '@shared/models/Result';
import { CreateTopic } from '../models/CreateTopic';
import { TopicRepository } from '../repositories/TopicRepository';
import { Topic } from '@shared/models/Topic';
import { BaseException } from '@shared/enums/BaseExceptionEnum';
import { PaginatedResponse } from '@shared/models/PaginatedResponse';

export class TopicService {
    private readonly itemsPerPage = 30;
    private readonly repository = new TopicRepository();

    public async create(topic: CreateTopic): Promise<Result<Topic>> {
        return await this.repository.create(topic);
    }

    public async getSubTopics(
        topicId: number,
        userId: number,
        page: number
    ): Promise<Result<PaginatedResponse<Topic>>> {
        const topic = await this.repository.getById(topicId);

        if (topic.isError) {
            return Result.error(topic.error!);
        }

        if (topic.value!.user.id != userId) {
            return BaseException.forbidden;
        }

        const total = await this.repository.getSubTopicsTotal(topicId);
        if (total.isError) {
            return Result.error(total.error!);
        }

        const totalPages = Math.ceil(total.value!.total / this.itemsPerPage);
        if (page > totalPages) {
            return BaseException.pageNotFound;
        }

        const subTopics = await this.repository.getSubTopicsById(
            topicId,
            (page - 1) * this.itemsPerPage,
            this.itemsPerPage
        );

        if (subTopics.isError) {
            return Result.error(subTopics.error!);
        }

        return Result.ok(
            new PaginatedResponse({
                page: page,
                total: totalPages,
                value: subTopics.value!
            })
        );
    }

    public async listAll(userId: number, page: number): Promise<Result<PaginatedResponse<Topic>>> {
        const total = await this.repository.getTotal(userId);

        if (total.isError) {
            return Result.error(total.error!);
        }

        const totalPages = Math.max(Math.ceil(total.value!.total / this.itemsPerPage), 1);
        if (page > totalPages) {
            return BaseException.pageNotFound;
        }

        const topics = await this.repository.getAll(userId, (page - 1) * this.itemsPerPage, this.itemsPerPage);
        if (topics.isError) {
            return Result.error(topics.error!);
        }

        return Result.ok(
            new PaginatedResponse({
                page: page,
                total: totalPages,
                value: topics.value!
            })
        );
    }
}
