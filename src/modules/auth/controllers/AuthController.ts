
import { Controller } from "@shared/decorators/ControllerDecorator";
import { Get, Post } from "@shared/decorators/RouteDecorator";
import { BaseController } from "@shared/models/BaseController";
import { Request, Response } from "express";

@Controller('/auth')
export class AuthController extends BaseController {

    @Get('/')
    public async auth(req: Request, res: Response): Promise<void> {
        res.json({ teste: 'teste' });
    }

    @Get('/teste')
    public async teste(req: Request, res: Response): Promise<void> {
        res.json({ teste: 'teste' });
    }
}