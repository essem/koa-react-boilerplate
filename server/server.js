'use strict';

const koa = require('koa');
const cors = require('koa-cors');
const morgan = require('koa-morgan');
const config = require('config');
const logger = require('./logger');
const todos = require('./todos');

function createServer(hostname, port) {
  const app = koa();

  const stream = {
    write(message) {
      logger.info(message.slice(0, -1));
    },
  };
  app.use(morgan.middleware('combined', { stream }));

  if (config.get('cors')) {
    app.use(cors());
  }

  todos(app);

  if (config.get('serveStatic')) {
    app.use(require('koa-static')('dist'));
  }

  const httpServer = app.listen(port, hostname);

  const envStr = process.env.NODE_ENV || 'development';
  logger.info(`server is started on ${hostname}:${port} in ${envStr} mode`);

  return httpServer;
}

module.exports = createServer;
