
import { Controller } from "@shared/decorators/ControllerDecorator";
import { Post } from "@shared/decorators/RouteDecorator";
import { Request, Response } from "express";

@Controller('/')
export class AuthController {

    @Post('/')
    public async auth(req: Request, res: Response): Promise<void> { }
}