import { BaseController } from '@shared/models/BaseController';
import { ActionService } from '../services/ActionService';
import { Controller } from '@shared/decorators/ControllerDecorator';
import { Request, Response } from 'express';
import { Delete } from '@shared/decorators/RouteDecorator';
import { Middleware } from '@shared/decorators/MiddlewareDecorator';
import { AuthMiddleware } from '@shared/middlewares/AuthMiddleware';
import { ApiService } from '@shared/services/ApiService';
import { HttpStatus } from '@shared/enums/HttpStatusEnum';
import { ActionRepository } from '@shared/repositories/ActionRepository';
import { CommandTarget } from '@shared/enums/CommandTargetEnum';
import { IUndoStrategy } from '@shared/interfaces/IUndoStrategy';
import { UndoFlashcardStrategy } from '@shared/strategies/UndoFlashcardStrategy';
import { UndoTopicStrategy } from '@shared/strategies/UndoTopicStrategy';

@Controller('/')
export class ActionController extends BaseController {
    private readonly service = new ActionService(
        new ActionRepository(),
        new Map<CommandTarget, IUndoStrategy<unknown>>([
            [CommandTarget.flashcard, new UndoFlashcardStrategy()],
            [CommandTarget.topic, new UndoTopicStrategy()]
        ])
    );

    @Delete('/undo')
    @Middleware(AuthMiddleware.validate)
    public async undo(req: Request, res: Response): Promise<void> {
        ApiService.response(res, HttpStatus.ACCEPTED, await this.service.undo(req.user!.id));
    }
}
