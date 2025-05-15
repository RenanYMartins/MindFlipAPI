import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { RouterComposite } from '@shared/composites/ModuleComposite';

export class AuthRouter implements RouterComposite {
    private readonly router: Router;

    public constructor() {
        this.router = Router();
    }

    add(...routes: Router[]): void {
        this.router.use('/auth', routes);
    }

    routes(): Router {
        return this.router;
    }

}
