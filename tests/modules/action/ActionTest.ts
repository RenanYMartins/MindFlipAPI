import { describe, test, expect, jest } from '@jest/globals';
import { ActionRepository } from '@shared/repositories/ActionRepository';
import { CommandTarget } from '@shared/enums/CommandTargetEnum';
import { IUndoStrategy } from '@shared/interfaces/IUndoStrategy';
import { UndoFlashcardStrategy } from '@shared/strategies/UndoFlashcardStrategy';
import { UndoTopicStrategy } from '@shared/strategies/UndoTopicStrategy';
import { Result } from '@shared/models/Result';
import { ActionService } from '@modules/action/services/ActionService';
import { actionMock } from '@tests/mocks/ActionMock';
import { flashcardMock } from '@tests/mocks/FlashcardMock';
import { topicMock } from '@tests/mocks/TopicMock';

jest.mock('@shared/repositories/ActionRepository');
jest.mock('@shared/strategies/UndoFlashcardStrategy');
jest.mock('@shared/strategies/UndoTopicStrategy');

describe('Action Service', () => {
    const repo = new ActionRepository() as jest.Mocked<ActionRepository>;
    const flashcardStrategyMock = new UndoFlashcardStrategy() as jest.Mocked<UndoFlashcardStrategy>;
    const topicStrategyMock = new UndoTopicStrategy() as jest.Mocked<UndoTopicStrategy>;

    const strategies = new Map<CommandTarget, IUndoStrategy<unknown>>([
        [CommandTarget.flashcard, flashcardStrategyMock],
        [CommandTarget.topic, topicStrategyMock]
    ]);

    const service = new ActionService(repo, strategies);

    test('Undo flashcard last action successfully', async () => {
        actionMock.target = CommandTarget.flashcard;
        repo.getLast.mockResolvedValue(Result.ok(actionMock));
        flashcardStrategyMock.undo.mockResolvedValue(Result.ok(flashcardMock));
        const result = await service.undo(1);

        expect(result.isSuccess).toEqual(true);
        expect(result.value).toEqual(flashcardMock);
    });

    test('Undo topic last action successfully', async () => {
        actionMock.target = CommandTarget.topic;
        repo.getLast.mockResolvedValue(Result.ok(actionMock));
        topicStrategyMock.undo.mockResolvedValue(Result.ok(topicMock));
        const result = await service.undo(1);

        expect(result.isSuccess).toEqual(true);
        expect(result.value).toEqual(topicMock);
    });

    test('Empty history return not found', async () => {
        repo.getLast.mockResolvedValue(Result.ok(null));
        const result = await service.undo(1);

        expect(result.isSuccess).toEqual(false);
        expect(result.error?.status).toEqual(404);
    });
});
