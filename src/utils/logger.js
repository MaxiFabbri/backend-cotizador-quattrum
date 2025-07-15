import winston from 'winston';

const logger = winston.createLogger({

    transports: [
        new winston.transports.Console({level: 'http'}),
        new winston.transports.File({filename: './errors.log', level: 'warn'}),
        new winston.transports.File({filename: './debug.log', level: 'debug'}),
    ]
})

const addLogger = (req, res, next) => {
    req.logger = logger;
    req.logger.http(`Request: ${req.method} en ${req.url} - ${new Date().toLocaleTimeString()} - req ip: ${req.ip} - ${req.headers.origin || 'No Origin'}`);
    next();
}

export default addLogger