import koa from 'koa';

let port = 5000;

let app = koa();

app.use(function*(next){
  let start = new Date;
  yield next;
  let ms = new Date - start;
  console.log('%s %s - %s ms', this.method, this.url, ms);
});

app.use(function*() {
  this.body = 'hello world';
});

app.listen(port);
console.log(`server is started on ${port}`);
