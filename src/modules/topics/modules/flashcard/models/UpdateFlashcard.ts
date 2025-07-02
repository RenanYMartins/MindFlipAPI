export type UpdateFlashcardConstructor = {
    id: number;
    question: string;
    response: string;
    color: string;
    topicId: number;
    userId: number;
};

export class UpdateFlashcard {
    public id: number;
    public question: string;
    public response: string;
    public color: string;
    public topicId: number;
    public userId: number;

    public constructor(data: UpdateFlashcardConstructor) {
        this.id = data.id;
        this.question = data.question;
        this.response = data.response;
        this.color = data.color;
        this.topicId = data.topicId;
        this.userId = data.userId;
    }
}
