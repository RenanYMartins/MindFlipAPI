import { Request, Response } from 'express';
import { BaseController } from '@shared/models/BaseController';
import { Controller } from '@shared/decorators/ControllerDecorator';
import { Get, Post, Put } from '@shared/decorators/RouteDecorator';
import { Middleware } from '@shared/decorators/MiddlewareDecorator';
import { ValidationDTO } from '@shared/middlewares/ValidatonDTO';
import { UserRegisterRequestDTO, UserRegisterRequestSchema } from '../dto/request/UserRegisterRequestDTO';
import { UserService } from '../services/UserService';
import { ApiService } from '@shared/services/ApiService';
import { HttpStatus } from '@shared/enums/HttpStatusEnum';
import { CreateUser } from '../models/CreateUser';
import { UserRepository } from '../repositories/UserRepository';
import { AuthMiddleware } from '@shared/middlewares/AuthMiddleware';
import { UserUpdateRequestDTO, UserUpdateRequestSchema } from '../dto/request/UserUpdateRequestDTO';
import { UpdateUser } from '../models/UpdateUser';

@Controller('/')
export class UserController extends BaseController {
    private readonly service = new UserService(new UserRepository());

    @Get('/')
    @Middleware(AuthMiddleware.validate)
    public async get(req: Request, res: Response): Promise<void> {
        ApiService.response(res, HttpStatus.OK, await this.service.getById(req.user!.id));
    }

    @Post('/')
    @Middleware(ValidationDTO.validate(UserRegisterRequestSchema))
    public async register(req: Request, res: Response): Promise<void> {
        const dto = req.body as UserRegisterRequestDTO;
        const user = new CreateUser(dto.name, dto.email, dto.password);
        ApiService.response(res, HttpStatus.CREATED, await this.service.registerUser(user));
    }

    @Put('/')
    @Middleware(AuthMiddleware.validate, ValidationDTO.validate(UserUpdateRequestSchema))
    public async update(req: Request, res: Response): Promise<void> {
        const dto = req.body as UserUpdateRequestDTO;
        const user = new UpdateUser(req.user!.id, dto.name, dto.email, dto.password);
        ApiService.response(res, HttpStatus.OK, await this.service.updateUser(user));
    }
}
