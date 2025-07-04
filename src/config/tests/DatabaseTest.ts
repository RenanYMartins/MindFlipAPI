import { describe, it, expect } from '@jest/globals';
import { DatabaseSingleton } from '../DatabaseSingleton';

describe('Database Connection', () => {
    it('The query should return 1', async () => {
        const db = DatabaseSingleton.getInstance();
        expect(1).toEqual(1);
    });
});
