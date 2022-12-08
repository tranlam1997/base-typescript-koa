import winston from 'winston';
import {TransformableInfo} from 'logform';
import config from '../config';
import 'winston-daily-rotate-file';
import path from 'path';
import util from 'util';

const { format } = winston;
const logDir = path.join(__dirname, '../../logs/');

/*const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
};*/

function transform(info: TransformableInfo): TransformableInfo | boolean {
    const args = info[Symbol.for('splat') as any]; 
    if (args) {
        info.message = util.format(info.message, ...args);
    }
    return info;
}

function utilFormatter() {
    return { transform };
}

const LoggerInstance = winston.createLogger({
    level: config.logs.level,
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
        utilFormatter(),
        format.colorize(),
        format.printf(
            ({ level, message, label, timestamp }) =>
                `${timestamp} ${label || '-'} ${level}: ${message}`,
        ),
    ),
    transports: [
        new winston.transports.Stream({
            stream: process.stderr,
            level: config.logs.level,
        }),
        new winston.transports.DailyRotateFile({
            filename: '%DATE%.log',
            dirname: logDir,
            datePattern: 'YYYY-MM-DD-HH',
            maxSize: '20m',
            maxFiles: '30d',
            zippedArchive: true,
            handleExceptions: true,
        }),
    ],
});

export default LoggerInstance;
