import { ModuleComposite } from "@shared/composites/ModuleComposite";
import { AuthModuleV1 } from "./modules/auth/AuthModuleV1";
import { Router } from "express";

export class ApiModule {
    private modules: ModuleComposite[];

    public constructor() {
        this.modules = [
            new AuthModuleV1()
        ];
    }

    public buildRoutes(): Router {
        const router = Router();

        for(const module of this.modules) {
            router.use(module.buildRoutes());
        }

        return router;
    }
}