import { Action as ActionEntity, User as UserEntity } from '@/generated/prisma';
import { Action } from '@shared/models/Action';
import { UserAdapter } from './UserAdapter';
import { CommandTarget } from '@shared/enums/CommandTargetEnum';

export class ActionAdapter {
    private readonly userAdapter = new UserAdapter();

    public fromEntity(entity: ActionEntity & { user: UserEntity }): Action {
        return new Action({
            id: entity.id,
            method: entity.method,
            target: entity.target as CommandTarget,
            user: this.userAdapter.fromEntity(entity.user),
            createAt: entity.createAt
        });
    }
}
