export class CreateFlashcard {
    public question: string;
    public response: string;
    public topicId: number;
    public userId: number;

    public constructor(question: string, response: string, topicId: number, userId: number) {
        this.question = question;
        this.response = response;
        this.topicId = topicId;
        this.userId = userId;
    }
}
