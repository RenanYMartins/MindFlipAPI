import { ModuleComposite } from "@shared/composites/ModuleComposite";
import { BaseControllerConstructor } from "@shared/models/BaseController";
import { RouterFactory } from "@shared/factories/RouterFactory";
import { Router } from "express";
import { AuthController } from "./controllers/AuthController";

export class AuthModuleV1 implements ModuleComposite {
    private children: ModuleComposite[];
    private controllers: BaseControllerConstructor[];

    public constructor() {
        this.children = [];
        this.controllers = [AuthController];
    }

    addChildren(...module: ModuleComposite[]): void {
        this.children.push(...module);
    }

    addController(...controllers: BaseControllerConstructor[]): void {
        this.controllers.push(...controllers);
    }

    buildRoutes(): Router {
        const router = Router();
        router.use('/v1/auth', new RouterFactory(this.controllers).build());

        for (const module of this.children) {
            router.use('/v1/auth', module.buildRoutes());
        }

        return router;
    }
}