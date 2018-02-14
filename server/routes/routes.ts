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

export function routes() {
  return router.routes();
}
