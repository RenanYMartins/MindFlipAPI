import { BaseSchema } from '@shared/schemas/BaseSchema';
import { z } from 'zod';

export class ListSubtopicsRequestSchema extends BaseSchema {
    params = z.object({
        id: z.coerce.number().int().positive()
    });
    query = z.object({
        page: z.coerce.number().int().positive().optional().default(1)
    });
}

export type ListSubTopicsParamsRequestDTO = z.infer<typeof ListSubtopicsRequestSchema.prototype.params>;
export type ListSubTopicsQueryRequestDTO = z.infer<typeof ListSubtopicsRequestSchema.prototype.query>;
