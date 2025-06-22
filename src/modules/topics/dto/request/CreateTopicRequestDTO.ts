import { BaseSchema } from '@shared/schemas/BaseSchema';
import { z } from 'zod';

export class CreateTopicRequestSchema extends BaseSchema {
    body = z.object({
        name: z.string().nonempty(),
        color: z.string().nonempty().length(6),
        parentTopic: z.coerce.number().int().positive().nullable().default(null)
    });
}

export type CreateTopicRequestDTO = z.infer<typeof CreateTopicRequestSchema.prototype.body>;
