
import { Controller } from "@shared/decorators/ControllerDecorator";
import { Use } from "@shared/decorators/MiddlewareDecorator";
import { Post } from "@shared/decorators/RouteDecorator";
import { ValidationDTO } from "@shared/middlewares/ValidatonDTO";
import { BaseController } from "@shared/models/BaseController";
import { Request, Response } from "express";
import { LoginRequestSchema } from "../dto/request/LoginRequestDTO";
import { AuthService } from "../services/AuthService";

@Controller('/auth')
export class AuthController extends BaseController {

    @Post('/')
    @Use(ValidationDTO.validate(LoginRequestSchema))
    public async auth(req: Request, res: Response): Promise<void> {
        
    }
}