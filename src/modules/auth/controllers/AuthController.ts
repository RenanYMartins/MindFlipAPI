
import { Controller } from "@shared/decorators/ControllerDecorator";
import { Use } from "@shared/decorators/MiddlewareDecorator";
import { Post } from "@shared/decorators/RouteDecorator";
import { ValidationDTO } from "@shared/middlewares/ValidatonDTO";
import { BaseController } from "@shared/models/BaseController";
import { Request, Response } from "express";
import { LoginRequestSchema } from "../dto/request/LoginRequestDTO";
import { AuthService } from "../services/AuthService";
import { ApiService } from "@shared/services/ApiService";
import { HttpStatus } from "@shared/enums/HttpStatusEnum";

@Controller('/')
export class AuthController extends BaseController {
    private service = new AuthService();

    @Post('/')
    @Use(ValidationDTO.validate(LoginRequestSchema))
    public async auth(req: Request, res: Response): Promise<void> {
        const token = this.service.login('email', 'senha');
        ApiService.success(res, HttpStatus.OK, { token: token });
    }
}