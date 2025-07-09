import { BaseController } from '@shared/models/BaseController';
import { FlashcardService } from '../services/FlashcardService';
import { Delete, Get, Post, Put } from '@shared/decorators/RouteDecorator';
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
import { CreateFlashcardRequestDTO, CreateFlashcardRequestSchema } from '../dto/request/CreateFlashcardRequestDTO';
import { CreateFlashcard } from '../models/CreateFlashcard';
import { Controller } from '@shared/decorators/ControllerDecorator';
import { UpdateFlashcardRequestDTO, UpdateFlashcardRequestSchema } from '../dto/request/UpdateFlashcardRequestDTO';
import { UpdateFlashcard } from '../models/UpdateFlashcard';
import { DeleteFlashcardRequestDTO, DeleteFlashcardRequestSchema } from '../dto/request/DeleteFlashcardRequestDTO';
import { TopicRepository } from '@modules/topics/repositories/TopicRepository';
import { FlashcardRepository } from '../repositories/FlashcardRepository';

@Controller('/')
export class FlashcardController extends BaseController {
    private readonly service = new FlashcardService(new TopicRepository(), new FlashcardRepository());

    @Post('/')
    @Middleware(AuthMiddleware.validate, ValidationDTO.validate(CreateFlashcardRequestSchema))
    public async create(req: Request, res: Response): Promise<void> {
        const dto = req.body as CreateFlashcardRequestDTO;
        const flashcard = new CreateFlashcard(dto.question, dto.response, dto.color, dto.topicId, req.user!.id);
        ApiService.response(res, HttpStatus.CREATED, await this.service.create(flashcard));
    }

    @Put('/')
    @Middleware(AuthMiddleware.validate, ValidationDTO.validate(UpdateFlashcardRequestSchema))
    public async update(req: Request, res: Response): Promise<void> {
        const dto = req.body as UpdateFlashcardRequestDTO;
        const flashcard = new UpdateFlashcard({ ...dto, userId: req.user!.id });
        ApiService.response(res, HttpStatus.OK, await this.service.update(flashcard));
    }

    @Delete('/:id')
    @Middleware(AuthMiddleware.validate, ValidationDTO.validate(DeleteFlashcardRequestSchema))
    public async delete(req: Request, res: Response): Promise<void> {
        const dto = req.params as object as DeleteFlashcardRequestDTO;
        ApiService.response(res, HttpStatus.ACCEPTED, await this.service.deleteById(dto.id, req.user!.id));
    }

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
