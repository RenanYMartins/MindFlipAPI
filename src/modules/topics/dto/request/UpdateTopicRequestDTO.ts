import { BaseSchema } from '@shared/schemas/BaseSchema';
import { z } from 'zod';

export class UpdateTopicRequestSchema extends BaseSchema {
    body = z.object({
        id: z.coerce.number().int().positive(),
        name: z.string().nonempty(),
        color: z.string().nonempty().length(6),
        parentTopic: z.coerce.number().int().positive().nullable().default(null)
    });
}

export type UpdateTopicRequestDTO = z.infer<typeof UpdateTopicRequestSchema.prototype.body>;
