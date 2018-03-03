import koa from 'koa';
import compress from 'koa-compress';
import logger from 'koa-logger';
import consul from 'consul';
import {routes} from './routes/routes';
import bodyParser from 'koa-bodyparser';
import * as path from "path";
import serveStatic from 'koa-static';
import send from 'koa-send';

const PORT = 3000;

const details = {
  name: 'todoDiscoveryService',
  address: 'localhost',
  port: PORT,
  id: 'todoDiscoveryService'
};

consul().agent.service.register(details, err => {
  console.log('Registered todo discovery service');
});

const app = new koa();
app.use(logger());
app.use(compress());
app.use(bodyParser());
const root = path.resolve(__dirname, '../');
app.use(serveStatic(path.resolve(root, 'todo-list')));
app.use(routes());
// this last middleware catches any request that isn't handled by
// koa-static or koa-router, ie your index.html in your example
app.use(async(ctx) => {
  await send(ctx, '/dist/todo-list/index.html');
});
app.listen(PORT, () => console.log('server started ' + PORT));

export default app;
