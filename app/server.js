import koa from 'koa';
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

ejs(app, {
  root: path.join(__dirname, 'view'),
  layout: false,
  viewExt: 'ejs',
  cache: false,
});

app.use(function*() {
  yield this.render('index.html');
});

app.listen(port);
console.log(`server is started on ${port}`);
