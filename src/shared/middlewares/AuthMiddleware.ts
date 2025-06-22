import { ApiService } from "@shared/services/ApiService";
import { JwtService } from "@shared/services/JwtService";
import { NextFunction, Request, RequestHandler, Response } from "express";

export class AuthMiddleware {
    static validate: RequestHandler = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const service = new JwtService();
        const result = service.validate(req.headers.authorization!);

        if (result.isError) {
            return ApiService.error(res, result.error!.status, result.error!.message);
        }

        req.user = result.value;
        next();
    };
}