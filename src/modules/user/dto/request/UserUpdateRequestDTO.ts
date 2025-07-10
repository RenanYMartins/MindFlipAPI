import { BaseSchema } from '@shared/schemas/BaseSchema';
import { z } from 'zod';

export class UserUpdateRequestSchema extends BaseSchema {
    body = z.object({
        name: z.string().nonempty(),
        email: z.string().email().nonempty(),
        password: z.string().nonempty()
    });
}

export type UserUpdateRequestDTO = z.infer<typeof UserUpdateRequestSchema.prototype.body>;
