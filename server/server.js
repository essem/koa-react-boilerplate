'use strict';

const koa = require('koa');
const route = require('koa-route');
const cors = require('koa-cors');
const parse = require('co-body');

function createServer(port) {
  const env = {
    production: process.env.NODE_ENV === 'production',
    test: process.env.NODE_ENV === 'test',
    development: false,
  };
  if (!env.production && !env.test) {
    env.development = true;
  }

  const app = koa();

  if (!env.test) {
    app.use(function* timer(next) {
      const start = new Date;
      yield next;
      const ms = new Date - start;
      console.log('%s %s - %s ms', this.method, this.url, ms);
    });
  }

  if (env.development) {
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

  if (env.production) {
    app.use(require('koa-static')('dist'));
  }

  const httpServer = app.listen(port);

  if (!env.test) {
    const envStr = env.development ? 'development' : 'production';
    console.log(`server is started on ${port} in ${envStr} mode`);
  }

  return httpServer;
}

module.exports = createServer;
