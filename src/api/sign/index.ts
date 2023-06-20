import type Koa from "koa";
import knex from "knex";
import knex_content from "../../library/knex_content/index";
export default {
    "post/signup": async (ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext, any>, next: Koa.Next) =>{
        let {username, password, confirmpassword} = ctx.request.body;
        // console.log('123');
        // console.log(ctx.body);
        // console.log('124');
        
        let user = await knex_content.getKnex().where("id", username).from("users");
        console.log(user);
        return {
            msg: 'ok; fn'
        }
    }
}