import { BaseSchema } from '@shared/schemas/BaseSchema';
import { z } from 'zod';

export class TopicContentRequestSchema extends BaseSchema {
    params = z.object({
        id: z.coerce.number().int().positive()
    });
    query = z.object({
        page: z.coerce.number().int().positive().optional().default(1)
    });
}

export type TopicContentParamsRequestDTO = z.infer<typeof TopicContentRequestSchema.prototype.params>;
export type TopicContentQueryRequestDTO = z.infer<typeof TopicContentRequestSchema.prototype.query>;
