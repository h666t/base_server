import Koa from "koa";
import knex from "knex";
import {handleIP} from "./core/http/index"

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
  ctx.body = 'hello world';
});

app.listen(3000);