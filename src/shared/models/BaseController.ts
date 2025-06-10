import { Request, Response } from "express";

export abstract class BaseController {
    [key: string]: (req: Request, res: Response) => Promise<void>;
}

export type BaseControllerConstructor = (new () => BaseController);