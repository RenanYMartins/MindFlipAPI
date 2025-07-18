import { Response } from 'express';
import { HttpStatus } from '../enums/HttpStatusEnum';
import { Result } from '../models/Result';
import { PaginatedResponse } from '@shared/models/PaginatedResponse';

export class ApiService {
    static response<T, R>(res: Response, status: HttpStatus, result: Result<T>, wrapper?: new (value: T) => R): void {
        if (result.isError) {
            return this.error(res, result.error!.status || 500, result.error!.message);
        }

        if (wrapper != null) {
            return this.success(res, status, new wrapper(result.value!));
        }

        this.success(res, status, result.value);
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

    static paginatedResponse<T, R>(
        res: Response,
        status: HttpStatus,
        result: Result<PaginatedResponse<T>>,
        wrapper?: new (value: T) => R
    ) {
        if (result.isError) {
            return this.error(res, result.error!.status || 500, result.error!.message);
        }

        res.status(status).json({
            success: true,
            page: result.value!.page,
            total: result.value!.total,
            data: result.value!.value!.map((item) => (wrapper != null ? new wrapper(item) : item))
        });
    }
}
