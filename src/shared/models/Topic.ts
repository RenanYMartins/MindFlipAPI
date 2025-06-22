import { Flashcard } from "./Flashcard";
import { UserSummary } from "./UserSummary";

export type TopicContructor = {
    id: number;
    name: string;
    color: string;
    user: UserSummary;
    parentTopic?: Topic;
    subTopics?: Topic[],
    flashcards?: Flashcard[]
}

export class Topic {
    public id: number;
    public name: string;
    public color: string;
    public user: UserSummary;
    public parentTopic?: Topic;
    public subTopics: Topic[];
    public flashcards: Flashcard[];

    public constructor(data: TopicContructor) {
        this.id = data.id;
        this.name = data.name;
        this.color = data.color;
        this.user = data.user;
        this.subTopics = data.subTopics ?? [];
        this.flashcards = data.flashcards ?? [];
    }
}