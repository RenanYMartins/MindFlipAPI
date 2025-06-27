import { HttpException } from '@shared/exceptions/HttpException';
import { HttpStatus } from './HttpStatusEnum';
import { Result } from '@shared/models/Result';

export const BaseException = {
    pageNotFound: Result.error(new HttpException(HttpStatus.NOT_FOUND, 'Página não encontrada')),
    forbidden: Result.error(new HttpException(HttpStatus.FORBIDDEN, 'Acesso não autorizado a esse conteúdo'))
};
