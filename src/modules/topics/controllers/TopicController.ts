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
    ListSubTopicsParamsRequestDTO,
    ListSubTopicsQueryRequestDTO,
    ListSubtopicsRequestSchema
} from '../dto/request/ListSubTopicsRequestDTO';
import { ListSubTopicResponseDTO } from '../dto/response/ListSubTopicResponseDTO';

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

    @Get('/:id/subtopic')
    @Middleware(AuthMiddleware.validate, ValidationDTO.validate(ListSubtopicsRequestSchema))
    public async listTopicSubTopics(req: Request, res: Response): Promise<void> {
        const params = req.params as object as ListSubTopicsParamsRequestDTO;
        const query = req.query as object as ListSubTopicsQueryRequestDTO;
        ApiService.paginatedResponse(
            res,
            HttpStatus.OK,
            await this.service.getSubTopics(params.id, req.user!.id, query.page),
            ListSubTopicResponseDTO
        );
    }
}
