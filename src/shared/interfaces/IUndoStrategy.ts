import { Action } from '@shared/models/Action';
import { Result } from '@shared/models/Result';

export interface IUndoStrategy<T> {
    undo(action: Action): Promise<Result<T>>;
}
