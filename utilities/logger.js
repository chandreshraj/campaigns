const { createLogger, transports,format } = require('winston');
const {config} = require('../config')

const logger = createLogger({
    levels: config.LOG.LOGLEVEL,
    defaultMeta: { component: config.COMPONENTNAME },
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf(info=>`${info.level}: ${config.COMPONENTNAME}: ${[info.timestamp]}: ${info.message}`),
    ),
    transports: [
        new transports.Console(),
        new transports.File({filename:config.LOG.FILEPATH+config.LOG.FILENAME})
    ]
});
module.exports = logger;