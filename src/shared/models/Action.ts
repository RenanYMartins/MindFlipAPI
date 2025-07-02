import { CommandTarget } from '@shared/enums/CommandTargetEnum';
import { User } from './User';

export type ActionConstructor = {
    id: number;
    method: string;
    target: CommandTarget;
    user: User;
    createAt: Date;
};

export class Action {
    public id: number;
    public method: string;
    public target: CommandTarget;
    public user: User;
    public createAt: Date;

    public constructor(data: ActionConstructor) {
        this.id = data.id;
        this.method = data.method;
        this.target = data.target;
        this.user = data.user;
        this.createAt = data.createAt;
    }
}
