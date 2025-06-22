export class CreateTopic {
    public name: string;
    public color: string;
    public userId: number;
    public topicId: number | null;

    public constructor(name: string, color: string, userId: number, parentTopic: number | null) {
        this.name = name;
        this.color = color;
        this.userId = userId;
        this.topicId = parentTopic;
    }
}
