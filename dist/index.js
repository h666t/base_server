(()=>{"use strict";var e={n:t=>{var a=t&&t.__esModule?()=>t.default:()=>t;return e.d(a,{a}),a},d:(t,a)=>{for(var s in a)e.o(a,s)&&!e.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:a[s]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};const t=require("koa");var a=e.n(t);const s=require("sequelize"),o=new s.Sequelize({dialect:"sqlite",storage:"./database.sqlite"});try{(async()=>{await o.authenticate(),console.log("Connection has been established successfully.")})()}catch(e){console.error("Unable to connect to the database:",e)}o.define("User",{firstName:{type:s.DataTypes.STRING,allowNull:!1},lastName:{type:s.DataTypes.STRING}},{tableName:"members"}).sync();const l=new(a());l.use((async e=>{console.log("receive message"),e.body="hello world"})),l.listen(3e3)})();