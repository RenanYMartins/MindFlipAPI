import { Request, Response } from "express";
import { object } from "zod";

export abstract class BaseController {
    [key: string]: ((req: Request, res: Response) => Promise<void>) | object;
}

export type BaseControllerHandler = (req: Request, res: Response) => Promise<void>;
export type BaseControllerConstructor = (new () => BaseController);