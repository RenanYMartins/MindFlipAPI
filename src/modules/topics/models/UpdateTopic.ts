export type UpdateTopicConstructor = {
    id: number;
    name: string;
    color: string;
    parentTopic: number | null;
    userId: number;
};

export class UpdateTopic {
    public id: number;
    public name: string;
    public color: string;
    public parentTopic: number | null;
    public userId: number;

    public constructor(data: UpdateTopicConstructor) {
        this.id = data.id;
        this.name = data.name;
        this.color = data.color;
        this.parentTopic = data.parentTopic;
        this.userId = data.userId;
    }
}
