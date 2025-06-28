import { DatabaseSingleton } from '@/src/config/DatabaseSingleton';

export class ActionRepository {
    private readonly db = DatabaseSingleton.getInstance();

    public async register() {}
}
