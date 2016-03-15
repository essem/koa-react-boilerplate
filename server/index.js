'use strict';

const koa = require('koa');
const koaStatic = require('koa-static');
const route = require('koa-route');
const cors = require('koa-cors');

const production = process.env.NODE_ENV === 'production';
const development = !production;
const port = 5000;

const app = koa();

app.use(function* timer(next) {
  const start = new Date;
  yield next;
  const ms = new Date - start;
  console.log('%s %s - %s ms', this.method, this.url, ms);
});

if (development) {
  app.use(cors());
}

app.use(route.get('/api/locations', function* locationHandler() {
  this.body = JSON.stringify([
    { id: 0, name: 'hello' },
    { id: 1, name: 'world' },
  ]);
}));

if (production) {
  app.use(koaStatic('dist'));
}

app.listen(port);

console.log(`server is started on ${port} in ${development ? 'development' : 'production'} mode`);
