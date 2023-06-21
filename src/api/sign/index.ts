import type Koa from "koa";
import knex_content from "../../library/knex_content/index";
import encrypt_lib from "../../library/encrypt/index";

const knex_sql = knex_content.getKnex();
export default {
    "post/signup": async (ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext, any>, next: Koa.Next) =>{
        let {username, password} = ctx.request.body;
        console.log('p');
        console.log(encrypt_lib.decrypt(password));
        let user = await knex_sql("users").where("id", username);
        console.log(user);
        return {
            msg: 'ok; fn'
        }
    }
}