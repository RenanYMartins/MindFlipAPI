export type FlashcardConstructor = {
    id: number;
    question: string;
    response: string;
    createdAt: Date;
    topicId: number;
};

export class Flashcard {
    public id: number;
    public question: string;
    public response: string;
    public createdAt: Date;
    public topicId: number;

    public constructor(data: FlashcardConstructor) {
        this.id = data.id;
        this.question = data.question;
        this.response = data.response;
        this.createdAt = data.createdAt;
        this.topicId = data.topicId;
    }
}
