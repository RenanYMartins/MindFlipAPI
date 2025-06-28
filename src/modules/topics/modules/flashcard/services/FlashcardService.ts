import { PaginatedResponse } from '@shared/models/PaginatedResponse';
import { FlashcardRepository } from '../repositories/FlashcardRepository';
import { Flashcard } from '@/generated/prisma';
import { BaseException } from '@shared/enums/BaseExceptionEnum';
import { TopicRepository } from '../../../repositories/TopicRepository';
import { Result } from '@shared/models/Result';
import { CreateFlashcard } from '../models/CreateFlashcard';

export class FlashcardService {
    private readonly topicRepo = new TopicRepository();
    private readonly cardRepo = new FlashcardRepository();
    private readonly itemsPerPage = 30;

    public async create(flashcard: CreateFlashcard): Promise<Result<Flashcard>> {
        const topic = await this.topicRepo.getById(flashcard.topicId);

        if (topic.isError) {
            return Result.error(topic.error!);
        }

        if (topic.value == null) {
            return BaseException.notFound('topic');
        }

        if (topic.value!.user.id != flashcard.userId) {
            return BaseException.forbidden;
        }

        const card = await this.cardRepo.create(flashcard);
        if (card.isError) {
            return Result.error(card.error!);
        }

        return card;
    }

    public async listAll(
        subTopicId: number,
        userId: number,
        page: number
    ): Promise<Result<PaginatedResponse<Flashcard>>> {
        const subTopic = await this.topicRepo.getById(subTopicId);
        if (subTopic.isError) {
            return Result.error(subTopic.error!);
        }

        if (subTopic.value?.user.id != userId) {
            return BaseException.forbidden;
        }

        const total = await this.cardRepo.getTotalBySubTopicId(subTopicId);
        if (total.isError) {
            return Result.error(total.error!);
        }

        const totalPages = Math.max(Math.ceil(total.value!.total / this.itemsPerPage), 1);
        if (page > totalPages) {
            return BaseException.pageNotFound;
        }

        const flashcards = await this.cardRepo.getAllBySubTopicId(
            subTopicId,
            (page - 1) * this.itemsPerPage,
            this.itemsPerPage
        );

        if (flashcards.isError) {
            return Result.error(flashcards.error!);
        }

        return Result.ok(
            new PaginatedResponse({
                page: page,
                total: totalPages,
                value: flashcards.value
            })
        );
    }
}
