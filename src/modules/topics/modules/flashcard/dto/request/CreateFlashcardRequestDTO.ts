import { BaseSchema } from '@shared/schemas/BaseSchema';
import { z } from 'zod';

export class CreateFlashcardRequestSchema extends BaseSchema {
    body = z.object({
        question: z.string(),
        response: z.string(),
        color: z.string().length(6),
        topicId: z.coerce.number().int().positive()
    });
}

export type CreateFlashcardRequestDTO = z.infer<typeof CreateFlashcardRequestSchema.prototype.body>;
