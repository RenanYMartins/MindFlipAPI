import { Request, Response } from 'express';
import { BaseController } from '@shared/models/BaseController';
import { Controller } from '@shared/decorators/ControllerDecorator';
import { Post } from '@shared/decorators/RouteDecorator';
import { Middleware } from '@shared/decorators/MiddlewareDecorator';
import { ValidationDTO } from '@shared/middlewares/ValidatonDTO';
import { UserRegisterRequestDTO, UserRegisterRequestSchema } from '../dto/request/UserRegisterRequestDTO';
import { UserService } from '../services/UserService';
import { ApiService } from '@shared/services/ApiService';
import { HttpStatus } from '@shared/enums/HttpStatusEnum';
import { CreateUser } from '../models/CreateUser';
import { UserRepository } from '../repositories/UserRepository';

@Controller('/')
export class UserController extends BaseController {
    private readonly service = new UserService(new UserRepository());

    @Post('/')
    @Middleware(ValidationDTO.validate(UserRegisterRequestSchema))
    public async register(req: Request, res: Response): Promise<void> {
        const dto = req.body as UserRegisterRequestDTO;
        const user = new CreateUser(dto.name, dto.email, dto.password);

        ApiService.response(res, HttpStatus.CREATED, await this.service.registerUser(user));
    }
}
