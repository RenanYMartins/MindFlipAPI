import { ModuleComposite } from '@shared/composites/ModuleComposite';
import { RouterFactory } from '@shared/factories/RouterFactory';
import { BaseControllerConstructor } from '@shared/models/BaseController';
import { Router } from 'express';
import { TopicController } from './controllers/TopicController';

export class TopicModuleV1 implements ModuleComposite {
    private children: ModuleComposite[];
    private controllers: BaseControllerConstructor[];

    public constructor() {
        this.children = [];
        this.controllers = [TopicController];
    }

    addChildren(...module: ModuleComposite[]): void {
        this.children.push(...module);
    }

    addController(...controllers: BaseControllerConstructor[]): void {
        this.controllers.push(...controllers);
    }

    buildRoutes(): Router {
        const router = Router();
        router.use('/v1/topic', new RouterFactory(this.controllers).build());

        for (const module of this.children) {
            router.use('/v1/topic', module.buildRoutes());
        }

        return router;
    }
}
