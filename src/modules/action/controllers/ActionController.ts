import { BaseController } from '@shared/models/BaseController';
import { ActionService } from '../services/ActionService';
import { Controller } from '@shared/decorators/ControllerDecorator';
import { Request, Response } from 'express';
import { Delete } from '@shared/decorators/RouteDecorator';
import { Middleware } from '@shared/decorators/MiddlewareDecorator';
import { AuthMiddleware } from '@shared/middlewares/AuthMiddleware';
import { ApiService } from '@shared/services/ApiService';
import { HttpStatus } from '@shared/enums/HttpStatusEnum';

@Controller('/')
export class ActionController extends BaseController {
    private readonly service = new ActionService();

    @Delete('/undo')
    @Middleware(AuthMiddleware.validate)
    public async undo(req: Request, res: Response): Promise<void> {
        ApiService.response(res, HttpStatus.ACCEPTED, await this.service.undo(req.user!.id));
    }
}
