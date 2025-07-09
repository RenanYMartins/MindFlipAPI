import { CommandTarget } from '@shared/enums/CommandTargetEnum';
import { Action } from '@shared/models/Action';
import { userMock } from './UserMock';

export const actionMock = new Action({
    id: 1,
    method: 'save',
    target: CommandTarget.flashcard,
    user: userMock,
    createAt: new Date()
});
