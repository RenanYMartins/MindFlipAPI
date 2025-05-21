import { BaseSchema } from "@shared/schemas/BaseSchema";
import { z } from "zod";

export class LoginRequestSchema extends BaseSchema {
    body = z.object({
        email: z.string().email().nonempty(),
        password: z.string().nonempty()
    });
}

export type LoginRequestDTO = z.infer<typeof LoginRequestSchema.prototype.body>;