import {
    Action as ActionEntity,
    FlashcardAction as FlashcardActionEntity,
    Flashcard as FlashcardEntity,
    User as UserEntity
} from '@/generated/prisma';
import { FlashcardAction } from '@shared/models/FlashcardAction';
import { FlashcardAdapter } from './FlashcardAdapter';
import { ActionAdapter } from './ActionAdapter';

export class FlashcardActionAdapter {
    private readonly flashcardAdapter = new FlashcardAdapter();
    private readonly actionAdapter = new ActionAdapter();

    public fromEntity(
        entity: FlashcardActionEntity & { flashcard: FlashcardEntity; action: ActionEntity & { user: UserEntity } }
    ): FlashcardAction {
        return new FlashcardAction({
            action: this.actionAdapter.fromEntity(entity.action),
            flashcard: this.flashcardAdapter.fromEntity(entity.flashcard)
        });
    }
}
