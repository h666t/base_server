import Koa from "koa";
import knex from "knex";

const knexClient = knex({
  client: 'sqlite3', // or 'better-sqlite3'
  connection: {
    filename: "./mydb.sqlite"
  }
});

console.log(knexClient);


const app = new Koa();
app.use(async (ctx)=>{
    console.log('receive message');
    ctx.body = 'hello world';
});

app.listen(3000);