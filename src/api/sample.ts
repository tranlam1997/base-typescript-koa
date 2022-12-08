import Router from "koa-router";
import Container from "typedi";
import SampleService from "../services/sample";

const api: Router = new Router();
const SampleServiceInstance = Container.get(SampleService);

export default function ({ app }: { app: Router }): void {
    /**
     * @openapi
     * /api/v1/sample-api:
     *   get:
     *     summary: Test API.
     *     tags:
     *       - Sample
     *     description: Test API.
     *     responses:
     *       200:
     *         description: Success
     *       400:
     *         description: Bad request
     *       500:
     *         description: Server error
     */
    /**
     * Find my car Step1 : Search vehicle list using 4 digits of vehicle number
     */
    api.get('/', async (ctx) => {
        ctx.status = 200;
        ctx.body = (await SampleServiceInstance.sampleMethod()).message;
    });

    app.use('/sample-api', api.routes());
}