import { NextFunction, Request, Response, RequestHandler } from 'express';
import { ApiService } from '../services/api.service';
import { HttpStatus } from '../enums/HttpStatusEnum';
import { BaseSchema } from '../schemas/BaseSchema';

export class ValidationDTO {
    static validate(schema: new () => BaseSchema): RequestHandler {
        return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            const schemaInstance = new schema();
            const validatedData = await schemaInstance.getSchema().safeParseAsync({
                params: req.params,
                query: req.query,
                body: req.body
            });

            if (!validatedData.success) {
                return ApiService.error(
                    res,
                    HttpStatus.BAD_REQUEST,
                    'Verifique os parâmetros da requisição'
                );
            }

            req.params = validatedData.data.params;
            req.query = validatedData.data.query;
            req.body = validatedData.data.body;

            next();
        };
    }
}
