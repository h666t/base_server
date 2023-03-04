import Koa from "koa";
import knex from "knex";
import {handleIP} from "./core/http/index";
import initAPI from "./core/api";

const knexClient = knex({
  client: 'sqlite3', // or 'better-sqlite3'
  connection: {
    filename: "./mydb.sqlite"
  }
});

const app = new Koa();

app.use(async (ctx, next)=>{
  let isCanContinue = handleIP(ctx.request.ip);
  if(!isCanContinue){
    ctx.status = 400;
    ctx.message = 'too many request';
    return;
  }
  
  console.log('receive message');
  // ctx.body = 'hello world';
  await next()
});


(async ()=>{
  const router = await initAPI();
  
  // router.get('/a', ()=>{
  //   console.log('a');
    
  // });
  app.use(router.routes());
  app.use(router.allowedMethods({ 
      // throw: true, // 抛出错误，代替设置响应头状态
      // notImplemented: () => '不支持当前请求所需要的功能',
      // methodNotAllowed: () => '不支持的请求方式'
  }));
  app.listen(3000);
  
})();