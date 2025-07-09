import { BaseException } from '@shared/enums/BaseExceptionEnum';
import { CommandTarget } from '@shared/enums/CommandTargetEnum';
import { HttpStatus } from '@shared/enums/HttpStatusEnum';
import { HttpException } from '@shared/exceptions/HttpException';
import { IUndoStrategy } from '@shared/interfaces/IUndoStrategy';
import { Result } from '@shared/models/Result';
import { ActionRepository } from '@shared/repositories/ActionRepository';

export class ActionService {
    public constructor(
        private readonly repository: ActionRepository,
        private readonly undoStrategies: Map<CommandTarget, IUndoStrategy<unknown>>
    ) {}

    public async undo(userId: number): Promise<Result<unknown>> {
        const action = await this.repository.getLast(userId);

        if (action.isError) {
            return Result.error(action.error!);
        }

        if (action.value == null) {
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
