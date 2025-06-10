import { Router } from "express";
import { RouteDecoratorData } from "@shared/decorators/RouteDecorator";
import { DecoratorMetadata } from "@shared/enums/DecoratorMetaEnum";
import { decoratorMiddlewares } from "@shared/decorators/MiddlewareDecorator";
import { BaseControllerConstructor } from "@shared/models/BaseController";

export class RouterFactory {
    private controllers: BaseControllerConstructor[];

    public constructor(controllers: BaseControllerConstructor[]) {
        this.controllers = controllers;
    }

    public build(): Router {
        const router = Router();

        for (const Controller of this.controllers) {
            const instance = new Controller();
            const prefix = Reflect.getMetadata(DecoratorMetadata.PREFIX, Controller) || '';
            const routes: RouteDecoratorData[] = Reflect.getMetadata(DecoratorMetadata.ROUTES, Controller) || [];

            const controllerRouter = Router();

            for (const route of routes) {
                const handler = instance[route.handlerName.toString()].bind(instance);
                const middlewares = decoratorMiddlewares(instance, route.handlerName);
                controllerRouter[route.method](route.path, ...middlewares, handler);
            }

            router.use(prefix, controllerRouter);
        }

        return router;
    }
}
