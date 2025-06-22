import { ModuleComposite } from '@shared/composites/ModuleComposite';
import { AuthModuleV1 } from './modules/auth/AuthModuleV1';
import { Router } from 'express';
import { UserModuleV1 } from './modules/user/UserModuleV1';
import { TopicModuleV1 } from './modules/topics/TopicModuleV1';

export class ApiModule {
    private modules: ModuleComposite[];

    public constructor() {
        this.modules = [new AuthModuleV1(), new UserModuleV1(), new TopicModuleV1()];
    }

    public buildRoutes(): Router {
        const router = Router();

        for (const module of this.modules) {
            router.use(module.buildRoutes());
        }

        return router;
    }
}
