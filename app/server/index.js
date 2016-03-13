const koa = require('koa');
const koaStatic = require('koa-static');
const route = require('koa-route');
const ejs = require('koa-ejs');
const path = require('path');

const port = 5000;

const app = koa();

app.use(function* timer(next) {
  const start = new Date;
  yield next;
  const ms = new Date - start;
  console.log('%s %s - %s ms', this.method, this.url, ms);
});

app.use(koaStatic('public'));

ejs(app, {
  root: path.join(__dirname, 'view'),
  layout: false,
  viewExt: 'ejs',
  cache: false,
});

app.use(route.get('/api/locations', function* locationHandler() {
  this.body = JSON.stringify([
    { id: 0, name: 'hello' },
    { id: 1, name: 'world' },
  ]);
}));

app.use(route.get('/', function* rootHandler() {
  let bundlePath = 'bundle.js';
  if (process.env.NODE_ENV !== 'production') {
    bundlePath = 'http://localhost:5001/assets/bundle.js';
  }

  yield this.render('index.html', { bundlePath });
}));

app.listen(port);
console.log(`server is started on ${port} in ${process.env.NODE_ENV} mode`);
