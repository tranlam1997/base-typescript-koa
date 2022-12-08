import Logger from './logger';
import koaLoader from './koa';
import sequelizeLoader from './sequelize';
import amqpLoader from './amqp';
import swagger from './swagger';
import Application from 'koa';

export default async function (app: Application): Promise<void> {
    Logger.info('Init sequelize');
    await sequelizeLoader();

    Logger.info('Init Koa loaded and setup!');
    koaLoader(app);

    Logger.info('Init swagger');
    swagger(app);

    Logger.info('Init AMQP');
    amqpLoader();
}
