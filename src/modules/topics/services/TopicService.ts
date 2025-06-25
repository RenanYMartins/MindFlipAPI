import { Result } from '@shared/models/Result';
import { CreateTopic } from '../models/CreateTopic';
import { TopicRepository } from '../repositories/TopicRepository';
import { Topic } from '@shared/models/Topic';
import { PaginatedResult } from '@shared/models/PaginatedResult';
import { HttpException } from '@shared/exceptions/HttpException';
import { HttpStatus } from '@shared/enums/HttpStatusEnum';

export class TopicService {
    private readonly itemsPerPage = 30;
    private readonly repository = new TopicRepository();

    public async create(topic: CreateTopic): Promise<Result<Topic>> {
        return await this.repository.create(topic);
    }

    public async getContent(topicId: number, userId: number): Promise<Result<Topic>> {
        const topic = await this.repository.getById(topicId);

        if (topic.isError) {
            return Result.error(topic.error!);
        }

        if (topic.value!.user.id != userId) {
            return Result.error(new HttpException(HttpStatus.FORBIDDEN, 'Acesso não autorizado a esse conteúdo'));
        }

        return topic;
    }

    public async listAll(userId: number, page: number): Promise<PaginatedResult<Topic>> {
        const total = await this.repository.getTotal(userId);

        if (total.isError) {
            return PaginatedResult.error(total.error!);
        }

        const totalPages = Math.ceil(total.value!._count / this.itemsPerPage);
        if (page > totalPages) {
            return PaginatedResult.error(new HttpException(HttpStatus.NOT_FOUND, 'Página não encontrada'));
        }

        const topics = await this.repository.getAll(userId, (page - 1) * this.itemsPerPage, this.itemsPerPage);
        if (topics.isError) {
            return PaginatedResult.error(topics.error!);
        }

        return PaginatedResult.ok({
            page: page,
            total: totalPages,
            value: topics.value!
        });
    }
}
