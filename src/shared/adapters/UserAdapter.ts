import { User } from '@shared/models/User';
import { User as UserEntity } from '@/generated/prisma';

export class UserAdapter {
    public fromEntity(entity: UserEntity): User {
        return new User(entity.id, entity.name, entity.email, entity.password, entity.createdAt);
    }
}
