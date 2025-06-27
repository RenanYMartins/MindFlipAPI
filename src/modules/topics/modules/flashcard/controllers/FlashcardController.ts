import { BaseController } from '@shared/models/BaseController';
import { FlashcardService } from '../services/FlashcardService';
import { Get } from '@shared/decorators/RouteDecorator';
import { Request, Response } from 'express';
import {
    ListFlashcardFromSubTopicParamsRequestDTO,
    ListFlashcardFromSubTopicQueryRequestDTO,
    ListFlashcardFromSubTopicRequestSchema
} from '../dto/request/ListFlashcardFromSubTopicRequestDTO';
import { Middleware } from '@shared/decorators/MiddlewareDecorator';
import { AuthMiddleware } from '@shared/middlewares/AuthMiddleware';
import { ValidationDTO } from '@shared/middlewares/ValidatonDTO';
import { ApiService } from '@shared/services/ApiService';
import { HttpStatus } from '@shared/enums/HttpStatusEnum';

export class FlashcardController extends BaseController {
    private readonly service = new FlashcardService();

    @Get('/subtopic/:id')
    @Middleware(AuthMiddleware.validate, ValidationDTO.validate(ListFlashcardFromSubTopicRequestSchema))
    public async listAllFromSubTopic(req: Request, res: Response): Promise<void> {
        const params = req.params as object as ListFlashcardFromSubTopicParamsRequestDTO;
        const query = req.query as object as ListFlashcardFromSubTopicQueryRequestDTO;
        ApiService.paginatedResponse(
            res,
            HttpStatus.OK,
            await this.service.listAll(params.id, req.user!.id, query.page)
        );
    }
}
