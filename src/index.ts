import Koa from "koa";
import {Sequelize, DataTypes} from "sequelize";

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

try {
  (async () => {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');    
  })()
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const User = sequelize.define('User', {
  // 在这里定义模型属性
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull 默认为 true
  }
}, {
  tableName: 'members'
  // 这是其他模型参数
});
User.sync()
// .then(async ()=>{
//   const jane = User.build({ firstName: "Jane" });
//   (async ()=>{
//     await jane.save();
//   })();
//   console.log('Jane 已保存到数据库!');
  
// });

const app = new Koa();
app.use(async (ctx)=>{
    console.log('receive message');
    ctx.body = 'hello world';
});

app.listen(3000);