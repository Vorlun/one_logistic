"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.winstonConfig = void 0;
const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const nest_winston_1 = require("nest-winston");
const appLabel = 'ONE_Logistic';
exports.winstonConfig = {
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(winston.format.timestamp(), nest_winston_1.utilities.format.nestLike(appLabel, {
                prettyPrint: true,
                colors: true,
            })),
        }),
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
            format: winston.format.combine(winston.format.label({ label: appLabel }), winston.format.timestamp(), winston.format.json()),
        }),
        new winston.transports.File({
            filename: 'logs/combined.log',
            level: 'info',
            format: winston.format.combine(winston.format.label({ label: appLabel }), winston.format.timestamp(), winston.format.json()),
        }),
        new DailyRotateFile({
            filename: 'logs/daily/app-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            handleExceptions: true,
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
        }),
    ],
};
//# sourceMappingURL=winston.logging.js.map