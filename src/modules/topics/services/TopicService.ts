import { Result } from '@shared/models/Result';
import { CreateTopic } from '../models/CreateTopic';
import { TopicRepository } from '../repositories/TopicRepository';
import { Topic } from '@shared/models/Topic';

export class TopicService {
    private readonly repository = new TopicRepository();

    public async create(topic: CreateTopic): Promise<Result<Topic>> {
        return await this.repository.create(topic);
    }
}
