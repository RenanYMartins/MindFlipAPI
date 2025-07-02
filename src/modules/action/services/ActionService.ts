import { BaseException } from '@shared/enums/BaseExceptionEnum';
import { CommandTarget } from '@shared/enums/CommandTargetEnum';
import { HttpStatus } from '@shared/enums/HttpStatusEnum';
import { HttpException } from '@shared/exceptions/HttpException';
import { IUndoStrategy } from '@shared/interfaces/IUndoStrategy';
import { Result } from '@shared/models/Result';
import { ActionRepository } from '@shared/repositories/ActionRepository';
import { UndoFlashcardStrategy } from '@shared/strategies/UndoFlashcardStrategy';
import { UndoTopicStrategy } from '@shared/strategies/UndoTopicStrategy';

export class ActionService {
    private readonly repository = new ActionRepository();
    private readonly undoStrategies = new Map<CommandTarget, IUndoStrategy<unknown>>([
        [CommandTarget.flashcard, new UndoFlashcardStrategy()],
        [CommandTarget.topic, new UndoTopicStrategy()]
    ]);

    public async undo(userId: number): Promise<Result<unknown>> {
        const action = await this.repository.getLast(userId);

        if (action.isSuccess && action.value == null) {
            return Result.error(new HttpException(HttpStatus.NOT_FOUND, 'Nenhuma ação foi encontrada'));
        }

        if (!(action.value!.target in CommandTarget)) {
            return BaseException.default;
        }

        const result = await this.undoStrategies.get(action.value!.target)?.undo(action.value!);
        if (!result || result?.isError) {
            return Result.error(new HttpException(HttpStatus.NOT_FOUND, 'Nenhuma ação foi encontrada'));
        }

        return result;
    }
}
