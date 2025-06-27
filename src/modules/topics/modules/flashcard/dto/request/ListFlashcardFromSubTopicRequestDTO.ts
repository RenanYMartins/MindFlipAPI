import { BaseSchema } from '@shared/schemas/BaseSchema';
import { z } from 'zod';

export class ListFlashcardFromSubTopicRequestSchema extends BaseSchema {
    params = z.object({
        id: z.coerce.number().int().positive()
    });
    query = z.object({
        page: z.coerce.number().int().positive().optional().default(1)
    });
}

export type ListFlashcardFromSubTopicParamsRequestDTO = z.infer<
    typeof ListFlashcardFromSubTopicRequestSchema.prototype.params
>;
export type ListFlashcardFromSubTopicQueryRequestDTO = z.infer<
    typeof ListFlashcardFromSubTopicRequestSchema.prototype.query
>;
