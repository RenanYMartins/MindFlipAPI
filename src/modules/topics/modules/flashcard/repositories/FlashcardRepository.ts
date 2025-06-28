import { DatabaseSingleton } from '@/src/config/DatabaseSingleton';
import { FlashcardAdapter } from '@shared/adapters/FlashcardAdapter';
import { Flashcard } from '@shared/models/Flashcard';
import { Result } from '@shared/models/Result';
import { CreateFlashcard } from '../models/CreateFlashcard';

export class FlashcardRepository {
    private readonly db = DatabaseSingleton.getInstance();
    private readonly adapter = new FlashcardAdapter();

    public async create(flashcard: CreateFlashcard): Promise<Result<Flashcard>> {
        const result = await this.db.execute((client) =>
            client.flashcard.create({
                data: { question: flashcard.question, response: flashcard.response, topicId: flashcard.topicId }
            })
        );

        if (result.isError) {
            return Result.error(result.error!);
        }

        return Result.ok(this.adapter.fromEntity(result.value!));
    }

    public async getAllBySubTopicId(subTopicId: number, skip: number, take: number): Promise<Result<Flashcard[]>> {
        const result = await this.db.execute((client) =>
            client.flashcard.findMany({
                skip: skip,
                take: take,
                where: {
                    topicId: subTopicId
                }
            })
        );

        if (result.isError) {
            return Result.error(result.error!);
        }

        return Result.ok(result.value!.map((card) => this.adapter.fromEntity(card)));
    }

    public async getTotalBySubTopicId(subTopicId: number): Promise<Result<{ total: number }>> {
        const result = await this.db.execute((client) => client.flashcard.count({ where: { topicId: subTopicId } }));

        if (result.isError) {
            return Result.error(result.error!);
        }

        return Result.ok({ total: result.value! });
    }
}
