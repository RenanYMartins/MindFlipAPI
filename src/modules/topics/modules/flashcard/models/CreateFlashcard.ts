export class CreateFlashcard {
    public question: string;
    public response: string;
    public color: string;
    public topicId: number;
    public userId: number;

    public constructor(question: string, response: string, color: string, topicId: number, userId: number) {
        this.question = question;
        this.response = response;
        this.color = color;
        this.topicId = topicId;
        this.userId = userId;
    }
}
