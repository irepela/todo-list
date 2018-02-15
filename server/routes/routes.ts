import Router from 'koa-router';
const router = new Router();
import consul from 'consul';
import request from 'request';

function getAuthServiceUrl(){
  return new Promise((resolve, reject) => {
    consul().agent.service.list((err, result) => {
      if (err) {
        reject(err);
      } else {
        let authService = '';
        if (result['authService']) {
          authService = 'http://' + result['authService']['Address'] + ':' + result['authService']['Port'];
        }
        resolve(authService);
      }
    });
  });
}

router.post('/register', async(ctx, next) => {
  const authServiceUrl = await getAuthServiceUrl();
  const registerRoute = authServiceUrl + '/register';
  const user = ctx.request.body;
  const response = await request({
    url: registerRoute,
    method: 'POST',
    json: true,
    body: user
  });
  ctx.body = response;
});

router.post('/authenticate', async(ctx, next) => {
  const authServiceUrl = await getAuthServiceUrl();
  const loginRoute = authServiceUrl + '/authenticate';
  const user = ctx.request.body;
  const response = await request({
    url: loginRoute,
    method: 'POST',
    json: true,
    body: user
  });
  ctx.body = response;
});

router.post('/addTodo', async(ctx, next) => {
  const authServiceUrl = await getAuthServiceUrl();
  const addTodoRoute = authServiceUrl + '/addTodo';
  const response = await request({
    url: addTodoRoute,
    method: 'POST',
    json: true,
    body: ctx.request.body
  });
  ctx.body = response;
});

router.post('/deleteTodo', async(ctx, next) => {
  const authServiceUrl = await getAuthServiceUrl();
  const deleteTodoRoute = authServiceUrl + '/deleteTodo';
  const response = await request({
    url: deleteTodoRoute,
    method: 'POST',
    json: true,
    body: ctx.request.body
  });
  ctx.body = response;
});

router.post('/toggleTodo', async(ctx, next) => {
  const authServiceUrl = await getAuthServiceUrl();
  const toggleTodoRoute = authServiceUrl + '/toggleTodo';
  const response = await request({
    url: toggleTodoRoute,
    method: 'POST',
    json: true,
    body: ctx.request.body
  });
  ctx.body = response;
});

router.get('/getTodos/:username', async(ctx, next) => {
  const authServiceUrl = await getAuthServiceUrl();
  const getTodosRoute = authServiceUrl + '/getTodos/:username';
  const response = await request({
    url: getTodosRoute,
    method: 'GET',
    json: true,
    body: ctx.request.body
  });
  ctx.body = response;
});

export function routes() {
  return router.routes();
}
