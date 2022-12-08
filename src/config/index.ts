import dotenv from 'dotenv';
import path from 'path';

const env = process.env.NODE_ENV || 'development';

if (env === 'production') {
    dotenv.config({ path: path.join(__dirname, '../../.env.production') });
} else if (env === 'development') {
    dotenv.config({ path: path.join(__dirname, '../../.env.development') });
} else if (env === 'yifactory') {
    dotenv.config({ path: path.join(__dirname, '../../.env.yifactory') });
} else if (env === 'staging') {
    dotenv.config({ path: path.join(__dirname, '../../.env.staging') });
} else {
    throw new Error('process.env.NODE_ENV error!');
}

export default {
    port: Number(process.env.PORT),
    enableSwagger: process.env.ENABLE_SWAGGER === 'true' ? true : false,
    logs: {
        level: process.env.LOG_LEVEL || 'silly',
    },
    delay: Number(process.env.DELAY) * 1000,
    db: {
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWD || '',
        database: process.env.DB_DBNAME || '',
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 3306,
        dialect: 'mariadb',
        timezone: '+00:00',
        logging: false,
    },
    rbmq: {
        username: process.env.RBMQ_USERNAME,
        password: process.env.RBMQ_PASSWD,
        host: process.env.RBMQ_HOST,
        port: process.env.RBMQ_PORT,
        algi: {
            exchange: process.env.RBMQ_ALGI_SPOT_EXCHANGE || 'iriro.exchange',
            routing: process.env.RBMQ_ALGI_SPOT_ROUTING,
            exchangeLpr:
                process.env.RBMQ_ALGI_LPR_EXCHANGE || 'iriro.exchange.lpr',
            routingLpr: process.env.RBMQ_ALGI_LPR_ROUTING,
        },
        bff: {
            exchange: process.env.RBMQ_BFF_EXCHANGE || 'amq.topic',
            routing: process.env.RBMQ_BFF_ROUTING || 'events.floor',
            eventRouting: process.env.RBMQ_BFF_EVENT_ROUTING || 'event',
        },
    },
};
