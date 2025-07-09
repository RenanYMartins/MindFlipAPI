import { describe, test, expect, jest } from '@jest/globals';
import { AuthRepository } from '@modules/auth/repositories/AuthRepository';
import { AuthService } from '@modules/auth/services/AuthService';
import { JwtFacade } from '@shared/facades/JwtFacade';
import { Result } from '@shared/models/Result';
import { userMock } from '@tests/mocks/UserMock';

jest.mock('@modules/auth/repositories/AuthRepository');

describe('Auth Service', () => {
    const repo = new AuthRepository() as jest.Mocked<AuthRepository>;
    const service = new AuthService(repo, new JwtFacade());

    test('Authorize access successfully', async () => {
        repo.login.mockResolvedValue(Result.ok(userMock));
        const result = await service.login(userMock.email, userMock.password);

        expect(result.isSuccess).toEqual(true);
        expect(typeof result.value).toEqual('string');
    });

    test('Incorrect login not authorized', async () => {
        repo.login.mockResolvedValue(Result.ok(null));
        const result = await service.login(userMock.email + 'teste', userMock.password);

        expect(result.isSuccess).toEqual(false);
    });
});
