import resCode from '../../config/response-code.json';
import Logger from '../../loaders/logger';
import _ from 'lodash';

export default {
    res: async function (ctx: any, next: any) {
        try {
            const params = JSON.stringify(ctx.request.body);
            Logger.info('REQUEST', {
                method: ctx.request.method,
                url: ctx.request.url,
                ip: ctx.request.ip,
                referer: ctx.request.header.referer,
                params,
            });

            await next();
        } catch (err) {
            Logger.error('REQUEST ERROR', err);
        }
    },
    send: function (ctx: any, data: any) { 
        ctx.status = ctx.status == 400 ? resCode.badRequest.code : resCode.success.code;
        ctx.body = data;
        Logger.info('RESPONSE', { status: ctx.status/*, data: JSON.stringify(data)*/ });
    },
    sendFile: function (ctx: any, data: any) { 
        ctx.setHeader("content-type", 'image/png');
        ctx.body = data;
    }
};
