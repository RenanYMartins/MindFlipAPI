import { Request, RequestHandler, Response } from "express";

export abstract class BaseController {
    [key: string]: RequestHandler | object;
}

export type BaseControllerHandler = (req: Request, res: Response) => Promise<void>;
export type BaseControllerConstructor = (new () => BaseController);