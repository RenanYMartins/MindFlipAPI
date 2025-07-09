import { Flashcard } from '@shared/models/Flashcard';

export const flashcardMock = new Flashcard({
    id: 1,
    color: 'FFFFFF',
    question: '',
    response: '',
    createdAt: new Date(),
    topicId: 1
});
