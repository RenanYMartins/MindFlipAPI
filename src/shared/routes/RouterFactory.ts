import { getMiddlewares } from "@shared/decorators/MiddlewareDecorator";
import { RouteDecoratorData } from "@shared/decorators/RouteDecorator";
import { DecoratorMeta } from "@shared/enums/DecoratorMetaEnum";
import { Router } from "express";

export class RouterFactory {
    private controllers: object[];

    public constructor() {
        this.controllers = [];
    }

    public addControllers(...controllers: object[]) {
        this.controllers.push(controllers);
    }

    public buidRoutes(): Router {
        const router = Router();

        for (const controller of this.controllers) {
            console.log(controller);
            const prefix = Reflect.getMetadata('prefix', controller) || '';
            const routes: RouteDecoratorData[] = Reflect.getMetadata(DecoratorMeta.ROUTES, controller) || [];

            const controllerRouter = Router();

            console.log(prefix)
            console.log(routes);

            for (const route of routes) {
                const handler = Reflect.get(controller, route.handlerName);
                const middlewares = getMiddlewares(controller, route.handlerName);
                console.log(handler)
                console.log(middlewares);
                Reflect.get(controllerRouter, route.method)(route.path, ...middlewares, handler);
            }

            router.use(prefix, controllerRouter);
        }

        return router;
    }
}
