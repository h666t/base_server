import type Koa from "koa";
import knex_content from "../../library/knex_content/index";
import encrypt_lib from "../../library/encrypt/index";
import AsyncLock from "async-lock";

const knex_sql = knex_content.getKnex();
export default {
    "post/signup": async (ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext, any>, next: Koa.Next) =>{
        const lock = new AsyncLock();
        let {username, password} = ctx.request.body;
        return await lock.acquire(`user_sign_up_${username}`, async function() {
            let user_list = await knex_sql("users").where("id", username);
            if(user_list && user_list.length){
                throw new Error("user is exist");
            } else {
                return await knex_sql("users").insert({
                    name: username,
                    password
                })
            }
        }, {
            timeout: 5000
        });
    },
    "post/signin": async (ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext, any>, next: Koa.Next) =>{
        let {username, password} = ctx.request.body;
        let user_list = await knex_sql("users").where({
            "name": username,
        });
        let is_can_signin = false;
        if(!user_list.length){
            is_can_signin = false;
        } else {
            let password_in_data_base = encrypt_lib.decrypt(user_list[0].password);
            password = encrypt_lib.decrypt(password);
            if(password_in_data_base === password){
                is_can_signin = true; 
            } else {
                is_can_signin = false;
            }
        };
        
        if(is_can_signin){
            ctx.session!.current_user = user_list[0];
            return user_list[0];
        } else {
            throw new Error("please check user name and password");
        };
    },
    "get/getIsLogin": async (ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext, any>, next: Koa.Next) =>{
        if(ctx.session && ctx.session.current_user){
            return ctx.session.current_user;
        } else {
            throw new Error("auto login failed")
        }
    },
    "get/signout": async (ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext, any>, next: Koa.Next) =>{
        ctx.session = null;
    }, 
        
}