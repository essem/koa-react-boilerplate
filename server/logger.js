const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const path = require('path');
const mkdirp = require('mkdirp');

const filename = 'logs/winston.log';

const logdir = path.dirname(filename);
mkdirp.sync(logdir);

const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      colorize: true,
    }),
    new DailyRotateFile({
      level: 'info',
      filename,
      prepend: true, // not available yet
      handleExceptions: true,
      colorize: false,
      json: false,
    }),
  ],
});

module.exports = logger;
