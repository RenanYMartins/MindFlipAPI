import { Topic } from '@shared/models/Topic';

export class ListTopicResponseDTO {
    public readonly id: number;
    public readonly name: string;
    public readonly color: string;

    public constructor(topic: Topic) {
        this.id = topic.id;
        this.name = topic.name;
        this.color = topic.color;
    }
}
