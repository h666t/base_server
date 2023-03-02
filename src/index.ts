import Koa from "koa";
import {Sequelize} from "sequelize";

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'path/to/database.sqlite'
});

try {
    async () => {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');    
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

const app = new Koa();
app.use(async (ctx)=>{
    console.log('receive message');
    ctx.body = 'hello world';
});

app.listen(3000);