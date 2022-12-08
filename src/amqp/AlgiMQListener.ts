import amqp from 'amqplib';
import { Service } from 'typedi';
import config from '../config';
import Logger from '../loaders/logger';
import _ from 'lodash';



// let vehicleTrackingEnable: boolean;
// EventEmitter.on(eventTypeEnum.VehicleTracking, (config) => {
//     Logger.info(`VehicleTrackingEnable: ${JSON.stringify(config)}`);
//     vehicleTrackingEnable = config.enable;
// })

@Service()
export default class AlgiMQListener {
    constructor(
        ) { }

    public async Init({
        connectStr,
        exchangeType,
        durable,
        exchange,
        routing,
    }: {
        connectStr: string;
        exchangeType: string;
        durable: boolean;
        exchange: string;
        routing: string;
    }): Promise<void> {
        const conn = await amqp.connect(connectStr);
        const ch = await conn.createChannel();
        await ch.assertExchange(exchange, exchangeType, { durable });
        const queue = await ch.assertQueue('', { exclusive: true });
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
        ch.bindQueue(queue.queue, exchange, routing);
        ch.consume(
            queue.queue,
            //@RabbitListener
            async (msg: any): Promise<void> => {
                //console.log(msg.fields.routingKey)
                if (_.includes(msg.fields.routingKey, config.rbmq.algi.routing)) {
                    if (msg.fields.routingKey === 'iriro.to_be.parkingLot') {
                        const contents = JSON.parse(msg.content.toString());
                        //console.log(`iriro.to_be.parkingLot: ${msg.content.toString()}`);
                        // this.poiService.publishToFE(contents);
                    } else if (msg.fields.routingKey === 'iriro.to_be.onRoadObjects') {
                        // if (vehicleTrackingEnable) {
                            const contents = JSON.parse(msg.content.toString());
                            // this.waypointService.calculationPoint(contents);
                            //console.log(`iriro.to_be.onRoadObjects: ${msg.content.toString()}`);
                        // }
                    }
                } else if (_.includes(msg.fields.routingKey, config.rbmq.algi.routingLpr)) {
                    // 차량 LPR 정보
                    //console.log(`lpr.info: ${msg.content.toString()}`);
                    if (!_.includes(msg.fields.routingKey, 'lpr.info')) {
                        const contents = JSON.parse(msg.content.toString());
                        //console.log(`lpr.info: ${msg.content.toString()}`);
                        // _.forEach(contents, (c) => {
                        //     Logger.debug(c);
                        // });
                        //TODO : link function
                    }
                }
            },
            {
                noAck: true, //(negative acknowledge) là dùng để báo nhận nhưng xử lý không thành công, đẩy message lại vào queue hoặc có thể gửi đến exchange đã khai báo trong property reply-to của message.
            },
        );
    }
}
