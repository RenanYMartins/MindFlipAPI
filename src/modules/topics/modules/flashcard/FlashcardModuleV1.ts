import { ModuleComposite } from '@shared/composites/ModuleComposite';
import { RouterFactory } from '@shared/factories/RouterFactory';
import { BaseControllerConstructor } from '@shared/models/BaseController';
import { Router } from 'express';
import { FlashcardController } from './controllers/FlashcardController';

export class FlashcardModuleV1 implements ModuleComposite {
    private children: ModuleComposite[];
    private controllers: BaseControllerConstructor[];

    public constructor() {
        this.children = [];
        this.controllers = [FlashcardController];
    }

    addChildren(...module: ModuleComposite[]): void {
        this.children.push(...module);
    }

    addController(...controllers: BaseControllerConstructor[]): void {
        this.controllers.push(...controllers);
    }

    buildRoutes(): Router {
        const router = Router();
        router.use('/flashcard', new RouterFactory(this.controllers).build());

        for (const module of this.children) {
            router.use('/flashcard', module.buildRoutes());
        }

        return router;
    }
}
