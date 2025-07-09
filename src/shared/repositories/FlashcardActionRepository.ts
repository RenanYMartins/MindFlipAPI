import { DatabaseSingleton } from '@config/DatabaseSingleton';
import { PrismaClient } from '@prisma/client';
import { FlashcardAdapter } from '@shared/adapters/FlashcardAdapter';
import { Flashcard } from '@shared/models/Flashcard';
import { Result } from '@shared/models/Result';

export class FlashcardActionRepository {
    private readonly db = DatabaseSingleton.getInstance();
    private readonly adapter = new FlashcardAdapter();

    public async deleteFlashcardByAction(actionId: number): Promise<Result<Flashcard>> {
        const transaction = await this.db.transaction(async (tx: PrismaClient) => {
            const action = await this.db.execute(
                (client) => client.flashcardAction.delete({ where: { actionId: actionId } }),
                tx
            );

            if (action.isError) {
                throw new Error();
            }

            const flashcard = await this.db.execute(
                (client) => client.flashcard.delete({ where: { id: action.value!.flashcardId } }),
                tx
            );

            if (flashcard.isError) {
                throw new Error();
            }

            return flashcard.value;
        });

        if (transaction.isError) {
            return Result.error(transaction.error!);
        }

        return Result.ok(this.adapter.fromEntity(transaction.value!));
    }
}
