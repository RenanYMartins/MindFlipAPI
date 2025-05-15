import { RouterComposite } from '@shared/composites/ModuleComposite';
import { Router } from 'express';

export class RouterV1 implements RouterComposite {
    private readonly router: Router;

    public constructor() {
        this.router = Router();
    }

    public add(...routes: Router[]): void {
        this.router.use('/v1', routes);
    }

    public routes(): Router {
        return this.router;
    }

}

