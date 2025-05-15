import 'reflect-metadata';

const ROUTE_META = Symbol('routes');

function Route(method: string, path: string): MethodDecorator {
    return (target, propertyKey) => {
        const routes = Reflect.getMetadata(ROUTE_META, target.constructor) || [];
        routes.push({ method, path, handlerName: propertyKey });
        Reflect.defineMetadata(ROUTE_META, routes, target.constructor);
    };
}

export function getRoutes(target: object) {
    return Reflect.getMetadata(ROUTE_META, target) || [];
}

export const Get = (path: string) => Route('get', path);
export const Post = (path: string) => Route('post', path);
export const Put = (path: string) => Route('put', path);
export const Patch = (path: string) => Route('patch', path);
export const Delete = (path: string) => Route('delete', path);
