import { Topic } from '@shared/models/Topic';
import { userMock } from './UserMock';

export const topicMock = new Topic({
    id: 1,
    color: 'FFFFFF',
    name: 'teste',
    user: userMock,
    flashcards: [],
    subTopics: []
});
