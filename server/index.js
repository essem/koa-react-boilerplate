'use strict';

const koa = require('koa');
const koaStatic = require('koa-static');
const route = require('koa-route');
const cors = require('koa-cors');
const parse = require('co-body');

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

let dbTodoNextId = 3;
const dbTodo = [
  { id: 0, text: 'hello', completed: true },
  { id: 1, text: 'world', completed: false },
];

app.use(route.get('/api/todos', function* listTodo() {
  this.body = JSON.stringify(dbTodo);
}));

app.use(route.post('/api/todos', function* createTodo() {
  const body = yield parse.json(this);

  const newTodo = {
    id: dbTodoNextId,
    text: body.text,
    completed: false,
  };
  dbTodo.push(newTodo);
  ++dbTodoNextId;

  this.body = JSON.stringify(newTodo);
}));

app.use(route.put('/api/todos/:id/toggle', function* toggleTodo(idStr) {
  const id = parseInt(idStr, 10);
  const todo = dbTodo.find(t => t.id === id);
  todo.completed = !todo.completed;

  this.res.statusCode = 200;
}));

if (production) {
  app.use(koaStatic('dist'));
}

app.listen(port);

console.log(`server is started on ${port} in ${development ? 'development' : 'production'} mode`);
