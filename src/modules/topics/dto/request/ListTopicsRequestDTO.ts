import { BaseSchema } from '@shared/schemas/BaseSchema';
import { z } from 'zod';

export class ListTopicsRequestSchema extends BaseSchema {
    query = z.object({
        page: z.coerce.number().int().positive().optional().default(1)
    });
}

export type ListTopicsRequestDTO = z.infer<typeof ListTopicsRequestSchema.prototype.query>;
