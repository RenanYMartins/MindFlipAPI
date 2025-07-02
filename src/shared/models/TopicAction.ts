import { Action } from './Action';
import { Topic } from './Topic';

export type topicActionConstructor = {
    action: Action;
    topic: Topic;
};

export class TopicAction {
    public action: Action;
    public topic: Topic;

    public constructor(data: topicActionConstructor) {
        this.action = data.action;
        this.topic = data.topic;
    }
}
