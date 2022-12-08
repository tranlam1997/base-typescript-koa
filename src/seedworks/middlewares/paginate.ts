import Logger from '../../loaders/logger';

export interface IPagination {
    currentPage: number;
    pageSize: number;
    offset: number;
    filter: any;
}

export default {
    pagination: async function (ctx: any, next: any) {
        try {
            const currentPage = parseInt(ctx.query.currentPage || 1);
            const pageSize = parseInt(ctx.query.pageSize || 15);
            const offset = (currentPage - 1) * pageSize;
            ctx.pagination = <IPagination>{ currentPage, pageSize, offset, filter: { ...ctx.query } };
            await next();
        } catch (err) {
            Logger.error('PAGINATION', err);
        }
    }
};
