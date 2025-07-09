import { describe, test, expect } from '@jest/globals';
import { JwtFacade } from '@shared/facades/JwtFacade';
import { authUserMock } from '@tests/mocks/AuthUserMock';

describe('JWT Facade', () => {
    const facade = new JwtFacade();

    test('Generate token', () => {
        const token = facade.generate(authUserMock);
        const user = facade.validate(token);

        expect(typeof token).toBe('string');
        expect(user.isSuccess).toEqual(true);
        expect(user.value).toEqual(authUserMock);
    });
});
