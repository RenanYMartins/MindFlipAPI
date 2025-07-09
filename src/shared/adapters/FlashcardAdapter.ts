import { Flashcard as FlashcardEntity } from '@prisma/client';
import { Flashcard } from '@shared/models/Flashcard';

export class FlashcardAdapter {
    public fromEntity(entity: FlashcardEntity): Flashcard {
        return new Flashcard({
            id: entity.id,
            question: entity.question,
            response: entity.response,
            color: entity.color,
            createdAt: entity.createdAt,
            topicId: entity.topicId
        });
    }
}
