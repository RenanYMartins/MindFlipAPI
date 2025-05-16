import 'reflect-metadata';
import { RequestHandler } from 'express';
import { DecoratorMeta } from '@shared/enums/DecoratorMetaEnum';

export function Use(...middlewares: RequestHandler[]): MethodDecorator {
    return (target, propertyKey) => {
        Reflect.defineMetadata(DecoratorMeta.MIDDLEWARES, middlewares, target, propertyKey);
    };
}

export function getMiddlewares(target: object, propertyKey: symbol | string): RequestHandler[] {
    return Reflect.getMetadata(DecoratorMeta.MIDDLEWARES, target, propertyKey) || [];
}
