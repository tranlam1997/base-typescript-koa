import routes from '../api';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';
import mount from 'koa-mount';
import path from 'path';
import compress from 'koa-compress';
import cors from '@koa/cors';
import Application from 'koa';

const dataPath = path.join(__dirname, '../../data');

export default (app: Application) => {
    app.use(bodyParser()); // parse request body
    app.use(mount('/data', serve(dataPath))); // serve static files
    app.use(cors());
    app.use(compress({ // compress response
        threshold: 60 * 1024, // > 60Kb need to compress
        gzip: { // gzip options
            flush: require('zlib').constants.Z_SYNC_FLUSH // flush zlib's data every 16Kb
        },
        deflate: { // deflate options
            flush: require('zlib').constants.Z_SYNC_FLUSH, // flush zlib's data every 16Kb
        },
        br: false // disable brotli
    }));
    app.use(routes()); // load routes
};
