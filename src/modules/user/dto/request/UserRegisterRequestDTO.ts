import { BaseSchema } from "@shared/schemas/BaseSchema";
import { z } from "zod";

export class UserRegisterRequestSchema extends BaseSchema {
    body = z.object({
        name: z.string().nonempty(),
        email: z.string().email().nonempty(),
        password: z.string().nonempty()
    });
}

export type UserRegisterRequestDTO = z.infer<typeof UserRegisterRequestSchema.prototype.body>;