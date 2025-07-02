import { CommandTarget } from '@shared/enums/CommandTargetEnum';
import { Result } from '@shared/models/Result';

export interface ICommand<T> {
    execute(value: unknown, target: CommandTarget, userId: number): Promise<Result<T>>;
}
