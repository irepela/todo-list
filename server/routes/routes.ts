import Router from 'koa-router';
const router = new Router();
import consul from 'consul';
import request from 'request';

let authService = '';
consul().agent.service.list(function(err, result) {
  if (result['authService']) {
    authService = 'http://' + result['authService']['Address'] + ':' + result['authService']['Port'];
  }
});


router.post('/register', async(ctx, next) => {
  const registerRoute = authService + '/register';
  const user = ctx.request.body;
  const response = request({
    url: registerRoute,
    method: 'POST',
    json: true,
    body: user
  });
  ctx.body = response;
});

router.post('/authenticate', async(ctx, next) => {
  const loginRoute = authService + '/authenticate';
  const user = ctx.request.body;
  const response = await request({
    url: loginRoute,
    method: 'POST',
    json: true,
    body: user
  });
  ctx.body = response;
});

export function routes() {
  return router.routes();
}
