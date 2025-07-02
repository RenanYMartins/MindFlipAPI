import { Action } from './Action';
import { Flashcard } from './Flashcard';

export type flashcardActionConstructor = {
    action: Action;
    flashcard: Flashcard;
};

export class FlashcardAction {
    public action: Action;
    public flashcard: Flashcard;

    public constructor(data: flashcardActionConstructor) {
        this.action = data.action;
        this.flashcard = data.flashcard;
    }
}
