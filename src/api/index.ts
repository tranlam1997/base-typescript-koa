import Router from 'koa-router';
import sampleRoutes from './sample';

const app: Router = new Router({ prefix: '/api/v1' });

export default (): any => {
    sampleRoutes({ app });
    return app.routes();
};
