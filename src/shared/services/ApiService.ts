import { Response } from 'express';
import { HttpStatus } from '../enums/HttpStatusEnum';
import { Result } from '../models/Result';
import { HttpException } from '../exceptions/HttpException';
import { PaginatedResult } from '../models/PaginatedResult';

export class ApiService {
    static response<T, R>(
        res: Response,
        status: HttpStatus,
        result: Result<T>,
        wrapper: new (value: T) => R
    ): void {
        if (result.isError) {
            return this.error(res, result.error!.status || 500, result.error!.message);
        }

        this.success(res, status, new wrapper(result.value!));
    }

    static success<T>(res: Response, status: HttpStatus, data: T): void {
        res.status(status).json({
            success: true,
            data: data
        });
    }

    static error(res: Response, status: HttpStatus, message: string): void {
        res.status(status).json({
            success: false,
            message: message
        });
    }

    static paginatedResponse<T, E extends HttpException, R>(
        res: Response,
        status: HttpStatus,
        result: PaginatedResult<T, E>,
        wrapper: new (value: T) => R
    ) {
        if (result.isError) {
            return this.error(res, result.error.status || 500, result.error.message);
        }

        res.status(status).json({
            success: true,
            page: result.page,
            total: result.total,
            data: result.value.map((item) => new wrapper(item))
        });
    }
}
