import { DatabaseSingleton } from '@config/DatabaseSingleton';
import { FlashcardAdapter } from '@shared/adapters/FlashcardAdapter';
import { BaseException } from '@shared/enums/BaseExceptionEnum';
import { CommandTarget } from '@shared/enums/CommandTargetEnum';
import { IUndoStrategy } from '@shared/interfaces/IUndoStrategy';
import { Action } from '@shared/models/Action';
import { Flashcard } from '@shared/models/Flashcard';
import { Result } from '@shared/models/Result';

export class UndoFlashcardStrategy implements IUndoStrategy<Flashcard> {
    private readonly db = DatabaseSingleton.getInstance();
    private readonly adapter = new FlashcardAdapter();

    public async undo(action: Action): Promise<Result<Flashcard>> {
        if (action.target != CommandTarget.flashcard) {
            return BaseException.default;
        }

        const cardAction = await this.db.execute((client) =>
            client.flashcardAction.findUnique({ where: { actionId: action.id } })
        );

        if (cardAction.isError) {
            return Result.error(cardAction.error!);
        }

        const flashcard = await this.db.transaction(async (client) => {
            await client.action.delete({ where: { id: action.id } });
            return await client.flashcard.delete({ where: { id: cardAction.value!.flashcardId } });
        });

        if (flashcard.isError) {
            return Result.error(flashcard.error!);
        }

        return Result.ok(this.adapter.fromEntity(flashcard.value!));
    }
}
