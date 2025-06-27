import { Flashcard as FlashcardEntity } from '@/generated/prisma';
import { Flashcard } from '@shared/models/Flashcard';

export class FlashcardAdapter {
    public fromEntity(entity: FlashcardEntity): Flashcard {
        return new Flashcard({
            id: entity.id,
            question: entity.question,
            response: entity.response,
            createdAt: entity.createdAt,
            topicId: entity.topicId
        });
    }
}
