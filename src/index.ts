import Koa from "koa";
import koaBody from "koa-body";
import {handleIP} from "./core/http/index";
import initAPI from "./core/api/index";
import session from "koa-session";
import custom_config from "./custom_config.json";
import serve from "koa-static";
import path from "path";
import Router from "koa-router";
let router = new Router();

const app = new Koa();
console.log(path.join(__dirname, "../../frontend-website/dist/"));

app.use(serve(path.join(__dirname, "../../frontend-website/dist/")));
app.use(koaBody());
app.keys = [custom_config.encrypt.privatekey];
app.use(session({
  maxAge: (24*60*60*1000)*365,
  autoCommit: true,
  overwrite: true,
  httpOnly: true,
  signed: true,
  renew: false, 
  secure: false // https
},app));
app.use(async (ctx, next)=>{
  ctx.set("Access-Control-Allow-Credentials", "true");
  ctx.set('Access-Control-Allow-Origin', '*');
  // ctx.set('Access-Control-Allow-Origin', custom_config.http.allow_cros_url);
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  let isCanContinue = handleIP(ctx.request.ip);
  if(!isCanContinue){
    ctx.status = 400;
    ctx.message = 'too many request';
    return;
  }
  await next()
});


(async ()=>{
  const router = await initAPI();
  
  
  app.use(router.routes());
  app.use(router.allowedMethods({ 
      // throw: true, // 抛出错误，代替设置响应头状态
      // notImplemented: () => '不支持当前请求所需要的功能',
      // methodNotAllowed: () => '不支持的请求方式'
  }));
  app.listen(3000);
  console.log('开始监听3000端口');
  
})();
