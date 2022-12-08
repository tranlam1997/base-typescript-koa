import 'reflect-metadata';
import os from 'os';
import config from './config';
import Logger from './loaders/logger';
import Koa from 'koa';
import './seedworks/global/variables'

async function runServer() {
    const app: Koa = new Koa();
    try {
        Logger.info(`Length ThreadPool::: ${os.cpus().length}`);
        await require('./loaders').default(app);
    } catch (err) {
        console.log(err)
    }
    app.listen(config.port, () => {
        Logger.info(`Server listening on port: ${config.port}`);
    }).on('error', (err) => {
        Logger.error('Server error', err);
        process.exit(1);
    });
}

const runDelay = () => {
    Logger.info('runServer');

    new Promise((r) => setTimeout(r, config.delay)).then(
        async () => await runServer(),
    );
};

runDelay();
