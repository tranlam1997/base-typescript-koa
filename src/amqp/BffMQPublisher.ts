import amqp from 'amqplib';
import { Service } from 'typedi';

@Service()
export default class BffMQPublisher {
    ch: any;
    exchange!: string;
    routing!: string;
    eventRouting!: string;

    public async Init({
        connectStr,
        exchange,
        routing,
        eventRouting,
    }: {
        connectStr: string;
        exchange: string;
        routing: string;
        eventRouting: string;
    }): Promise<void> {
        const conn = await amqp.connect(connectStr); // creates TCP connection with RabbitMQ service
        this.ch = await conn.createChannel(); // creates virtual link in created connection
        this.exchange = exchange;
        this.routing = routing;
        this.eventRouting = eventRouting;
        await this.ch.assertExchange(this.exchange, 'topic', { durable: true });
    }

    public publishToFE({
        contents,
        key,
    }: {
        contents: Array<any>;
        key: number | undefined;
    }): void {
        this?.ch && this.ch.publish(
            this.exchange,
            `${this.routing}.${key}`,
            Buffer.from(JSON.stringify(contents)),
        );
        //console.log(`publishToFE: ${this.exchange} - ${this.routing}.${key}  - ${JSON.stringify(contents)}`);
    }

    public publishEvent(contents: any, key: any): void {
        this?.ch && this.ch.publish(
            this.exchange,
            `${this.eventRouting}.${key}`,
            Buffer.from(JSON.stringify(contents)),
        );
       // console.log(`publishEvent: ${this.exchange} - ${this.eventRouting}.${key}  - ${JSON.stringify(contents)}`);
    }
}
