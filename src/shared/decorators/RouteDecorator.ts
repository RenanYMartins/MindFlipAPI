import { DecoratorMetadata } from '@shared/enums/DecoratorMetaEnum';
import 'reflect-metadata';

export type RouteDecoratorData = {
    method: 'get' | 'post' | 'put' | 'patch' | 'delete';
    path: string;
    handlerName: string | symbol;
}

function decoratorRoute(method: string, path: string): MethodDecorator {
    return (target, propertyKey) => {
        const routes = Reflect.getMetadata(DecoratorMetadata.ROUTES, target.constructor) || [];
        routes.push({ method, path, handlerName: propertyKey });
        Reflect.defineMetadata(DecoratorMetadata.ROUTES, routes, target.constructor);
    };
}

export function getRoutes(target: object) {
    return Reflect.getMetadata(DecoratorMetadata.ROUTES, target) || [];
}

export const Get = (path: string) => decoratorRoute('get', path);
export const Post = (path: string) => decoratorRoute('post', path);
export const Put = (path: string) => decoratorRoute('put', path);
export const Patch = (path: string) => decoratorRoute('patch', path);
export const Delete = (path: string) => decoratorRoute('delete', path);
