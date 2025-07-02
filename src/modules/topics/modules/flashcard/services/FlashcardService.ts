import { PaginatedResponse } from '@shared/models/PaginatedResponse';
import { FlashcardRepository } from '../repositories/FlashcardRepository';
import { Flashcard } from '@/generated/prisma';
import { BaseException } from '@shared/enums/BaseExceptionEnum';
import { TopicRepository } from '../../../repositories/TopicRepository';
import { Result } from '@shared/models/Result';
import { CreateFlashcard } from '../models/CreateFlashcard';
import { SaveCommand } from '@shared/commands/SaveCommand';
import { CommandTarget } from '@shared/enums/CommandTargetEnum';

export class FlashcardService {
    private readonly topicRepo = new TopicRepository();
    private readonly cardRepo = new FlashcardRepository();
    private readonly itemsPerPage = 30;

    public async create(flashcard: CreateFlashcard): Promise<Result<Flashcard>> {
        const command = new SaveCommand(this.cardRepo);
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

        return await command.execute(flashcard, CommandTarget.flashcard, flashcard.userId);
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
