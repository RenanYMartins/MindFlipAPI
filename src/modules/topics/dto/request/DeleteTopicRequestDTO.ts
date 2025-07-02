import { BaseSchema } from '@shared/schemas/BaseSchema';
import { z } from 'zod';

export class DeleteTopicRequestSchema extends BaseSchema {
    params = z.object({
        id: z.coerce.number().int().positive()
    });
}

export type DeleteTopicRequestDTO = z.infer<typeof DeleteTopicRequestSchema.prototype.params>;
