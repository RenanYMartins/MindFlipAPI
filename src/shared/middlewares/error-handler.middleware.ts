import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import { HttpException } from '../exceptions/http.exception';

export class ErrorHandler {
    static handler: ErrorRequestHandler = function (
        error: HttpException,
        req: Request,
        res: Response,
        next: NextFunction
    ): void {
        if (process.env.NODE_ENV != 'production') {
            console.error(error);
        }

        res.status(error?.status ?? 500).json({ message: error.message });
    };
}
