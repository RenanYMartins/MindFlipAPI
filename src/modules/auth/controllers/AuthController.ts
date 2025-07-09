import { Controller } from '@shared/decorators/ControllerDecorator';
import { Middleware } from '@shared/decorators/MiddlewareDecorator';
import { Post } from '@shared/decorators/RouteDecorator';
import { ValidationDTO } from '@shared/middlewares/ValidatonDTO';
import { BaseController } from '@shared/models/BaseController';
import { Request, Response } from 'express';
import { LoginRequestDTO, LoginRequestSchema } from '../dto/request/LoginRequestDTO';
import { AuthService } from '../services/AuthService';
import { ApiService } from '@shared/services/ApiService';
import { HttpStatus } from '@shared/enums/HttpStatusEnum';
import { LoginResponseDTO } from '../dto/response/LoginResponseDTO';
import { AuthRepository } from '../repositories/AuthRepository';
import { JwtFacade } from '@shared/facades/JwtFacade';

@Controller('/')
export class AuthController extends BaseController {
    private readonly service = new AuthService(new AuthRepository(), new JwtFacade());

    @Post('/')
    @Middleware(ValidationDTO.validate(LoginRequestSchema))
    public async auth(req: Request, res: Response): Promise<void> {
        const dto = req.body as object as LoginRequestDTO;
        const result = await this.service.login(dto.email, dto.password);
        ApiService.response(res, HttpStatus.OK, result, LoginResponseDTO);
    }
}
