import 'reflect-metadata';
import { RequestHandler } from 'express';
import { DecoratorMetadata } from '@shared/enums/DecoratorMetaEnum';

export function Middleware(...middlewares: RequestHandler[]): MethodDecorator {
    return (target, propertyKey) => {
        Reflect.defineMetadata(DecoratorMetadata.MIDDLEWARES, middlewares, target, propertyKey);
    };
}

export function decoratorMiddlewares(target: object, propertyKey: symbol | string): RequestHandler[] {
    return Reflect.getMetadata(DecoratorMetadata.MIDDLEWARES, target, propertyKey) || [];
}
