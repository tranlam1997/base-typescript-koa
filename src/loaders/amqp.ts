import { Container } from 'typedi';
import AlgiMQListener from '../amqp/AlgiMQListener';
import BffMQPublisher from '../amqp/BffMQPublisher';
import config from '../config';

export default async function () {
    const connectStr = `amqp://${config.rbmq.username}:${config.rbmq.password}@${config.rbmq.host}:${config.rbmq.port}`;

    await Container.get(AlgiMQListener).Init({
        connectStr,
        exchangeType: 'topic',
        durable: true,
        exchange: config.rbmq.algi.exchange,
        routing: `${config.rbmq.algi.routing}.*`,
    });

    await Container.get(AlgiMQListener).Init({
        connectStr,
        exchangeType: 'fanout',
        durable: false,
        exchange: config.rbmq.algi.exchangeLpr,
        routing: `${config.rbmq.algi.routingLpr}.*`,
    });

    await Container.get(BffMQPublisher).Init({
        connectStr,
        exchange: config.rbmq.bff.exchange,
        routing: config.rbmq.bff.routing,
        eventRouting: config.rbmq.bff.eventRouting,
    });
}
