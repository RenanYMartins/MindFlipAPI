import { z, AnyZodObject, ZodOptional } from 'zod';

export abstract class BaseSchema {
    public params: AnyZodObject | ZodOptional<AnyZodObject> = z.object({}).optional();
    public query: AnyZodObject | ZodOptional<AnyZodObject> = z.object({}).optional();
    public body: AnyZodObject | ZodOptional<AnyZodObject> = z.object({}).optional();

    getSchema() {
        return z.object({
            params: this.params.default({}),
            query: this.query.default({}),
            body: this.body.default({})
        });
    }
}
