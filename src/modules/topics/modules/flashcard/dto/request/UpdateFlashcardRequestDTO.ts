import { BaseSchema } from '@shared/schemas/BaseSchema';
import { z } from 'zod';

export class UpdateFlashcardRequestSchema extends BaseSchema {
    body = z.object({
        id: z.coerce.number().int().positive(),
        question: z.string(),
        response: z.string(),
        color: z.string().length(6),
        topicId: z.coerce.number().int().positive()
    });
}

export type UpdateFlashcardRequestDTO = z.infer<typeof UpdateFlashcardRequestSchema.prototype.body>;
