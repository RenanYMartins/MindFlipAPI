import { BaseSchema } from '@shared/schemas/BaseSchema';
import { z } from 'zod';

export class DeleteFlashcardRequestSchema extends BaseSchema {
    params = z.object({
        id: z.coerce.number().int().positive()
    });
}

export type DeleteFlashcardRequestDTO = z.infer<typeof DeleteFlashcardRequestSchema.prototype.params>;
