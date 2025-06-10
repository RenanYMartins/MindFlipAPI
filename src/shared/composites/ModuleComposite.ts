import { BaseController } from "@shared/models/BaseController";
import { Router } from "express";

export interface ModuleComposite {
    addChildren(...module: ModuleComposite[]): void;
    addController(...controllers: (new () => BaseController)[]): void;
    buildRoutes(): Router;
}