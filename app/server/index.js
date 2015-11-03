import koa from 'koa';
import koaStatic from 'koa-static';
import route from 'koa-route';
import ejs from 'koa-ejs';
import path from 'path';

let port = 5000;

let app = koa();

app.use(function*(next){
  let start = new Date;
  yield next;
  let ms = new Date - start;
  console.log('%s %s - %s ms', this.method, this.url, ms);
});

app.use(koaStatic('public'));

ejs(app, {
  root: path.join(__dirname, 'view'),
  layout: false,
  viewExt: 'ejs',
  cache: false
});

app.use(route.get('/api/locations', function*() {
  this.body = JSON.stringify([
    { id: 0, name: 'hello' },
    { id: 1, name: 'world' }
  ]);
}));

app.use(route.get('/', function*() {
  let bundlePath = 'bundle.js';
  if (process.env.NODE_ENV != 'production') {
    bundlePath = 'http://localhost:5001/assets/bundle.js';
  }
  yield this.render('index.html', { bundlePath: bundlePath });
}));

app.listen(port);
console.log(`server is started on ${port} in ${process.env.NODE_ENV} mode`);
