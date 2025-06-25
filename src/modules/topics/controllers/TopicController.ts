import { Controller } from '@shared/decorators/ControllerDecorator';
import { Middleware } from '@shared/decorators/MiddlewareDecorator';
import { Get, Post } from '@shared/decorators/RouteDecorator';
import { AuthMiddleware } from '@shared/middlewares/AuthMiddleware';
import { ValidationDTO } from '@shared/middlewares/ValidatonDTO';
import { BaseController } from '@shared/models/BaseController';
import { Request, Response } from 'express';
import { CreateTopicRequestDTO, CreateTopicRequestSchema } from '../dto/request/CreateTopicRequestDTO';
import { TopicService } from '../services/TopicService';
import { CreateTopic } from '../models/CreateTopic';
import { ApiService } from '@shared/services/ApiService';
import { HttpStatus } from '@shared/enums/HttpStatusEnum';
import { ListTopicsRequestDTO, ListTopicsRequestSchema } from '../dto/request/ListTopicsRequestDTO';
import { ListTopicResponseDTO } from '../dto/response/ListTopicResponseDTO';
import {
    TopicContentParamsRequestDTO,
    TopicContentQueryRequestDTO,
    TopicContentRequestSchema
} from '../dto/request/TopicContentRequestDTO';

@Controller('/')
export class TopicController extends BaseController {
    private readonly service = new TopicService();

    @Post('/')
    @Middleware(AuthMiddleware.validate, ValidationDTO.validate(CreateTopicRequestSchema))
    public async create(req: Request, res: Response): Promise<void> {
        const dto = req.body as CreateTopicRequestDTO;
        const topic = new CreateTopic(dto.name, dto.color, req.user!.id, dto.parentTopic);
        ApiService.response(res, HttpStatus.CREATED, await this.service.create(topic));
    }

    @Get('/')
    @Middleware(AuthMiddleware.validate, ValidationDTO.validate(ListTopicsRequestSchema))
    public async listAll(req: Request, res: Response): Promise<void> {
        const dto = req.query as object as ListTopicsRequestDTO;
        ApiService.paginatedResponse(
            res,
            HttpStatus.OK,
            await this.service.listAll(req.user!.id, dto.page),
            ListTopicResponseDTO
        );
    }

    @Get('/content/:id')
    @Middleware(AuthMiddleware.validate, ValidationDTO.validate(TopicContentRequestSchema))
    public async listTopicContent(req: Request, res: Response): Promise<void> {
        const params = req.params as object as TopicContentParamsRequestDTO;
        const query = req.query as object as TopicContentQueryRequestDTO;
        ApiService.response(res, HttpStatus.OK, await this.service.getContent(params.id, req.user!.id));
    }
}
