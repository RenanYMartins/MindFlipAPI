import { Controller } from '@shared/decorators/ControllerDecorator';
import { Middleware } from '@shared/decorators/MiddlewareDecorator';
import { Post } from '@shared/decorators/RouteDecorator';
import { AuthMiddleware } from '@shared/middlewares/AuthMiddleware';
import { ValidationDTO } from '@shared/middlewares/ValidatonDTO';
import { BaseController } from '@shared/models/BaseController';
import { Request, Response } from 'express';
import { CreateTopicRequestDTO, CreateTopicRequestSchema } from '../dto/request/CreateTopicRequestDTO';
import { TopicService } from '../services/TopicService';
import { CreateTopic } from '../models/CreateTopic';
import { ApiService } from '@shared/services/ApiService';
import { HttpStatus } from '@shared/enums/HttpStatusEnum';

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
}
