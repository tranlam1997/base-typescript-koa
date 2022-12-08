import { Next, Request, Response } from "koa";

export const sampleMiddleware = (req: Request, res: Response, next: Next) => {
    // do something here
    next();
}